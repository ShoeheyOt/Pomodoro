const start = Date.now();
const twentyFiveMin = 1000 * 60 * 25;
const goal = start + twentyFiveMin;
const diff = () => {
  console.log(
    `${new Date(goal - Date.now()).getMinutes()}:${new Date(
      goal - Date.now()
    ).getSeconds()}`
  );
};
let intervalId: number | null;

export const handleClickStart = () => {
  if (!intervalId) intervalId = setInterval(diff, 1000);
  console.log(intervalId);
};

export const handleClickStop = () => {
  intervalId && clearInterval(intervalId);
  console.log(intervalId);
  intervalId = null;
};
