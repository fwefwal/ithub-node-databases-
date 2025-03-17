import type { Insertable, Selectable, Updateable } from 'kysely'
import type { DB } from 'kisely-codegen'

export async function findQuestionById(db: DB, id: number) {
  return await db.selectFrom('Question')
    .where('questionid', '=', id)
    .selectAll()
    .executeTakeFirst()
}

export async function findAnswer(db: DB, criteria: Partial<Selectable<"Answer">>) {
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

export async function updateQuestion(db: DB, id: number, updateWith: Updateable<"Question">) {
  await db.updateTable('Question').set(updateWith).where('questionid', '=', id).execute()
}

export async function createAnswer(db: DB, answer: Insertable<"Answer">) {
  return await db.insertInto('Answer')
    .values(answer)
    .returningAll()
    .executeTakeFirstOrThrow()
}
