// app/config/db.config.js
export default {
  HOST: process.env.DB_HOST || process.env.PGHOST || "localhost",
  USER: process.env.DB_USER || process.env.PGUSER || "postgres",
  PASSWORD: process.env.DB_PASSWORD ?? process.env.PGPASSWORD ?? "",
  DB: process.env.DB_NAME || process.env.PGDATABASE || "jwt_db",
  PORT: Number(process.env.DB_PORT || process.env.PGPORT || 5432),
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};