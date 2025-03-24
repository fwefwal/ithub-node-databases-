import { PrismaClient } from '@prisma/client'
import { logAllQuestions, createSurvey } from "./database/queries";

export async function main() {
  try {
    const prisma = new PrismaClient()
    await logAllQuestions(prisma)
    await createSurvey(prisma)
  } catch (error) {
    console.error("Failed to start:", error);
    process.exit(1);
  }
}

main();
