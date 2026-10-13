import {  TextField, Grid, Button, Typography, Select, MenuItem, FormControl, InputLabel, OutlinedInput, Box, Chip} from '@mui/material';
import React, { useState } from 'react';
import type { Diagnosis, EntryFormValues } from '../types';

interface prop {
    setShowForm: (value: boolean) => void
    onSubmit: (value: EntryFormValues) => void
    diagnoses: Diagnosis[],
    error: string
}

const AddEntryForm = ({setShowForm, onSubmit, diagnoses, error}: prop) => {
    const [entryType, setEntryType] = useState<"HealthCheck" | "Hospital" | "OccupationalHealthcare">("HealthCheck");
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStart, setSickLeaveStart] = useState('');
    const [sickLeaveEnd, setSickLeaveEnd] = useState('');


    const addEntry = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const baseEntry = {
        date,
        description,
        specialist,
        diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined
        };

        switch (entryType) {
        case "HealthCheck":
            onSubmit({
                ...baseEntry,
                type: "HealthCheck",
                healthCheckRating: Number(healthCheckRating)
            }  as EntryFormValues);
            break;
            
        case "Hospital":
            onSubmit({
                ...baseEntry,
                type: "Hospital",
                discharge: {
                    date: dischargeDate,
                    criteria: dischargeCriteria
                }
            } as EntryFormValues) ;
            break;
            
        case "OccupationalHealthcare":
            onSubmit({
                ...baseEntry,
                type: "OccupationalHealthcare",
                employerName,
                sickLeave: sickLeaveStart && sickLeaveEnd 
                    ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
                    : undefined
            } as EntryFormValues) ;
            break;
            
        default:
            break;
    }
    };

    return <div style={{border: "1px dotted black", padding: "1.5em", borderRadius: "3px"}}>
        {error.length !== 0 && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={addEntry}>
        <Typography variant='h5' sx={{marginBottom: "0.5rem"}}>New entry</Typography>
        <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
          <InputLabel>Entry Type</InputLabel>
          <Select
            value={entryType}
            label="Entry Type"
            onChange={({ target }) => setEntryType(target.value as "HealthCheck" | "Hospital" | "OccupationalHealthcare")}
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="Hospital">Hospital Visit</MenuItem>
            <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          </Select>
        </FormControl>
        <TextField
        sx={{marginBottom: "1rem"}}
        label="Date"
          fullWidth 
          type='date'
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
        sx={{marginBottom: "1rem"}}
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
        sx={{marginBottom: "1rem"}}
          label="Specialist"
          fullWidth 
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            multiple
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(typeof target.value === 'string' ? target.value.split(',') : target.value)}
            input={<OutlinedInput label="Diagnosis Codes" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {diagnoses.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code} - {d.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

     {/* condition rendering*/ }
        {entryType === "HealthCheck" && (
          <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
            <InputLabel>Health Check Rating</InputLabel>
            <Select
              value={healthCheckRating}
              label="Health Check Rating"
              onChange={({ target }) => setHealthCheckRating(target.value)}
            >
              <MenuItem value="0">0 - Healthy</MenuItem>
              <MenuItem value="1">1 - Low Risk</MenuItem>
              <MenuItem value="2">2 - High Risk</MenuItem>
              <MenuItem value="3">3 - Critical Risk</MenuItem>
            </Select>
          </FormControl>
        )}
        {entryType === "Hospital" && <>
        <TextField
        sx={{marginBottom: "1rem"}}
        type="date"
        InputLabelProps={{ shrink: true }}
          label="dischargeDate"
          fullWidth 
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
        />
        <TextField
        sx={{marginBottom: "1rem"}}
          label="dischargeCriteria"
          fullWidth 
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
        />
        </>}

        {entryType === "OccupationalHealthcare" && <>
        <TextField
        sx={{marginBottom: "1rem"}}
          label="employerName"
          fullWidth 
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <TextField
        sx={{marginBottom: "1rem"}}
        type="date"
        InputLabelProps={{ shrink: true }}
          label="sickLeaveStart"
          fullWidth 
          value={sickLeaveStart}
          onChange={({ target }) => setSickLeaveStart(target.value)}
        />
        <TextField
        sx={{marginBottom: "1rem"}}
        type="date"
        InputLabelProps={{ shrink: true }}
          label="sickLeaveEnd"
          fullWidth 
          value={sickLeaveEnd}
          onChange={({ target }) => setSickLeaveEnd(target.value)}
        />
        </>
        }




        <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
          <Grid size="auto">
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </Grid>
          <Grid size="auto">
            <Button
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
        </form>
    </div>;
};

export default AddEntryForm;