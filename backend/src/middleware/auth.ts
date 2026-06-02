import type { NextFunction, Request, Response } from "express";
import { verifyToken, type AuthUser } from "../lib/auth.js";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  try {
    req.user = verifyToken(header.slice(7));
    next();
  } catch (error) {
    req.user = undefined;
    res.status(401).json({ message: "Invalid token", detail: String(error) });
  }
}
