import express from "express";
import cors from "cors";
import diagnosesRouters from "./routes/diagnoses.ts";
import patientsRouter from "./routes/patients.ts";

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get("/api/ping", (_req, res) => {
  res.send("Pong");
});

app.use("/api/diagnoses", diagnosesRouters);
app.use("/api/patients", patientsRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
