interface bmiValues {
  height: number;
  weight: number;
}

interface bmiArg {
  heightInput: number;
  weightInput: number;
}

function parseArgs(argvs: string[]): bmiArg {
  if (argvs.length < 4) throw new Error("Not enough arguments");
  if (argvs.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(argvs[2])) && !isNaN(Number(argvs[3]))) {
    return {
      heightInput: Number(argvs[2]),
      weightInput: Number(argvs[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
}

function calculateBmi(height: number, weight: number): string {
  let heightInMeter: number = height / 100;
  const bmi: number = weight / heightInMeter ** 2;

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal weight";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
}

try {
  const { heightInput, weightInput } = parseArgs(process.argv);
  console.log(calculateBmi(heightInput, weightInput));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
