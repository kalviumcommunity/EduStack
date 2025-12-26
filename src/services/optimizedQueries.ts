import { prisma } from "@/lib/prisma";

/**
 * Optimized select (no over-fetching)
 */
export async function getUsersOptimized() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}

/**
 * Batch insert
 */
export async function createUsersInBatch() {
  return prisma.user.createMany({
    data: [
      { name: "Alice", email: "alice_batch@example.com", role: "STUDENT" },
      { name: "Bob", email: "bob_batch@example.com", role: "STUDENT" },
      { name: "Charlie", email: "charlie_batch@example.com", role: "STUDENT" },
    ],
    skipDuplicates: true,
  });
}

/**
 * Pagination
 */
export async function getPaginatedUsers(page = 0, pageSize = 10) {
  return prisma.user.findMany({
    skip: page * pageSize,
    take: pageSize,
    orderBy: { createdAt: "desc" },
  });
}
