/*
  SAFE MIGRATION NOTES:
  - Backfills NOT NULL columns using DEFAULT values
  - Ensures Attendance.studentId is populated before constraints
  - Adds indexes after data integrity is ensured
*/

-- =========================
-- Assignment
-- =========================
ALTER TABLE "Assignment"
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- =========================
-- Course (backfill updatedAt)
-- =========================
ALTER TABLE "Course"
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW();

-- =========================
-- User (backfill updatedAt + role)
-- =========================
ALTER TABLE "User"
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW();



-- =========================
-- Attendance (critical fix)
-- =========================
-- Step 1: Add column as nullable
ALTER TABLE "Attendance"
ADD COLUMN "studentId" INTEGER;

-- Step 2: Backfill studentId using enrollments
UPDATE "Attendance" a
SET "studentId" = e."userId"
FROM "Enrollment" e
WHERE a."courseId" = e."courseId"
AND a."studentId" IS NULL;

-- Step 3: Enforce NOT NULL after backfill
ALTER TABLE "Attendance"
ALTER COLUMN "studentId" SET NOT NULL;

-- =========================
-- Indexes (performance)
-- =========================
CREATE INDEX "Assignment_dueDate_idx"
ON "Assignment"("dueDate");

CREATE INDEX "Attendance_studentId_idx"
ON "Attendance"("studentId");

CREATE INDEX "Course_teacherId_idx"
ON "Course"("teacherId");

CREATE INDEX "Course_createdAt_idx"
ON "Course"("createdAt");

CREATE INDEX "Enrollment_userId_idx"
ON "Enrollment"("userId");

CREATE INDEX "Material_uploadedAt_idx"
ON "Material"("uploadedAt");

CREATE INDEX "Submission_assignmentId_idx"
ON "Submission"("assignmentId");

CREATE INDEX "Submission_studentId_idx"
ON "Submission"("studentId");

CREATE INDEX "User_role_idx"
ON "User"("role");

-- =========================
-- Constraints (added last)
-- =========================
CREATE UNIQUE INDEX "Attendance_courseId_studentId_date_key"
ON "Attendance"("courseId", "studentId", "date");

ALTER TABLE "Attendance"
ADD CONSTRAINT "Attendance_studentId_fkey"
FOREIGN KEY ("studentId")
REFERENCES "User"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;
