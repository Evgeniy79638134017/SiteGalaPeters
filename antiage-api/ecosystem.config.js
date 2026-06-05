// PM2-конфигурация antiage-api.
// DATABASE_URL загружается из защищённого env-файла на сервере — в репозитории секретов нет.
// Путь можно переопределить переменной ANTIAGE_DB_ENV.
const dbEnvPath = process.env.ANTIAGE_DB_ENV || "/home/deploy/.antiage_db_env";
require("dotenv").config({ path: dbEnvPath });

module.exports = {
  apps: [
    {
      name: "antiage-api",
      script: "dist/server.js",
      instances: 1,
      autorestart: true,
      max_memory_restart: "200M",
      env: {
        NODE_ENV: "production",
        PORT: "3001",
        HOST: "127.0.0.1",
        DATABASE_URL: process.env.DATABASE_URL,
      },
    },
  ],
};
