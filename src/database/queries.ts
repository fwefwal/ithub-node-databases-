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

async function getPhysicalOverMentalHealth(connection: Connection) {
  try {
    const totalRespondents = await connection.selectFrom("Answer").where("QuestionID", "=", 64)
      .select([
        "AnswerText",
        connection.fn.countAll().as("count")
      ])
      .executeTakeFirst()

    const physicalMoreThanMental = await connection.selectFrom("Answer").where("QuestionID", "=", 64).where("AnswerText", "=", "10")
      .select([
        "AnswerText",
        connection.fn.countAll().as("count")
      ])
      .executeTakeFirst()

    const total = totalRespondents?.count || 1
    const affected = physicalMoreThanMental?.count || 0
    const percentage = ((affected / total) * 100).toFixed(2)

    console.log(`Процент - ментальное здоровье важнее (?) : ${percentage}%`)
  } catch (error) {
    console.error(error)
  }
}

async function getTop20Words(connection: Connection) {
  try {
    const responses = await connection.selectFrom("Answer").where("QuestionID", "=", 103).select(["AnswerText"])
      .execute()

    const wordsCount: Record<string, number> = {}

    responses.forEach((row) => {
      if (!row.AnswerText) return

      const words = row.AnswerText.toLowerCase().replace(/[.,!?;()"'-]/g, "").split(/\s+/)

      words.forEach((word) => {
        if (word.length > 3) { 
          wordsCount[word] = (wordsCount[word] || 0) + 1
        }
      })
    })

    const topWords = Object.entries(wordsCount).sort((a, b) => b[1] - a[1]).slice(0, 20).map(([word, count]) => ({ word, count }))

    console.log("Топ-20 слов:", topWords)
  } catch (error) {
    console.error(error)
  }
}

export { logAllQuestions, createSurvey, getTop5Countries, getMentalHealthStats, getPhysicalOverMentalHealth, getTop20Words }
