import patientsData from "../data/patients.ts";
import type { NonSensitivePatient, Patient } from "../types.ts";

const patients: Patient[] = patientsData;

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
  }));
};

export default { getPatients };
