import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { signToken } from "../lib/auth.js";
import { requireAuth } from "../middleware/auth.js";

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    res.status(401).json({ message: "Email not found" });
    return;
  }

  if (user.passwordHash !== password) {
    res.status(401).json({ message: "Incorrect password" });
    return;
  }

  const token = signToken({
    id: user.id,
    email: user.email,
    role: user.role,
    isAdmin: user.isAdmin
  });

  res.json({ token, user });
});

authRouter.post("/logout", (_req, res) => {
  res.json({ message: "Logged out" });
});

authRouter.get("/me", requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
  res.json(user);
});

authRouter.put("/me", requireAuth, async (req, res) => {
  const user = await prisma.user.update({
    where: { id: req.user!.id },
    data: req.body
  });
  res.json(user);
});
