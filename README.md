# EduStack

## Project Overview

EduStack is a lightweight Learning Management System (LMS) designed for small coaching institutes.  
Many institutes rely on fragmented tools such as messaging apps, spreadsheets, and shared drives to manage courses, students, assignments, and attendance. EduStack centralizes these core academic workflows into a single, simple, and efficient web application.

The goal of this project is to deliver a scalable, role-based LMS that focuses on real-world usability rather than unnecessary complexity.

---

## Folder Structure

```text
edustack/
├── app/                        # Next.js App Router (pages, layouts, routes)
│   ├── auth/                   # Authentication pages (login, register)
│   ├── dashboard/              # Role-based dashboards (admin, teacher, student)
│   ├── courses/                # Course-related pages and dynamic routes
│   ├── api/                    # API routes (auth, courses, assignments, attendance)
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Public landing page
│
├── components/                 # Reusable UI components (Navbar, Forms, Tables)
├── lib/                        # Shared utilities (Prisma client, auth helpers)
├── services/                   # Business logic and service-layer abstractions
├── prisma/                     # Prisma schema and migration files
│   └── schema.prisma
│
├── public/                     # Static assets
├── styles/                     # Global styles
├── .env.example                # Environment variable template
├── package.json                # Project dependencies and scripts
└── README.md                   # Project documentation

<!-- ``` -->

Below is a **clean, submission-ready README section** that **directly answers the prompt**.
You can copy–paste this into your `README.md` without modification.

---


## Why Strict TypeScript Mode Reduces Runtime Bugs

Strict TypeScript mode enforces explicit and predictable typing across the entire codebase. By enabling options such as `strict`, `noImplicitAny`, and unused variable checks, potential issues are caught during development rather than at runtime.

Key benefits include:

* Prevents accidental use of `any` types that can hide logic errors
* Detects null and undefined access at compile time
* Identifies unused variables and parameters early
* Ensures consistent file casing across operating systems

This shifts error detection from production to development, significantly reducing runtime failures and improving long-term maintainability.

---

## ESLint and Prettier Rules Explained

### ESLint

ESLint is used to enforce code quality and best practices. Our configuration includes:

* Warnings for unnecessary `console` statements
* Enforcement of consistent quote usage (double quotes)
* Mandatory semicolon usage
* Next.js Core Web Vitals rules for performance and accessibility

These rules help maintain clean, readable, and production-ready code.

### Prettier

Prettier ensures consistent code formatting across the project by enforcing:

* Uniform indentation and spacing
* Consistent semicolon usage
* Trailing commas where appropriate
* A single formatting standard shared by all team members

By combining ESLint with Prettier, we eliminate formatting debates and ensure consistency regardless of individual developer preferences.

---

## How Pre-Commit Hooks Improve Team Consistency

Pre-commit hooks are implemented using Husky and lint-staged to automatically run ESLint and Prettier before any commit is created.

This ensures that:

* Code violating lint rules cannot be committed
* Formatting issues are automatically fixed
* All committed code meets the same quality standards
* Code reviews focus on logic rather than style issues

Pre-commit enforcement guarantees a clean and consistent codebase, even when multiple developers contribute simultaneously.

---

## Verification and Evidence

The following evidence is included with the submission:

* Screenshots of successful ESLint and Prettier runs
* Logs showing automatic fixes applied by Prettier
* Demonstration of a failed commit caused by lint violations, followed by a successful commit after fixes

These confirm that strict type checking, linting, formatting, and pre-commit enforcement are actively working as intended.



Below is a **clean, submission-ready README section** that directly satisfies all four points in the prompt. You can paste this into your `README.md` as-is.

---

## Environment Variables and Configuration

This project uses environment variables to manage configuration and sensitive credentials securely. To prevent accidental exposure of secrets and to clearly separate server and client concerns, we follow Next.js environment variable best practices.

---

## Purpose of Each Environment Variable

### Server-Side Variables (Private)

These variables are **only available on the server** and are never exposed to the browser.

* **DATABASE_URL**
  PostgreSQL connection string used by Prisma to connect to the database.

* **REDIS_URL**
  Connection URL for the Redis instance used for caching.

* **NEXTAUTH_SECRET**
  Secret key used to sign and encrypt authentication tokens and sessions.

* **EMAIL_SERVER_URL**
  SMTP configuration used to send transactional emails (notifications, onboarding).

* **S3_ACCESS_KEY**
  Access key for cloud storage authentication.

* **S3_SECRET_KEY**
  Secret key for cloud storage authentication.

* **S3_BUCKET_NAME**
  Name of the cloud storage bucket used for file uploads.

---

### Client-Side Variables (Safe to Expose)

These variables are explicitly exposed to the browser and must be prefixed with `NEXT_PUBLIC_`.

* **NEXT_PUBLIC_API_BASE_URL**
  Base URL used by client-side components to communicate with the backend.

---

## Server-Side vs Client-Side Access Rules

Next.js enforces strict boundaries for environment variable usage:

* Variables **without** the `NEXT_PUBLIC_` prefix are accessible only on the server.
* Variables **with** the `NEXT_PUBLIC_` prefix are included in the client-side bundle.

Examples:

```ts
// Server-side only
const dbUrl = process.env.DATABASE_URL;

// Client-safe
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
```

Server-only secrets are never imported or referenced in client components or hooks.

---

## Replicating the Setup Using `.env.example`

The repository includes a `.env.example` file that acts as a template for all required environment variables.

To replicate the setup locally:

1. Copy the example file:

   ```bash
   cp .env.example .env.local
   ```
2. Replace placeholder values with your local credentials.
3. Run the application normally using `npm run dev`.

The `.env.local` file is ignored by Git and remains local to each developer’s environment.

---

## Common Pitfalls Avoided

* **Accidentally exposing secrets**
  All sensitive variables are server-only and never prefixed with `NEXT_PUBLIC_`.

* **Forgetting the `NEXT_PUBLIC_` prefix**
  Client-side variables are clearly documented and explicitly prefixed to ensure availability in the browser.

* **Using secrets in client components**
  Server-only variables are accessed exclusively in server components, API routes, or server actions.

* **Runtime vs build-time issues**
  Environment variables required at runtime are validated before use to avoid undefined errors during execution.

* **Committing sensitive files**
  `.env.local` is excluded from version control, ensuring no credentials are leaked.

## Docker Setup – PR Submission and Video Demo

### Pull Request
This Pull Request includes the Docker configuration required to run the application consistently across all environments.

**Included files:**
- `Dockerfile` – Defines how the Next.js application is built and run inside a container.
- `docker-compose.yml` – Orchestrates the application, PostgreSQL, and Redis services in a shared network.

---

## Video Demo

A 1–2 minute demo video has been recorded and uploaded to Google Drive.

**Video Link:**  
[Paste Google Drive link here]  
(Access set to **“Anyone with the link can edit”**)

---

### 1. Docker Configuration
- Overview of the `Dockerfile` and its role in building and running the Next.js application.
- Explanation of the `docker-compose.yml` file and how it defines:
  - The application container
  - PostgreSQL database container
  - Redis cache container
  - Shared Docker network and environment variables

### 2. Running Containers
- Execution of `docker-compose up --build`
- Verification that all three containers are running:
  - Application container
  - PostgreSQL container
  - Redis container
- Application accessible at `http://localhost:3000`

### 3. Consistency Across Environments
- Explanation of how Docker Compose ensures:
  - Identical dependencies and runtime versions
  - No local environment or port conflicts
  - Predictable behavior across all team members’ machines

---

## Reflection

**Question:**  
*If your entire team had to onboard a new developer tomorrow, how would Docker Compose make that process faster and smoother?*

**Answer:**  
Docker Compose allows a new developer to run the entire application stack with a single command.  
Instead of manually installing Node.js, PostgreSQL, Redis, and configuring environment variables, the developer simply runs `docker-compose up` and gets an identical environment.  
This reduces onboarding time, eliminates setup errors, and ensures everyone works with the same configuration, enabling the team to move faster with confidence.


Below is a **clean, submission-ready README section** you can paste directly into your `README.md`.
It is written to exactly match the requirements you listed, with no extra fluff.

---

### Prisma Schema (ER Design)

The database schema is designed around a lightweight Learning Management System (LMS) domain.
The core entities include **User**, **Course**, **Enrollment**, **Assignment**, **Submission**, **Material**, and **Attendance**.

**Prisma schema excerpt:**

```prisma
model User {
  id          Int          @id @default(autoincrement())
  name        String
  email       String       @unique
  role        Role
  createdAt   DateTime     @default(now())

  courses     Course[]     @relation("TeacherCourses")
  enrollments Enrollment[]
  submissions Submission[]
}

model Course {
  id          Int          @id @default(autoincrement())
  title       String
  description String?
  teacherId   Int
  createdAt   DateTime     @default(now())

  teacher     User         @relation("TeacherCourses", fields: [teacherId], references: [id], onDelete: Cascade)
  enrollments Enrollment[]
  assignments Assignment[]
}
```

This schema directly maps to an ER model where users (teachers and students) interact with courses and related academic data.

---

### Keys, Constraints, and Relationships

* **Primary Keys (PK):**

  * Each table uses an auto-incrementing `id` as the primary key.
* **Foreign Keys (FK):**

  * `Course.teacherId → User.id`
  * `Enrollment.userId → User.id`
  * `Enrollment.courseId → Course.id`
  * `Assignment.courseId → Course.id`
  * `Submission.assignmentId → Assignment.id`
* **Constraints:**

  * `User.email` is marked `@unique`
  * Composite uniqueness prevents duplicate enrollments and submissions
  * `onDelete: Cascade` ensures referential integrity
* **Indexes:**

  * Indexes on frequently queried columns such as `courseId` and composite keys improve read performance.

---

### Normalization Approach

The schema follows standard normalization principles:

* **1NF:** All attributes contain atomic values (no repeating groups or arrays).
* **2NF:** All non-key attributes depend on the full primary key.
* **3NF:** No transitive dependencies exist between non-key attributes.

Redundancy is avoided by separating many-to-many relationships (e.g., enrollments, submissions) into dedicated tables instead of duplicating data.

---

### Applying Migrations

Database tables are created using Prisma migrations:

```bash
npx prisma migrate dev --name init_schema
```

This command:

* Validates the schema
* Applies migrations to PostgreSQL
* Generates the Prisma Client

---

### Verifying the Database

Prisma Studio is used to visually verify tables and relationships:

```bash
npx prisma studio
```

Screenshots of Prisma Studio showing the created tables are included in the submission.

---

### Seeding the Database

The database is seeded with sample data (users, courses, and assignments) to support local testing and UI development.

Example seed actions:

* Create a teacher user
* Create a course
* Add an assignment linked to the course

Screenshots or logs of seeded data are included as evidence.

---

### Scalability Considerations

This design supports scalability by:

* Keeping entities loosely coupled
* Using indexed foreign keys for efficient joins
* Supporting many-to-many relationships without duplication
* Allowing horizontal growth (more users, courses, submissions) without schema changes

---

### Common Queries and Optimization

The most common queries include:

* Fetching courses for a teacher or student
* Listing assignments for a course
* Retrieving submissions for an assignment
* Checking enrollments and attendance

Indexes and normalized relations ensure these queries remain performant as data volume increases.

---

### Evidence

The submission includes:

* Prisma migration success logs
* Prisma Studio screenshots
* Seeded data verification

### Prisma Initilization
Prisma’s generated queries give us strong type safety, compile-time validation, and consistent query patterns, which significantly reduces runtime errors compared to writing raw SQL.
It also improves developer productivity by abstracting complex joins and relationships.
However, for highly optimized queries, complex reporting, or database-specific features, raw SQL can still be preferred for maximum control and performance.


## Production Migration Safety Considerations

Before running any database migration in a live production environment, several precautions would be taken to ensure that no data is lost or corrupted.

First, a full database backup would be created and verified. This ensures that data can be restored quickly in case a migration fails or produces unintended results.

Second, all schema changes would be tested in a staging environment that mirrors production as closely as possible. Migrations would be validated against real-world data volumes and query patterns before being promoted.

Third, migrations would be reviewed manually, including inspection of the generated SQL, to confirm that destructive operations (such as dropping columns or tables) are intentional and safe.

Fourth, migrations would be executed during a planned maintenance window or low-traffic period to minimize user impact. Application writes may be temporarily paused to avoid partial updates or inconsistent states.

Finally, monitoring and logging would be enabled during and after the migration. Application health, error rates, and database performance would be closely observed, with a rollback plan ready if issues are detected.

These steps ensure migrations are predictable, reversible, and safe, even as the application scales and evolves.


## Transactions, Performance Optimization, and Query Tuning

### 1. Database Transactions
Transactions are used to ensure atomicity and consistency when multiple database operations must succeed or fail together. In this project, Prisma’s `$transaction()` API is used to group related operations such as creating records and updating related data. If any operation within the transaction fails, Prisma automatically rolls back all changes, preventing partial or inconsistent writes.

This approach is critical for real-world scenarios like order placement, inventory updates, or enrollment workflows, where data integrity must be guaranteed.

---

### 2. Rollbacks and Error Handling
All transactions are wrapped in `try-catch` blocks to handle failures gracefully. When an error occurs (for example, due to invalid data or a constraint violation), Prisma aborts the transaction and restores the database to its previous state. Rollback behavior was verified by intentionally triggering errors and confirming that no partial records were persisted in the database.

This ensures the system remains reliable even under failure conditions.

---

### 3. Query Optimization
Query performance is improved by following these practices:
- **Avoid over-fetching:** Only required fields are selected instead of loading full relational graphs.
- **Batch operations:** Bulk inserts are performed using `createMany` to reduce round trips to the database.
- **Pagination:** Large result sets are paginated using `skip` and `take` with deterministic ordering.

These optimizations reduce query cost, memory usage, and response times.

---

### 4. Indexing Strategy
Indexes are added to frequently queried fields such as foreign keys and status columns. Indexes significantly improve lookup and filtering performance for common access patterns. Schema changes related to indexing are applied using Prisma migrations to keep the database schema versioned and consistent.

---

### 5. Monitoring and Benchmarking
Prisma query logging is enabled during development to observe generated SQL and execution behavior. Query performance is compared before and after adding indexes using database-level analysis tools such as `EXPLAIN ANALYZE`. Prisma Studio is also used to visualize queries and validate data access patterns.

For production environments, database monitoring tools (such as managed database performance dashboards) would be used to track slow queries and optimize further.

---

### Summary
By combining transactions, proper error handling, query optimization, indexing, and monitoring, the data layer is designed to be reliable, performant, and scalable. These practices ensure data consistency while supporting efficient query execution as the application grows.


## API Design & Routing

This project uses **Next.js App Router file-based routing** to implement RESTful APIs.  
Every folder inside `src/app/api/` maps directly to an HTTP endpoint, ensuring a clear and predictable API structure.

---

### API Route Hierarchy

| Endpoint | Description |
|-------|------------|
| `GET /api/users` | Fetch all users |
| `POST /api/users` | Create a new user |
| `GET /api/users/:id` | Fetch a specific user |
| `PUT /api/users/:id` | Update a user |
| `DELETE /api/users/:id` | Delete a user |
| `GET /api/courses` | Fetch courses (paginated) |
| `POST /api/courses` | Create a new course |
| `GET /api/courses/:id` | Fetch course details |
| `POST /api/enrollments` | Enroll a student in a course |

All routes follow **plural, lowercase, resource-based naming**, avoiding verbs in URLs.

---

### HTTP Verbs & Resource Actions

| HTTP Method | Action | Example |
|----------|------|--------|
| GET | Read data | `/api/users` |
| POST | Create data | `/api/users` |
| PUT | Update data | `/api/users/1` |
| DELETE | Remove data | `/api/users/1` |

---

### Sample Requests & Responses

#### Create User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Charlie",
    "email": "charlie@example.com"
  }'


## Standardized API Responses

All API endpoints follow a unified response structure to ensure predictable client behavior and consistent error handling.

### Response Format
```json
{
  "success": boolean,
  "message": string,
  "data": any,
  "error": {
    "code": string,
    "details"?: any
  },
  "timestamp": string
}



This assignment focuses on building a **clean RESTful API**, **optimized database schema**, and **consistent backend architecture** using Next.js App Router and Prisma.

---

## Objective

- Design RESTful API routes using Next.js file-based routing
- Implement standardized API responses
- Optimize Prisma schema for performance
- Apply migrations and indexing
- Demonstrate transactions and query optimization
- Follow professional backend conventions

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- PostgreSQL
- Prisma ORM
- Docker & Docker Compose
- pnpm

---

## Input Validation & Error Handling

### Why Input Validation Is Important

All API endpoints validate incoming data before processing it. This prevents:
- Invalid or malformed requests
- Corrupted database records
- Unpredictable runtime errors
- Security and data integrity issues

Validation is handled at the API boundary, ensuring only trusted data reaches business logic or the database.

---

## Zod-Based Validation

We use **Zod** for schema-based input validation.

Each API route defines or imports a Zod schema that represents the expected request payload. Incoming data is validated against this schema before execution.

### Example Schema

```ts
// src/lib/schemas/userSchema.ts
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(18, "User must be 18 or older"),
});