import { PrismaClient } from ".prisma/client/default";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma 7: wasm query-compiler требует driver adapter.
// DATABASE_URL берётся из окружения (PM2 подставляет из /home/deploy/.antiage_db_env).
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString });

// Единственный экземпляр Prisma-клиента на процесс.
export const prisma = new PrismaClient({ adapter });
