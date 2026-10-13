import type { Diagnosis, Entry } from "../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const assertNever =(value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const ratingColorMap: Record<number, string> = {
  0: "green",
  1: "yellow",
  2: "orange",
  3: "red"
};


const EntryDetails = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
    switch (entry.type) {
      case "Hospital":
        return <Card sx={{marginBottom: "1rem"}}><CardContent><p>{entry.date}<LocalHospitalIcon/></p> <p><i>{entry.description}</i></p> {entry.diagnosisCodes?.map((code, index) => {
          const diagnosesInfo = diagnoses.find(diag => diag.code === code);
          return <li key={index}>{diagnosesInfo?.name}</li>;
        })} <p>Discharge date: {entry.discharge.date} Discharge criteria: {entry.discharge.criteria}</p> <p>diagnose by: {entry.specialist}</p>
        </CardContent>
        </Card>;
        
      case "OccupationalHealthcare":
        return <Card sx={{marginBottom: "1rem"}}><CardContent><p>{entry.date}<WorkIcon />{entry.employerName}</p> <p><i>{entry.description}</i></p> {entry.diagnosisCodes?.map((code, index) => {
          const diagnosesInfo = diagnoses.find(diag => diag.code === code);
          return <li key={index}>{diagnosesInfo?.name}</li>;
        })} {entry.sickLeave && (
       <p>Sickleave start: {entry.sickLeave.startDate} Sickleave end: {entry.sickLeave.endDate}</p>
       )}
        <p>diagnose by: {entry.specialist}</p> 
        </CardContent>
        </Card>;
        
      case "HealthCheck":
        return <Card sx={{marginBottom: "1rem"}}><CardContent><p>{entry.date}<MedicalInformationIcon/></p> <p><i>{entry.description}</i></p>
        {entry.diagnosisCodes?.map((code, index) => {
          const diagnosesInfo = diagnoses.find(diag => diag.code === code);
          return <li key={index}>{diagnosesInfo?.name}</li>;
        })}
        {<FavoriteIcon sx={{color: ratingColorMap[entry.healthCheckRating]}} />}
         <p>diagnose by: {entry.specialist}</p></CardContent></Card>;
        
      default:
        return assertNever(entry);
    }  
};

export default EntryDetails;