import getDbConnection from "./database/connection"
import { logFirstFourtyAnswers } from "./database/queries";


export function main() {
  try {
    const db = getDbConnection()
    logFirstFourtyAnswers(db)
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
