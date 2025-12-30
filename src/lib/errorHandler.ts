import { NextResponse } from "next/server";
import { logger } from "./logger";

export function handleError(error: unknown, context: string) {
  const isProd = process.env.NODE_ENV === "production";

  const message =
    error instanceof Error ? error.message : "Unknown error occurred";

  logger.error(`Error in ${context}`, {
    message,
    stack: isProd ? "REDACTED" : error instanceof Error ? error.stack : null,
  });

  return NextResponse.json(
    {
      success: false,
      message: isProd
        ? "Something went wrong. Please try again later."
        : message,
      ...(isProd
        ? {}
        : { stack: error instanceof Error ? error.stack : undefined }),
      timestamp: new Date().toISOString(),
    },
    { status: 500 }
  );
}
