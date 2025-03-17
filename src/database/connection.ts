import path from 'node:path'
import SQLite from 'better-sqlite3'
import { Kysely, SqliteDialect } from 'kysely'
import type { Database } from './schema'

export default function getDbConnection() {
  const dbFile = process.env.DB_FILE

  if (!dbFile) {
    throw new Error('Couldn\'t find DB_FILE enviroment variable')
  }

  const dbPath = path.join(import.meta.dirname, '..', '..', dbFile)

  const dialect = new SqliteDialect({
    database: new SQLite(dbPath),
  })

  return new Kysely<Database>({
    dialect,
  })
}
