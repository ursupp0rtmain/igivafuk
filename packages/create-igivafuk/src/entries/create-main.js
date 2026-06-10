import { runCreate } from '../create.js';

runCreate(process.argv).catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
