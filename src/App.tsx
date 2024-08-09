import { useState } from "react";

let intervalId: number | null;

function App() {
  const [minutes, setMinutes] = useState("25");
  const [seconds, setSeconds] = useState("00");

  const handleClickStart = () => {
    const start = Date.now();
    const twentyFiveMinutes = 1000 * 60 * 25;
    const goal = start + twentyFiveMinutes;

    //if already fired, clear the previous timer
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }

    //store ID into intervalId and start countdown
    intervalId = setInterval(() => {
      setMinutes(
        new Date(goal - Date.now()).getMinutes().toString().padStart(2, "0")
      );
      setSeconds(
        new Date(goal - Date.now()).getSeconds().toString().padStart(2, "0")
      );
    }, 100);
    //clearInterval when hits 0
    setTimeout(() => {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      clearInterval(intervalId!);
      // alert("25 minutes!!");
      window.open("https://www.youtube.com/watch?v=qRwxbA8HN34", "_blank");
    }, twentyFiveMinutes);
  };

  const handleClickPause = () => {
    intervalId && clearInterval(intervalId);
    return;
  };

  const handleClickReset = () => {
    intervalId && clearInterval(intervalId);
    setMinutes("25");
    setSeconds("00");
    intervalId = null;
  };
  const handleBreakStart = () => {
    const start = Date.now();
    const fiveMinutes = 1000 * 60 * 5;
    const goal = start + fiveMinutes;

    //if already fired, clear the previous timer
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    //store ID into intervalId and start countdown
    intervalId = setInterval(() => {
      setMinutes(
        new Date(goal - Date.now()).getMinutes().toString().padStart(2, "0")
      );

      setSeconds(
        new Date(goal - Date.now()).getSeconds().toString().padStart(2, "0")
      );
    }, 100);

    //clearInterval when hits 0
    setTimeout(() => {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      clearInterval(intervalId!);
      // alert("5 minutes!!");
      window.open("https://www.youtube.com/watch?v=qRwxbA8HN34", "_blank");
    }, fiveMinutes);
  };

  const handleResumeTimer = () => {
    const start = Date.now();
    // add remained seconds and minutes as unit of milliseconds
    const time = 1000 * Number(seconds) + 1000 * 60 * Number(minutes);
    const goal = start + time;
    intervalId = setInterval(() => {
      setMinutes(
        new Date(goal - Date.now()).getMinutes().toString().padStart(2, "0")
      );
      setSeconds(
        new Date(goal - Date.now()).getSeconds().toString().padStart(2, "0")
      );
    }, 100);

    setTimeout(() => {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      clearInterval(intervalId!);
    }, time);
  };

  return (
    <>
      <header className="text-4xl md:text-6xl">Pomodoro Timer</header>
      <main>
        <div className="flex justify-center gap-2 text-4xl md:text-6xl mt-14 mb-5">
          <div>{minutes}</div>
          <div>:</div>
          <div>{seconds}</div>
        </div>
        <div className="mx-2 flex gap-2 text-xs md:text-base">
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button onClick={handleClickStart}> 25 min</button>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button onClick={handleBreakStart}> 5 min</button>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button onClick={handleClickPause}>Stop</button>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button onClick={handleClickReset}>Reset</button>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button onClick={handleResumeTimer}>Resume</button>
        </div>
      </main>
    </>
  );
}

export default App;
