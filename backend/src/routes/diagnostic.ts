import { exec } from "node:child_process";
import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";

export const diagnosticRouter = Router();

diagnosticRouter.post("/ping", requireAuth, async (req, res) => {
  const host = String(req.body.host || "127.0.0.1");
  const command = process.platform === "win32" ? `ping -n 1 ${host}` : `ping -c 1 ${host}`;

  exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
    res.json({
      command,
      output: stdout,
      error: error ? String(error) : "",
      stderr
    });
  });
});
