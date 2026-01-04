import { useState, useEffect } from "react";

let intervalId: number | null;

function App() {
  const [minutes, setMinutes] = useState("25");
  const [seconds, setSeconds] = useState("00");
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      return stored === "true";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Apply dark class to document element
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save preference to localStorage
    localStorage.setItem("darkMode", isDark.toString());
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

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
      <div className="absolute top-4 right-4">
        <button
          type="button"
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            <svg
              className="w-6 h-6 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-gray-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>
      <header className="text-4xl md:text-6xl text-gray-900 dark:text-white">
        Pomodoro Timer
      </header>
      <main>
        <div className="flex justify-center gap-2 text-4xl md:text-6xl mt-14 mb-5 text-gray-900 dark:text-white">
          <div>{minutes}</div>
          <div>:</div>
          <div>{seconds}</div>
        </div>
        <div className="mx-2 flex gap-2 text-xs md:text-base">
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            onClick={handleClickStart}
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            25 min
          </button>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            onClick={handleBreakStart}
            className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            5 min
          </button>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            onClick={handleClickPause}
            className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white px-4 py-2 rounded"
          >
            Stop
          </button>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            onClick={handleClickReset}
            className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Reset
          </button>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            onClick={handleResumeTimer}
            className="bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            Resume
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
