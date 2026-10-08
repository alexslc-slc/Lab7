import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import db from "./app/models/index.js";
import authRoutes from "./app/routes/auth.routes.js";
import userRoutes from "./app/routes/user.routes.js";
import authConfig from "./app/config/auth.config.js";

const app = express();
const PORT = Number(process.env.PORT || 3000);
const projectDirectory = path.dirname(fileURLToPath(import.meta.url));
const frontendBuild = path.join(projectDirectory, "dist");
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:8080",
  process.env.FRONTEND_ORIGIN,
].filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/test", userRoutes);

if (existsSync(frontendBuild)) {
  app.use(express.static(frontendBuild));
  app.get(/^\/(?!api(?:\/|$)).*/, (_req, res) => {
    res.sendFile(path.join(frontendBuild, "index.html"));
  });
}

const start = async () => {
  if (!authConfig.secret) {
    throw new Error("JWT_SECRET no está configurado. Revisa el archivo .env.");
  }

  await db.sequelize.authenticate();
  await db.sequelize.sync();
  await Promise.all(
    db.ROLES.map((name) => db.role.findOrCreate({ where: { name } })),
  );

  console.log("Conectado a PostgreSQL; modelos y roles listos.");
  app.listen(PORT, () => {
    console.log(`Servidor disponible en http://localhost:${PORT}`);
  });
};

start().catch((error) => {
  console.error("No se pudo iniciar la aplicación:", error);
  process.exitCode = 1;
});