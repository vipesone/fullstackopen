import parseExerciseArguments from './utils/exerciseParameterParser';
import calculateExercises from './utils/exerciseCalculator';

try {
  const { exercises, targetHoursPerDay } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(exercises, Number(targetHoursPerDay)));
} catch (error: unknown) {
  let errorMessage = 'An error occurred while executing the application.'
  if (error instanceof Error) {
    errorMessage = `${errorMessage} Error: ${error.message}`;
  }

  console.log(errorMessage);
}


