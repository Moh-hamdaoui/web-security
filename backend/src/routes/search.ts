import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

export const searchRouter = Router();

searchRouter.get("/", requireAuth, async (req, res) => {
  const q = String(req.query.q || "");
  const rows = await prisma.$queryRawUnsafe(
    "SELECT RepairOrder.id, RepairOrder.title, RepairOrder.description, RepairOrder.status, RepairOrder.totalPrice, Vehicle.plateNumber FROM RepairOrder LEFT JOIN Vehicle ON Vehicle.id = RepairOrder.vehicleId WHERE RepairOrder.title LIKE '%" +
      q +
      "%' OR RepairOrder.description LIKE '%" +
      q +
      "%' ORDER BY RepairOrder.createdAt DESC"
  );
  res.json(rows);
});
