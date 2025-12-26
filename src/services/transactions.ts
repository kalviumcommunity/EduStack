import { prisma } from "@/lib/prisma";

/**
 * Demonstrates an atomic transaction.
 * If any step fails, everything is rolled back.
 */
export async function placeOrder(
  userId: number,
  productId: number,
  amount: number
) {
  const [order, product] = await prisma.$transaction([
    prisma.order.create({
      data: {
        userId,
        amount,
        status: "CREATED",
      },
    }),
    prisma.product.update({
      where: { id: productId },
      data: {
        stock: { decrement: 1 },
      },
    }),
  ]);

  return { order, product };
}

/**
 * Demonstrates rollback using try/catch.
 */
export async function rollbackExample() {
  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: "Rollback User",
          email: "rollback@example.com",
          role: "STUDENT",
        },
      });

      // Intentionally invalid data to trigger rollback
      await tx.order.create({
        data: {
          userId: user.id,
          amount: -500,
          status: "FAILED",
        },
      });
    });
  } catch (error) {
    console.error("Transaction failed. Rolled back.", error);
  }
}
