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
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
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
  const user = await prisma.user.update({
    where: { id: Number(req.params.id) },
    data: req.body
  });
  res.json(user);
});
