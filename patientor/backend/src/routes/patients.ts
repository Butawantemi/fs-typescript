import express, { type Request, type Response } from "express";
import patientService from "../services/patients.ts";
import {
  type newPatient,
  type NonSensitivePatient,
  type Patient,
} from "../types.ts";
import { newPatientParser, errorMiddleware } from "../middleware.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  const data = patientService.getPatients();
  res.json(data);
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, newPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  },
);

router.use(errorMiddleware);

export default router;
