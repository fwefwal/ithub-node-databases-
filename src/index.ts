import getDbConnection from "./database/connection";
import { findQuestionById } from "./database/queries";

export function main() {
  try {
    const db = getDbConnection()
    findQuestionById(db, 3).then(result => {
      console.log(result)
    })
  } catch (error) {
    console.error("Failed to start:", error);
    process.exit(1);
  }
}

main();
