import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { sendError } from '../utils/response';
import { isDev } from '../config/env';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  // Zod validation errors
  if (err instanceof ZodError) {
    const errors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    sendError(res, 'Validation failed', 400, errors);
    return;
  }

  // Prisma known errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      sendError(res, 'A record with this value already exists (unique constraint)', 409);
      return;
    }
    if (err.code === 'P2025') {
      sendError(res, 'Record not found', 404);
      return;
    }
    if (err.code === 'P2003') {
      sendError(res, 'Related record not found (foreign key constraint)', 400);
      return;
    }
    sendError(res, `Database error: ${err.code}`, 500);
    return;
  }

  // Prisma validation errors
  if (err instanceof Prisma.PrismaClientValidationError) {
    sendError(res, 'Invalid data provided to database', 400);
    return;
  }

  // Generic Error
  if (err instanceof Error) {
    const statusCode = (err as Error & { statusCode?: number }).statusCode || 500;
    const message = isDev ? err.message : 'Internal server error';
    sendError(res, message, statusCode);
    return;
  }

  sendError(res, 'Internal server error', 500);
}
