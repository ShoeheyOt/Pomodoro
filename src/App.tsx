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
      clearInterval(intervalId!);
      alert("25 minutes!!");
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
      clearInterval(intervalId!);
    }, fiveMinutes);
  };

  const handleResumeTimer = () => {
    const start = Date.now();
    // add remained seconds and minutes as unit of milliseconds 
    const time = (1000 * parseInt(seconds) ) + (1000 * 60 * parseInt(minutes))
    const goal = start + time;
    intervalId = setInterval (() => {
      setMinutes(new Date(goal - Date.now()).getMinutes().toString().padStart(2,"0"));
      setSeconds(new Date(goal - Date.now()).getSeconds().toString().padStart(2,"0"));
    }, 100)

    setTimeout(()=> {
      clearInterval(intervalId!);
    }, time)
  };

  return (
    <>
      <header className="text-6xl">Pomodoro Timer</header>
      <main>
        <div className="flex justify-center gap-2 text-6xl mt-14 mb-5">
          <div>{minutes}</div>
          <div>:</div>
          <div>{seconds}</div>
        </div>
        <button onClick={handleClickStart}> 25 min start</button>
        <button onClick={handleBreakStart}> 5 min start</button>
        <button onClick={handleClickPause}>Stop</button>
        <button onClick={handleClickReset}>Reset</button>
        <button onClick={handleResumeTimer}>Resume</button>
      </main>
    </>
  );
}

export default App;
