import patientsData from "../data/patients.ts";
import type { NonSensitivePatient, Patient, newPatient } from "../types.ts";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientsData as Patient[];

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
  }));
};

const addPatient = (entry: newPatient): Patient => {
  const newPatientEntry: Patient = {
    id: uuid().toString(),
    ...entry,
  };

  patients.push(newPatientEntry);

  return newPatientEntry;
};

export default { getPatients, addPatient };
