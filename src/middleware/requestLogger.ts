import morgan from 'morgan';
import { isDev } from '../config/env';

// Use 'dev' format in development, 'combined' in production
export const requestLogger = morgan(isDev ? 'dev' : 'combined');
