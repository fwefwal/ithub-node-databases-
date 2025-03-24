import getDbConnection from "./database/connection"
import { logFirstFourtyAnswers, logTopFiveCountries } from "./database/queries";


export function main() {
  try {
    const db = getDbConnection()
    logFirstFourtyAnswers(db)
    logTopFiveCountries(db)
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
