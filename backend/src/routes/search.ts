import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

export const searchRouter = Router();

searchRouter.get("/", requireAuth, async (req, res) => {
  const q = String(req.query.q || "");
  const searchPattern = `%${q}%`;
  const rows = await prisma.$queryRaw`
    SELECT RepairOrder.id, RepairOrder.title, RepairOrder.description, RepairOrder.status, RepairOrder.totalPrice, Vehicle.plateNumber 
    FROM RepairOrder 
    LEFT JOIN Vehicle ON Vehicle.id = RepairOrder.vehicleId 
    WHERE RepairOrder.title LIKE ${searchPattern} 
    OR RepairOrder.description LIKE ${searchPattern} 
    ORDER BY RepairOrder.createdAt DESC
  `;
  res.json(rows);
});
