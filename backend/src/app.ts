import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.js";
import { usersRouter } from "./routes/users.js";
import { vehiclesRouter } from "./routes/vehicles.js";
import { ordersRouter } from "./routes/orders.js";
import { searchRouter } from "./routes/search.js";
import { diagnosticRouter } from "./routes/diagnostic.js";
import { debugRouter } from "./routes/debug.js";
import { configRouter } from "./routes/config.js";

export const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "garagehub-api" });
});

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/vehicles", vehiclesRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/search", searchRouter);
app.use("/api/diagnostic", diagnosticRouter);
app.use("/api/debug", debugRouter);
app.use("/api/config", configRouter);
