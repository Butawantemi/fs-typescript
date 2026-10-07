interface info {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface hoursArg {
  target: number;
  trainingHours: number[];
}

function purseArg(argvs: string[]): hoursArg {
  if (argvs.length < 12) throw new Error("Not enough arguments");

  const validHours: boolean = argvs
    .slice(3)
    .every((hours) => !isNaN(Number(hours)));

  if (!isNaN(Number(argvs[2])) && validHours) {
    return {
      target: Number(argvs[2]),
      trainingHours: argvs.slice(3).map((hours) => Number(hours)),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
}

function calculateExercises(
  trainingHours: number[],
  targetHours: number,
): info {
  let sumHours: number = 0;
  let trainDays: number = 0;
  let averageHours: number = 0;

  trainingHours.forEach((hours) => {
    sumHours += hours;

    if (hours !== 0) {
      trainDays += 1;
    }
  });
  averageHours = sumHours / trainingHours.length;
  let status: boolean = false;
  let rate: number = 1;
  let discription: string = "";
  if (averageHours >= targetHours) {
    status = true;
  }

  if (averageHours >= targetHours) {
    rate = 3;
    discription = "Congrat! you have met you target";
  } else if (averageHours + 0.3 >= targetHours) {
    rate = 2;
    discription = "not too bad but could be better";
  } else {
    rate = 1;
    discription = "too bad you need to improve!";
  }

  let result: info = {
    periodLength: trainingHours.length,
    trainingDays: trainDays,
    success: status,
    rating: rate,
    ratingDescription: discription,
    target: targetHours,
    average: averageHours,
  };

  return result;
}

try {
  const { target, trainingHours } = purseArg(process.argv);
  console.log(calculateExercises(trainingHours, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
