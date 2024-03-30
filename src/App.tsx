import { start } from "./timer";

function App() {
  return (
    <>
      <header className="text-6xl">Pomodoro Timer</header>
      <main>
        <div className="flex justify-center gap-2 text-6xl mt-14 mb-5">
          <div>2</div>
          <div>5</div>
          <div>:</div>
          <div>0</div>
          <div>0</div>
        </div>
      </main>
      <button className="mr-5" onClick={start}>
        Start
      </button>
      <button>Stop</button>
    </>
  );
}

export default App;
