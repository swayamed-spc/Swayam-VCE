// Creates (or resets) one account per role for local testing: npm run db:seed
// admin@swayam.com, manager@swayam.com, student@swayam.com, all with Password123!. See lib/seedAccounts.js.
import { BASE_ACCOUNTS, seedAccounts } from './lib/seedAccounts.js'

process.exit((await seedAccounts(BASE_ACCOUNTS)) ? 0 : 1)
