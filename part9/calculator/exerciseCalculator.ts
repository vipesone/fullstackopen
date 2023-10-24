interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

function calculateExercises(exerciseHours: number[], targetHoursPerDay: number): Result {
  const totalHours = exerciseHours.reduce((currentTotal, current) => currentTotal + current, 0);
  const trainingDays = exerciseHours.filter((hours) => hours > 0).length;
  const targetHours = targetHoursPerDay * exerciseHours.length;

  let rating = 1;
  if (totalHours >= targetHours) {
    rating = 3;
  } else if (totalHours >= (targetHours * 0.75)) {
    rating = 2;
  }

  return {
    periodLength: exerciseHours.length,
    trainingDays: trainingDays,
    success: totalHours >= targetHours,
    rating: 2,
    ratingDescription: getRatingDescription(rating),
    target: targetHoursPerDay,
    average: totalHours / exerciseHours.length
  }
}

function getRatingDescription(rating: number): string {
  switch (rating) {
    case 1:
      return "Push a little bit harder to get closer to the goal.";
    case 2:
      return "Keep up the good work, almost there.";
    case 3:
      return "You reached your target, good job!";
    default:
      return "Could not determine rating.";
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
