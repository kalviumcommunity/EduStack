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



