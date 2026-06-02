import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

export const ordersRouter = Router();

ordersRouter.get("/", requireAuth, async (req, res) => {
  const orders = await prisma.repairOrder.findMany({
    where: req.user!.isAdmin ? undefined : { userId: req.user!.id },
    include: {
      user: true,
      vehicle: true,
      comments: { include: { user: true }, orderBy: { createdAt: "asc" } }
    },
    orderBy: { createdAt: "desc" }
  });
  res.json(orders);
});

ordersRouter.get("/:id", requireAuth, async (req, res) => {
  const order = await prisma.repairOrder.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      user: true,
      vehicle: true,
      comments: { include: { user: true }, orderBy: { createdAt: "asc" } }
    }
  });
  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }
  res.json(order);
});

ordersRouter.post("/:id/comments", requireAuth, async (req, res) => {
  const comment = await prisma.comment.create({
    data: {
      orderId: Number(req.params.id),
      userId: req.user!.id,
      content: req.body.content
    },
    include: { user: true }
  });
  res.status(201).json(comment);
});
