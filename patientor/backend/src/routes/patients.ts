import express, { type Response } from "express";
import patientService from "../services/patients.ts";
import type { NonSensitivePatient } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  const data = patientService.getPatients();
  res.json(data);
});

export default router;
