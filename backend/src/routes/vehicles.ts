import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

export const vehiclesRouter = Router();

vehiclesRouter.get("/", requireAuth, async (req, res) => {
  const vehicles = await prisma.vehicle.findMany({
    where: req.user!.isAdmin ? undefined : { ownerId: req.user!.id },
    include: { owner: true, orders: true },
    orderBy: { createdAt: "desc" }
  });
  res.json(vehicles);
});

vehiclesRouter.get("/:id", requireAuth, async (req, res) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: Number(req.params.id) },
    include: { owner: true, orders: true }
  });
  if (!vehicle) {
    res.status(404).json({ message: "Vehicle not found" });
    return;
  }
  res.json(vehicle);
});
