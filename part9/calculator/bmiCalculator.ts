interface Measurements {
  height: number;
  weight: number;
}

function calculateBmi(height: number, weight: number): string {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  } else if (bmi < 17) {
    return "Underweight (Moderate thinness)";
  } else if (bmi < 18.5) {
    return "Underweight (Mild thinness)";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi < 30) {
    return "Overweight (Pre-obese)";
  } else if (bmi < 35) {
    return "Obese (Class I)";
  } else if (bmi < 40) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
}

const parseArguments = (arguments: string[]): Measurements => {
  if (arguments.length !== 4) {
    throw new Error('Incorrect amount of arguments. Example use: npm run calculateBmi 170 72');
  }

  const height = Number(arguments[2]);
  const weight = Number(arguments[3]);

  if (Number.isNaN(height) || Number.isNaN(weight)) {
    throw new Error('Make sure your arguments are numbers. Example use: npm run calculateBmi 170 72');
  }

  return {
    height: height,
    weight: weight
  }
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'An error occurred while executing the application.'
  if (error instanceof Error) {
    errorMessage = `${errorMessage} Error: ${error.message}`;
  }

  console.log(errorMessage);
}


