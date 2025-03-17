import type getDbConnection from './connection'
import type { QuestionUpdate, Answer, NewAnswer } from './schema'

type Db = ReturnType<typeof getDbConnection>

export async function findQuestionById(db: Db, id: number) {
  return await db.selectFrom('Question')
    .where('questionid', '=', id)
    .selectAll()
    .executeTakeFirst()
}

export async function findAnswer(db: Db, criteria: Partial<Answer>) {
  let query = db.selectFrom('Answer')

  if (criteria.QuestionID) {
    query = query.where('QuestionID', '=', criteria.QuestionID)
  } else if (criteria.SurveyID) {
    query = query.where('SurveyID', '=', criteria.SurveyID)
  } else if (criteria.UserID) {
    query = query.where('UserID', '=', criteria.UserID)
  }

  return await query.selectAll().execute()
}

export async function updateQuestion(db: Db, id: number, updateWith: QuestionUpdate) {
  await db.updateTable('Question').set(updateWith).where('questionid', '=', id).execute()
}

export async function createAnswer(db: Db, answer: NewAnswer) {
  return await db.insertInto('Answer')
    .values(answer)
    .returningAll()
    .executeTakeFirstOrThrow()
}
