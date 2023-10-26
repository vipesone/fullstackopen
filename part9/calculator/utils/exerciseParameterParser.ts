

interface ExerciseParameters {
  exercises: number[],
  targetHoursPerDay: number,
}

const parseExerciseArguments = (args: string[]): ExerciseParameters => {
  if (args.length < 4) {
    throw new Error('Incorrect amount of arguments. Example use: npm run calculateBmi 170 72');
  }

  const [ executable, script, targetHoursPerDayRaw, ...exercisesRaw] = args;

  const exercises = exercisesRaw.map((exercise) => {
    const hours = Number(exercise);
    if (Number.isNaN(hours)) {
      throw new Error('Make sure all arguments are numbers.');
    }
    return hours;
  });

  const targetHoursPerDay = Number(targetHoursPerDayRaw);

  if (Number.isNaN(targetHoursPerDay)) {
    throw new Error('Make sure all arguments are numbers.');
  }

  return {
    exercises,
    targetHoursPerDay
  };
};

export default parseExerciseArguments;
