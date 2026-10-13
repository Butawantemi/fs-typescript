import patientsData from "../data/patients.ts";
import type {
  EntryWithoutId,
  NonSensitivePatient,
  Patient,
  newPatient,
} from "../types.ts";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientsData;

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, occupation, gender, dateOfBirth, entries }) => ({
      id,
      name,
      occupation,
      gender,
      dateOfBirth,
      entries,
    }),
  );
};

const addPatient = (entry: newPatient): Patient => {
  const newPatientEntry: Patient = {
    id: uuid().toString(),
    ...entry,
  } as Patient;

  patients.push(newPatientEntry);

  return newPatientEntry;
};

const getSinglePatient = (id: string) => {
  return patients.find((patient) => patient.id === id);
};

const addEntry = (id: string, entry: EntryWithoutId): Patient | undefined => {
  const newEntry = {
    id: uuid().toString(),
    ...entry,
  };

  const patientToUpdate = patients.find((patient) => patient.id === id);

  if (patientToUpdate) {
    patientToUpdate.entries.push(newEntry);
  }

  return patientToUpdate;
};

export default { getPatients, addPatient, getSinglePatient, addEntry };
