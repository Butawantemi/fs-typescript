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

export function calculateBmi(height: number, weight: number): string {
  const heightInMeter: number = height / 100;
  const bmi: number = weight / heightInMeter ** 2;

  if (bmi < 18.5) {
    return "Underweight range";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight range";
  } else {
    return "Obese range";
  }
}

if (process.argv[0] === import.meta.filename) {
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
}
