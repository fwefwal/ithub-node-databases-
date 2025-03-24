import type { PrismaClient } from "@prisma/client"

async function logAllQuestions(prisma: PrismaClient) {
  try {
    const questions = await prisma.question.findMany()
    console.log(questions)
  } catch (error) {
    console.error(error)
  }
}

async function createSurvey(prisma: PrismaClient) {
  try {
    await prisma.survey.create({
      data: {
        Description: 'Prisma Survey'
      }
    })
  } catch (error) {
    console.error(error)
  }
}

export { logAllQuestions, createSurvey }
