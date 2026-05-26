# College Discovery Platform API

A production-grade, high-performance, and scalable REST API backend for a **College Discovery & Comparison Platform MVP**. Built using modern, enterprise-ready patterns.

---

## 🚀 Tech Stack

- **Runtime**: Node.js (v18+)
- **Language**: TypeScript
- **Framework**: Express.js (v5)
- **Database**: PostgreSQL (Hosted on Neon)
- **ORM**: Prisma ORM
- **Validation**: Zod (Runtime validation & type safety)
- **Security & Logging**: Helmet, CORS, Morgan

---

## 🛠️ Local Development Setup

Follow these steps to set up the project locally:

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file at the root of the project:
```env
# Database Connection URL (Direct or Connection Pooler)
DATABASE_URL="postgresql://user:password@localhost:5432/college_discovery?sslmode=require"

# Server Configuration
PORT=3000
NODE_ENV=development

# API Versioning
API_VERSION=v1
```

### 3. Generate Prisma Client & Apply Migrations
Sync your local/remote PostgreSQL database with the Prisma schema and generate the strongly-typed client:
```bash
# Run migrations and generate prisma client
npm run migrate
```

### 4. Seed the Database
Populate the database with **15 real Indian colleges** (including IIT Bombay, IIT Delhi, IIT Madras, BITS Pilani, NIT Trichy, IIIT Hyderabad, SRM, VIT Vellore, etc.) with real course fees, placement statistics, and cutoffs:
```bash
npm run seed
```

### 5. Start the Development Server
```bash
npm run dev
```
The server will start on `http://localhost:3000`. The base endpoint will be `http://localhost:3000/api/v1`.

---

## ☁️ Deploying to Render

This project is fully configured for deployment on **Render** (or Railway).

### Render Service Settings:
1. **Service Type**: Web Service
2. **Environment**: `Node`
3. **Build Command**: `npm run build` *(Generates Prisma Client and compiles TypeScript to JS in `dist/`)*
4. **Start Command**: `npm run start` *(Runs outstanding database migrations safely and boots up the production JS server)*
5. **Environment Variables**:
   - `DATABASE_URL`: Your production connection-pooled PostgreSQL connection string.
   - `NODE_ENV`: `production`
   - `PORT`: Automatically set by Render, but binds to `3000` by default.
   - `API_VERSION`: `v1`

---

## 📖 API Documentation & Endpoint Reference

### 1. General & Health Check
- **Health Check**
  - **Method**: `GET`
  - **Endpoint**: `/health`
  - **Description**: Returns server uptime status and environment state.
  - **Response Example**:
    ```json
    {
      "status": "ok",
      "timestamp": "2026-05-26T09:12:50.123Z",
      "environment": "development",
      "version": "1.0.0"
    }
    ```

---

### 2. College Endpoints
- **List All Colleges (with search, pagination, and filters)**
  - **Method**: `GET`
  - **Endpoint**: `/api/v1/colleges`
  - **Query Parameters**:
    - `search` (Search by college name, city, or state)
    - `type` (Filter by `IIT`, `NIT`, `IIIT`, `BITS`, `Government`, `Private`, `Deemed`, etc.)
    - `state` / `city` (Filter location)
    - `stream` (Filter by stream e.g., `Engineering`, `Medicine`)
    - `nirf_rank_min` / `nirf_rank_max` (Filter ranking ranges)
    - `sort` (Sort by `name`, `nirf_rank`, `established`, `createdAt`)
    - `order` (`asc` or `desc`)
    - `page` / `limit` (Pagination control)
  - **Response Example**:
    ```json
    {
      "success": true,
      "message": "Colleges fetched successfully",
      "data": [
        {
          "id": "cm3a4b5c6d...",
          "name": "Indian Institute of Technology Bombay",
          "city": "Mumbai",
          "state": "Maharashtra",
          "type": "IIT",
          "streams": ["Engineering", "Technology", "Science", "Design", "Management"],
          "nirf_rank": 3,
          "established": 1958,
          "_count": {
            "courseFees": 6,
            "placementStats": 2,
            "admissionCutoffs": 5
          }
        }
      ],
      "meta": {
        "total": 15,
        "page": 1,
        "limit": 10,
        "totalPages": 2,
        "hasNextPage": true,
        "hasPrevPage": false
      }
    }
    ```

- **Get Specific College Profile**
  - **Method**: `GET`
  - **Endpoint**: `/api/v1/colleges/:id`
  - **Description**: Fetches college profile along with all associated courses, placements (newest first), and cutoffs.
  
- **Get Database Aggregated Statistics**
  - **Method**: `GET`
  - **Endpoint**: `/api/v1/colleges/stats`
  - **Description**: Returns high-level metrics including total colleges, colleges by type, colleges by state, and top 10 ranked institutions.

- **Create a College Profile**
  - **Method**: `POST`
  - **Endpoint**: `/api/v1/colleges`
  - **Request Body Example**:
    ```json
    {
      "name": "Indian Institute of Technology Guwahati",
      "city": "Guwahati",
      "state": "Assam",
      "type": "IIT",
      "streams": ["Engineering", "Science"],
      "nirf_rank": 7,
      "established": 1994
    }
    ```

- **Update a College Profile**
  - **Method**: `PATCH`
  - **Endpoint**: `/api/v1/colleges/:id`

- **Delete a College Profile**
  - **Method**: `DELETE`
  - **Endpoint**: `/api/v1/colleges/:id`

---

### 3. Course Fees (Nested resource under College)
- **List Courses of a College**
  - **Method**: `GET`
  - **Endpoint**: `/api/v1/colleges/:collegeId/courses`

- **Add a Course Fee Record**
  - **Method**: `POST`
  - **Endpoint**: `/api/v1/colleges/:collegeId/courses`
  - **Request Body Example**:
    ```json
    {
      "course": "B.Tech Computer Science & Engineering",
      "degree": "BTech",
      "annual_fee": 225000
    }
    ```

- **Update/Delete Course Fee**
  - **Methods**: `PATCH` / `DELETE`
  - **Endpoints**: `/api/v1/colleges/:collegeId/courses/:id`

---

### 4. Placements (Nested resource under College)
- **List Placements of a College**
  - **Method**: `GET`
  - **Endpoint**: `/api/v1/colleges/:collegeId/placements`

- **Add Placement Stat**
  - **Method**: `POST`
  - **Endpoint**: `/api/v1/colleges/:collegeId/placements`
  - **Request Body Example**:
    ```json
    {
      "year": 2024,
      "avg_pkg": 2800000,
      "max_pkg": 25000000,
      "placement_pct": 95,
      "top_recruiters": ["Google", "Microsoft", "Uber", "Apple"]
    }
    ```

- **Update/Delete Placement Record**
  - **Methods**: `PATCH` / `DELETE`
  - **Endpoints**: `/api/v1/colleges/:collegeId/placements/:id`

---

### 5. Admission Cutoffs (Nested resource under College)
- **List Cutoffs of a College**
  - **Method**: `GET`
  - **Endpoint**: `/api/v1/colleges/:collegeId/cutoffs`

- **Add a Cutoff Record**
  - **Method**: `POST`
  - **Endpoint**: `/api/v1/colleges/:collegeId/cutoffs`
  - **Request Body Example**:
    ```json
    {
      "exam": "JEE_Advanced",
      "year": 2024,
      "category": "General",
      "cutoff_value": 67
    }
    ```

---

### 6. Comparison & Rankings Endpoints (Compare Layer)

- **Compare Course Fees**
  - **Method**: `GET`
  - **Endpoint**: `/api/v1/compare/courses`
  - **Description**: Query and compare annual fees across different colleges for a specific course/degree.
  - **Query Parameters**:
    - `course` (e.g., `B.Tech CSE`) - *Required*
    - `degree` (e.g., `BTech`) - *Optional*
  - **Request Example**: `/api/v1/compare/courses?course=Computer Science&degree=BTech`

- **Compare Placement Packages**
  - **Method**: `GET`
  - **Endpoint**: `/api/v1/compare/placements`
  - **Description**: Ranks colleges by highest average packages for a given placement year.
  - **Query Parameters**:
    - `year` (e.g., `2024`) - *Optional*
  - **Request Example**: `/api/v1/compare/placements?year=2024`

- **Compare Admission Cutoffs**
  - **Method**: `GET`
  - **Endpoint**: `/api/v1/compare/cutoffs`
  - **Description**: Compare competitive cutoffs across colleges for exams, categories, and years.
  - **Query Parameters**:
    - `exam` (e.g., `JEE_Advanced`, `JEE_Main`, `NEET`, `BITSAT`, `MHT_CET`, `CAT`) - *Required*
    - `year` (e.g., `2024`) - *Required*
    - `category` (e.g., `General`, `OBC`, `SC`, `ST`, `EWS`) - *Required*
  - **Request Example**: `/api/v1/compare/cutoffs?exam=JEE_Advanced&year=2024&category=General`

---

## 🏛️ Database Architecture Details

```mermaid
erDiagram
    COLLEGES ||--o{ COURSE_FEES : offers
    COLLEGES ||--o{ PLACEMENT_STATS : records
    COLLEGES ||--o{ ADMISSION_CUTOFFS : requires

    COLLEGES {
        string id PK
        string name UK
        string city
        string state
        enum type
        string_array streams
        int nirf_rank
        int established
        timestamp createdAt
        timestamp updatedAt
    }

    COURSE_FEES {
        string id PK
        string college_id FK
        string course
        enum degree
        int annual_fee
    }

    PLACEMENT_STATS {
        string id PK
        string college_id FK
        int year
        float avg_pkg
        float max_pkg
        float placement_pct
        string_array top_recruiters
    }

    ADMISSION_CUTOFFS {
        string id PK
        string college_id FK
        enum exam
        int year
        enum category
        float cutoff_value
    }
```
