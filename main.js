import './style.css'

const times = document.querySelector("input");
const display = document.querySelector('#display');
const display2 = document.querySelector('#display2');
const display3 = document.querySelector('#display3');
let pomoIntervalSwitch;
let breakSwitch;
times.addEventListener('keyup', (e) => {
  if(e.key === 'Enter') {
      const inputVal = parseInt(times.value);
      times.value = '';
      if (!inputVal) {
          alert('Please input a number which how long you want focus on');
          times.value = '';
          return;
        }; 
      if(pomoIntervalSwitch) {
        myClearInterval()
      } else if(breakSwitch){
        breakClearInterval()
      }
      let now = Date.now()
      if (inputVal == 1) {
        pomoIntervalSwitch = setInterval(onePomodoro, 100, inputVal, now)
      }
      if(inputVal > 1) {
        let num = inputVal
        pomoIntervalSwitch = setInterval(onePomodoro, 100, inputVal, now)
        breakSwitch = function() {setInterval(breakTime, 100, inputVal, now)}
        while ( num > 1) {
          setTimeout(pomoIntervalSwitch, 300000 * 6 * (num - 1))
          setTimeout(breakSwitch, 30000 * 5 + (30000 * 6 * (num - 2)))
          num --;
        }
      }
  }
})
function onePomodoro(num, now) {
  const fiveMin = 300000;
  let startTiming = fiveMin * 6 * (num - 1)
  let pomoGoalTime = now + fiveMin * 5 + fiveMin * 6 * (num - 1)
  display2.innerText = `onePomo ${num} ${new Date(pomoGoalTime - startTiming - Date.now()).getMinutes()} : ${new Date(pomoGoalTime - Date.now()).getSeconds()}`;
  if(Math.floor(pomoGoalTime / 10) <= Math.floor(Date.now() / 10)) {
    myClearInterval()
  }
}

function breakTime(num, now) {
  const fiveMin = 300000
  const breakStart = fiveMin * 6 * (num - 2)
  const breakEndTime = now + fiveMin + fiveMin * 6 * (num - 2)
  display2.innerText = `Break Time ${new Date(breakEndTime - breakStart -Date.now()).getMinutes()} : ${new Date(breakEndTime - Date.now()).getSeconds()}`;
  if(Math.floor(breakEndTime / 10) <= Math.floor(Date.now() / 10)) {
    breakClearInterval()
  }
}
function myClearInterval() {
  clearInterval(pomoIntervalSwitch)
  display2.innerText = '';
  pomoIntervalSwitch = null
}

function breakClearInterval() {
  clearInterval(breakSwitch)
  display2.innerText = '';
  breakSwitch = null
}

