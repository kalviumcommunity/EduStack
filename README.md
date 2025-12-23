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

