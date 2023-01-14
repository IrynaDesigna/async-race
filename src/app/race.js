import {url} from './main';
import {getWinners} from './winners-render';

export async function race(thisPageCars) {
  let requests = [];

  for (let i = 0; i < thisPageCars.length; i++) {
    const currentCarId = thisPageCars[i].id;
    const currentCarName = thisPageCars[i].name;
        // ///////////////////
    let car = document.getElementById(`car-${currentCarId}`);
    const p =  fetch(`${url}engine?id=${currentCarId}&status=started`,{method: 'PATCH'}).then(res => res.json()).then((res) => {
      let time = res.distance/res.velocity;
      let distance = car.parentElement.clientWidth - 180;
      car.style.transform = `translateX(${distance}px)`;
      car.style.transition = `transform ${time/1000}s ease-out`;
      return fetch(`${url}engine?id=${currentCarId}&status=drive`, { method: 'PATCH' }).then(res => res.json()).then((res) =>  {
          return { id: currentCarId, name: currentCarName, time: time }
      }).catch((error) => {
        console.info(`oops ${currentCarId}-${thisPageCars[i].name}'s engine is broken, the car is disqualificated!`);
        let stop = car.getBoundingClientRect().x;
            car.style.transform = `translateX(${stop}px)`;
        return { id: currentCarId, status: "rejected", error: error };
      });
    });
    // ///////////////////
    requests.push(p);
  }

  const results = await Promise.all(requests);
  const filteredResults = results.filter((result) => result.status !== "rejected");
  if(filteredResults.length === 0){
    console.log("stop race for failed cars")
  }else{
    let winnerId = filteredResults[0].id;
    let winnerName = filteredResults[0].name;
    let winnerTime = filteredResults[0].time;
    for (let i = 1; i < filteredResults.length; i++) {
      if (filteredResults[i].time < winnerTime) {
        winnerId = filteredResults[i].id;
        winnerName = filteredResults[i].name;
        winnerTime = filteredResults[i].time;
      }
    }
    console.log(`The winner is: ${winnerName} id:${winnerId}`);
    winners(winnerId,winnerTime);
    return winnerId;
  }
}

export async function winners(id,time) {
  const checkWinner = await getWinner(id);
  if (checkWinner.id === id) {return updateWinner(id,time)};
  createWinner(id,time);
  getWinners(1);
}

export async function getWinner(id) {
  const winner = await fetch(`${url}winners/${id}`,{method: 'GET'}).then(res => res.json()).then((winner) => {return winner}).catch((err) => {return});
  return winner;
}

export async function createWinner(id,time,winsNum = 1) {
  const winner = { id: id, wins: winsNum, time: (time/1000).toFixed(2)};
  await fetch(`${url}winners`,{method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify(winner)});
  return console.log('The winner is created!');
}

export async function updateWinner(id,time) {
  const winner = await getWinner(id);
  let updatedWinner = {
    wins: winner.wins+1,
    id: id
  };
  if (time/1000 < winner.time) {
    updatedWinner.time = (time/1000).toFixed(2);
  } else {
    updatedWinner.time = winner.time;
  }
  return fetch(`${url}winners/${id}`,{method: 'PUT',headers: {'Content-Type': 'application/json'},body: JSON.stringify(updatedWinner)}).then(res => res.json())
         .then((res) => {console.info('The winner is updated!')});
}



export async function startEngine(id,car,name) {
  if (car.getBoundingClientRect().x !== 50) {
    alert('Car is alredy participated in a race! Reset the game.')
    return
  } else {
    startRace(id,car,name);
  }
};

async function startRace(id,car,name){
  const result = await fetch(`${url}engine?id=${id}&status=started`,{method: 'PATCH'}).then(res => res.json()).then((res) => {
    console.log(res);
    let time = res.distance/res.velocity;
    let distance = car.parentElement.clientWidth - 180;
    car.style.transform = `translateX(${distance}px)`;
    car.style.transition = `transform ${time/1000}s ease-out`;
    return fetch(`${url}engine?id=${id}&status=drive`, { method: 'PATCH' }).then(res => res.json()).then((res) =>  {
      console.log(`The winner is: ${name} id:${id}`);
      winners(id,time);
      return { id: id, time: time }
    }).catch((error) => {
      console.info(`oops ${id}-${name}'s engine is broken, the car is disqualificated!`);
      let stop = car.getBoundingClientRect().x;
          car.style.transform = `translateX(${stop}px)`;
      return { id: id, status: "rejected", error: error };
    });
  });
}

export function stopRace(id,car) {
  fetch(`${url}engine?id=${id}&status=stopped`,{method: 'PATCH'}).then((res) => res.json())
  .then((data) => {
    console.log('stopped!');
    console.log(car);
    let stop = car.getBoundingClientRect().x;
    car.style.transform = `translateX(${stop}px)`;
    return
  });
};
