import { Router } from "express";

export const configRouter = Router();

configRouter.get("/public", (_req, res) => {
  res.json({
    appName: "GarageHub",
    environment: process.env.NODE_ENV || "development",
    debug: true,
    authMode: "jwt",
    tokenStorage: "localStorage",
    version: "1.0.0",
    databaseProvider: "sqlite",
    apiBaseUrl: "http://localhost:4000"
  });
});
