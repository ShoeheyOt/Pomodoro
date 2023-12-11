const times = document.querySelector("input");
const display = document.querySelector('#display');
const display2 = document.querySelector('#display2');
const display3 = document.querySelector('#display3');

times.addEventListener('keyup', (e) => {
  if(e.key === 'Enter') {
    const num = parseInt(times.value);
    display2.innerText = '';
    const fiveMin = 300000;
    let pomoGoal;
    // use it later Date.now() + ((fiveMin * 5) + (fiveMin * (num - 1) * 6));
    let breakGoal;
    //use it later  Date.now() + (fiveMin * (num - 1) * 6);
    let breakStart;
    //use it later (fiveMin * 5) + (fiveMin * (num - 1) * 6);
    let pomoStart ;
    //use it later fiveMin * (num - 1) * 6;
   
    if (!num) {
        alert('Please input a number which how long you want focus on');
        times.value = '';
        return;
      };
      recPomo(num, pomoGoal, breakGoal, fiveMin, breakStart, pomoStart);    
    // id = setInterval(onePomodoro, 10, pomoGoal);
    // setTimeout(myStopInterval, 5000, id)
    // if(parseInt(times.value) !== 1) {
    //     const setRestPomodoro = setInterval(restTimes, 10, breakGoal, pomoGoal)
    //     setTimeout(setRestPomodoro, pomoGoal) ;
    //   }    
     //5min rest and 25min sets executed
  }
})

//Recursive way for pomodoro
function recPomo(num, pomoGoal, breakGoal, fiveMin, breakStart, pomoStart) {
  pomoStart = fiveMin * (num - 1) * 6;
  pomoGoal = Date.now() + ((fiveMin * 5) + (fiveMin * (num - 1) * 6));
  breakStart = (fiveMin * 5) + (fiveMin * (num - 2) * 6);
  breakGoal = Date.now() + (fiveMin * (num - 1) * 6);
  if (num == 1) {
    myPomoInterval(pomoGoal, num);
    return;
  } else {  
    recPomo(num - 1, pomoGoal, breakGoal, fiveMin, breakStart, pomoStart);
    setTimeout(restPomo, breakStart, breakGoal);
    setTimeout(myPomoInterval, pomoStart, pomoGoal, num);
    return;
  }
}

const myPomoInterval = (pomoGoal, num) => {
  //fn for showing the difference of now and goal time
  const onePomodoro = (pomoGoal, num) => { 
    let nowTime = Date.now();
    display2.innerText = `onePomo ${num} ${new Date(pomoGoal - nowTime).getMinutes()} : ${new Date(pomoGoal - nowTime).getSeconds()}`;
    
    if(Math.floor(pomoGoal / 10) <= Math.floor(nowTime / 10) ) {
     myStopInterval(id);
    }
  };
  //fn for clear interval
  const myStopInterval = (id) => {
    clearInterval(id);
    display2.innerText = '';
  }
  //reference and invoke key
  const id = setInterval(onePomodoro, 10, pomoGoal, num);
};

//fn for watching rest time count down
const restPomo = (breakGoal) => { 
  let oneRest = (breakGoal) => {
    const nowTime = Date.now();
     display2.innerText = `restPomo ${new Date(breakGoal - nowTime).getMinutes()} : ${new Date(breakGoal - nowTime).getSeconds()}`;
     if(Math.floor(breakGoal / 10) <= Math.floor(nowTime / 10) ) {
      restStopInterval(ids);
     }
  };
  const restStopInterval = (ids) => {
    clearInterval(ids);
    display2.innerText = '';
  };
  const ids = setInterval(oneRest, 10, breakGoal);
};



// async function restTimes (breakGoal, pomoGoal, fiveMin) {
//   const nowTime = Date.now();
//   display.innerText = `${new Date(breakGoal - nowTime).getMinutes()} : ${new Date(breakGoal - nowTime).getSeconds()}`;
//   if(Math.floor(breakGoal / 10) < Math.floor(Date.now() / 10) ) {
//     clearInterval(restTimes);
//     display.innerText = "Good Luck!!"
//   } 
  
//   const pomodoro = await pomodoroTime(pomoGoal, fiveMin);
//   display2.innerText = pomodoro;
// }

// function pomodoroTime (pomoGoal, fiveMin) {
//   return new Promise((resolve) =>{
//     setTimeout(onePomodoro, fiveMin, pomoGoal);        
//   })
// };