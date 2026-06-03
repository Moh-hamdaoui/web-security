import { Router } from "express";

export const debugRouter = Router();

debugRouter.get("/error", (_req, res) => {
  try {
    throw new Error("GarageHub debug route failure");
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      name: err.name,
      message: "Internal server error"
    });
  }
});
