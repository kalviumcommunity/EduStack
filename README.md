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
