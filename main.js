const nowHour = new Date().getHours() * 60 * 60;
const nowMin = new Date().getMinutes() * 60;
const nowSec = new Date().getSeconds();
const nowTime = nowHour + nowMin + nowSec

const times = document.querySelector("input");
const display = document.querySelector('#display');
const display2 = document.querySelector('#display2');
const display3 = document.querySelector('#display3');
 

times.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    const goalTime = Date.now() + (60000 * 25);
    const restGoalTime = Date.now() + (60000 * 5);
    setInterval(() => {
    display.innerText = `${new Date(goalTime - Date.now()).getMinutes()} : ${new Date(goalTime - Date.now()).getSeconds()}`;
    display2.innerText = `${new Date(restGoalTime - Date.now()).getMinutes()} : ${new Date(restGoalTime - Date.now()).getSeconds()}`;
    }, 1000);
  }
});
