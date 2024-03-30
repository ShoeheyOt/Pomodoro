export const start = () => {
  const start = Date.now();
  const twentyFiveMin = 1000 * 60 * 25;
  const goal = start + twentyFiveMin;
  const diff = new Date(goal - start).getMinutes();
  console.log(diff);
};
