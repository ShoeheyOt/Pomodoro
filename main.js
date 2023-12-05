// present hour to seconds
const nowHour = new Date().getHours() * 60 * 60;
//present minutes to seconds
const nowMin = new Date().getMinutes() * 60;
//present seconds
const nowSec = new Date().getSeconds();
//sum up present time in seconds in order to make time same stage as "Date.now()"
const nowTime = nowHour + nowMin + nowSec



const times = document.querySelector("input");
const display = document.querySelector('#display');
const display2 = document.querySelector('#display2');
const display3 = document.querySelector('#display3');


// times.addEventListener('keyup', (e) => {
//   if (e.key === 'Enter') {
//     const goalTime = Date.now() + (60000 * 1);
//     const restGoalTime = Date.now() + (30000 * 1);
//     setInterval(() => {
//     display.innerText = `${new Date(goalTime - Date.now()).getMinutes()} : ${new Date(goalTime - Date.now()).getSeconds()}`;
//     display2.innerText = `${new Date(restGoalTime - Date.now()).getMinutes()} : ${new Date(restGoalTime - Date.now()).getSeconds()}`;
//     }, 1000);
//     return;
//   }
// });

//add event to input
times.addEventListener('keyup', (e) => {
  e.key === 'Enter' && restTime();
})

//present time plus 60 seconds
const goalTime = Date.now() + (60000 * 1);
//present time plus 30 seconds
const restGoalTime = Date.now() + (30000 * 1);

//invoked after 30 seconds
function pomodoroTime () {
  return new Promise ((resolve) => {
    setTimeout(() => {
      setInterval(() => {
        display.innerText = `${new Date(goalTime - Date.now()).getMinutes()} : ${new Date(goalTime - Date.now()).getSeconds()}`;
      }, 1000);
    }, 30000)
  })
};

//set async function (rest time) await 25 minutes
async function restTime () {
  setInterval(() => {
    console.log(new Date(restGoalTime))
    console.log(new Date(Date.now()))
    display2.innerText = `${new Date(restGoalTime - Date.now()).getMinutes()} : ${new Date(restGoalTime - Date.now()).getSeconds()}`;
    }, 1000)
  const pomodoro = await pomodoroTime();
  display.innerText = pomodoro;
  }



//memo
// if (input = 1) {
  // setInterval(() => {
  // set timer for 25min. 
  // }, interval);
// } else {
  //async setInterval(same as if input = 1)  
  //for loop (i = input) 
  // await setinterval 5min and 25min 
  //}