import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

export const usersRouter = Router();

usersRouter.get("/", requireAuth, async (_req, res) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" }
  });
  res.json(users);
});

usersRouter.get("/:id", requireAuth, async (req, res) => {
  const requestedId = Number(req.params.id);
  const currentUserId = (req as any).user.id;

  if (currentUserId !== requestedId && (req as any).user.role !== "admin") {
    res.status(403).json({ message: "Wa taymat, lehram inou urdis yad tkechmt" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { id: requestedId },
    include: {
      vehicles: true,
      orders: { include: { vehicle: true } }
    }
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json(user);
});

usersRouter.put("/:id", requireAuth, async (req, res) => {
  const requestedId = Number(req.params.id);
  const currentUserId = (req as any).user.id;
  const currentUserRole = (req as any).user.role;

  if (currentUserId !== requestedId && currentUserRole !== "admin") {
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  const { displayName, email, phone, role, internalNote } = req.body;
  const data: {
    displayName?: string;
    email?: string;
    phone?: string;
    role?: string;
    internalNote?: string;
  } = {};

  if (displayName !== undefined) data.displayName = String(displayName);
  if (email !== undefined) data.email = String(email);
  if (phone !== undefined) data.phone = String(phone);

  if (currentUserRole === "admin") {
    if (role !== undefined) data.role = String(role);
    if (internalNote !== undefined) data.internalNote = String(internalNote);
  }

  const user = await prisma.user.update({
    where: { id: requestedId },
    data
  });
  res.json(user);
});
