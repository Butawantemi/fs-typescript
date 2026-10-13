import express, { type Request, type Response } from "express";
import patientService from "../services/patients.ts";
import {
  type EntryWithoutId,
  type newPatient,
  type NonSensitivePatient,
  type Patient,
} from "../types.ts";
import {
  newPatientParser,
  errorMiddleware,
  newEntryParser,
} from "../middleware.ts";

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

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = patientService.getSinglePatient(id);

  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  return res.json(patient);
});

router.post(
  "/:id/entries",
  newEntryParser,
  (
    req: Request<{ id: string }, unknown, EntryWithoutId>,
    res: Response<Patient | { error: string }>,
  ) => {
    const id = req.params.id;
    const patient = patientService.getSinglePatient(id);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const updatedPatient = patientService.addEntry(id, req.body);

    return res.json(updatedPatient);
  },
);

router.use(errorMiddleware);

export default router;
