import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || !height || !weight) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  const message = calculateBmi(height, weight);

  return res.json({
    weight: weight,
    height: height,
    bmi: message,
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }

  const isArray = Array.isArray(daily_exercises);

  const validHours: boolean =
    isArray && daily_exercises.every((hours: string) => !isNaN(Number(hours)));

  if (isNaN(Number(target)) || !validHours) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }
  const data = calculateExercises(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    daily_exercises.map((hours: string) => Number(hours)),
    Number(target),
  );
  return res.json(data);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
