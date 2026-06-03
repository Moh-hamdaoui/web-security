import { Router } from "express";
import bcrypt from "bcryptjs";
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

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
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
  const { displayName, email, phone } = req.body;
  const data: { displayName?: string; email?: string; phone?: string } = {};

  if (displayName !== undefined) data.displayName = String(displayName);
  if (email !== undefined) data.email = String(email);
  if (phone !== undefined) data.phone = String(phone);

  const user = await prisma.user.update({
    where: { id: req.user!.id },
    data
  });
  res.json(user);
});
