import { useMatch } from "react-router-dom";
import type {Diagnosis, Patient } from "../types";
import patientService from "../services/patients";
import diagnoseService from "../services/diagnoses";
import { useEffect, useState } from "react";
import EntryDetails from "./EntryDetails";
import { Button, Typography} from "@mui/material";
import AddEntryForm from "./AddEntryForm";
import type { EntryFormValues } from "../types";
import axios from "axios";



const PatientDetailPage = () => {
    const [fullPatient, setFullPatient] = useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const match = useMatch("/patients/:id");

    useEffect(() => {
      const fetchPatient = async (id: string) => {
        const patient = await patientService.getAPatient(id);
        setFullPatient(patient);

        const fetchDiagnoses = await diagnoseService.getAll();
        setDiagnoses(fetchDiagnoses);
      };

      if (match?.params.id) {
      void fetchPatient(match.params.id);
      }
    }, [match?.params.id]);


    if(!fullPatient) {
        return <div>Loading....</div>;
    } 

    const submitNewEntry = async (values: EntryFormValues) => {
  try {
    const updatedPatient = await patientService.addEntry(fullPatient.id, values);
    setFullPatient(updatedPatient);
    setShowForm(false);
    setError("");
  } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    const errorData = err.response?.data;
    if (errorData && typeof errorData === 'object' && 'error' in errorData) {
      const errorPayload = errorData.error;
      if (Array.isArray(errorPayload)) {
        const messages = errorPayload
          .map((issue) => {
            if (issue && typeof issue === 'object' && 'message' in issue) {
              return String(issue.message);
            }
            return "Unknown error";
          })
          .join(', ');
        setError(messages);
        setTimeout(() => {
          setError("");
        }, 5000);
      } else {
        setError(String(errorPayload));
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    } else {
      setError("An unexpected validation error occurred");
      setTimeout(() => {
          setError("");
        }, 5000);
    }
  }
}
};

   

    return (
        <div>
          <Typography variant="h4">{fullPatient.name}</Typography>
          <p>ssn: {fullPatient.ssn}</p>
          <p>occupation: {fullPatient.occupation}</p>
          <p>date of birth: {fullPatient.dateOfBirth}</p>

          {showForm? (<AddEntryForm error={error} onSubmit={submitNewEntry} setShowForm={setShowForm} diagnoses={diagnoses}/>): (<div><Typography variant="h5">entries</Typography>
          {fullPatient.entries.map(e => (
           <div key={e.id}>
           <EntryDetails entry={e} diagnoses={diagnoses}/>
         </div>
          ))}
          <Button variant="contained" onClick={() => setShowForm(true)}>
            Add New Entry
           </Button></div>)}
          </div>
    );
};

export default PatientDetailPage;