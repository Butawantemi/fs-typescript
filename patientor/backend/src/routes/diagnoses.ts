import express, { type Response } from "express";
import diagnoseService from "../services/diagnoses.ts";
import type { Diagnosis } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  const data = diagnoseService.getDiagnoses();
  res.json(data);
});

export default router;
