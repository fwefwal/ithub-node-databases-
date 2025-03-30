import type { Insertable } from "kysely"
import type getConnection from "./connection"
import type { DB } from "kysely-codegen"

type Connection = ReturnType<typeof getConnection>

async function logAllQuestions(connection: Connection) {
  try {
    const result = await connection.selectFrom("Question").selectAll().execute()
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

async function createSurvey(
  connection: Connection,
  newSurvey: Insertable<DB["Survey"]>
) {
  try {
    await connection
      .insertInto("Survey")
      .values(newSurvey)
      .returningAll()
      .executeTakeFirstOrThrow()
  } catch (error) {
    console.error(error)
  }
}

async function getTop5Countries(connection: Connection) {
  try {
    const countryCounts = await connection.selectFrom("Answer").where("QuestionID", "=", 3)
      .select(["AnswerText"])
      .groupBy("AnswerText")
      .select([
        "AnswerText",
        connection.fn.countAll().as("count")
      ])
      .orderBy("count", "desc")
      .execute()

    const top5Countries = countryCounts.slice(0, 5)
    console.log("Топ-5 стран", top5Countries)
  } catch (error) {
    console.error(error)
  }
}

async function getMentalHealthStats(connection: Connection) {
  try {
    const totalRespondents = await connection.selectFrom("Answer").where("QuestionID", "=", 33)
    .select([
      "AnswerText",
      connection.fn.countAll().as("count")
    ])
      .executeTakeFirst()

    const yesCount = await connection.selectFrom("Answer").where("QuestionID", "=", 33).where("AnswerText", "=", "Yes")
    .select([
      "AnswerText",
      connection.fn.countAll().as("count")
    ])
      .executeTakeFirst()

    const total = totalRespondents?.count || 1
    const yes = yesCount?.count || 0
    const percentage = ((yes / total) * 100).toFixed(2)
    
    console.log(`С ментальными расстройствами: ${yes} (${percentage}%)`)
  } catch (error) {
    console.error(error)
  }
}

export { logAllQuestions, createSurvey, getTop5Countries, getMentalHealthStats }
