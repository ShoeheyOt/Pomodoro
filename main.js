const times = document.querySelector("input");
const display = document.querySelector('#display');
const display2 = document.querySelector('#display2');
const display3 = document.querySelector('#display3');

times.addEventListener('keyup', (e) => {
  if(e.key === 'Enter') {
    const fiveMin = 5000;
    const targetTime = Date.now() + (fiveMin * 3);
    const targetRestTime = Date.now() + (fiveMin * 1);
    setInterval(restTimes, 10, targetRestTime, targetTime, fiveMin);
    
  }
})

async function restTimes (targetRestTime, targetTime, fiveMin) {
  const nowTime = Date.now();
  display.innerText = `${new Date(targetRestTime - nowTime).getMinutes()} : ${new Date(targetRestTime - nowTime).getSeconds()}`;
  if(Math.floor(targetRestTime / 10) < Math.floor(Date.now() / 10) ) {
    clearInterval(restTimes);
    display.innerText = "Good Luck!!"
  } 
  
  const pomodoro = await pomodoroTime(targetTime, fiveMin);
  display2.innerText = pomodoro;
}

function pomodoroTime (targetTime, fiveMin) {
  return new Promise((resolve) =>{
    setTimeout(onePomodoro, fiveMin, targetTime);        
  })
};

const onePomodoro = (targetTime) => {
  setInterval(() => {
        const nowTime = Date.now();
        display2.innerText = `${new Date(targetTime - nowTime).getMinutes()} : ${new Date(targetTime - nowTime).getSeconds()}`;
        
        if( Math.floor(targetTime / 10) < Math.floor(Date.now() / 10)) {
          clearInterval(pomodoroTime);
          display2.innerText = 'You did it!'
        }
      }, 10
  )};