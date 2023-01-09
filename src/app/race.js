import {url} from './main';
let promices = [];

export function race(thisPageCars) {
        promices = [];
        let cars = document.getElementsByClassName('car');
        for (let i = 0; i < cars.length; i++) {
          let id = thisPageCars[i].id;
          console.log(cars[i].id);



          let stopBtn = cars[i].parentElement.parentElement.childNodes[2].childNodes[3];
          fetch(`${url}engine?id=${id}&status=started`, {
            method: 'PATCH'
          })
          .then((response) => response.json())
          .then((carData) => {
            console.log(carData);
            let car = cars[i];
            startRace(id,car,carData,stopBtn);
          });
        }
      };

export function startEngine(startBtn, stopBtn) {
        let id = startBtn.parentNode.parentElement.id;
        fetch(`${url}engine?id=${id}&status=started`, {
          method: 'PATCH'
        })
        .then((response) => response.json())
        .then((carData) => {
          console.log(carData);
          let car = startBtn.parentElement.parentElement.childNodes[1].childNodes[2];
          startRace(id,car,carData,stopBtn);
        });
      };

function startRace(id,car,carData, stopBtn){
  if (car.getBoundingClientRect().x !== 50) {
    alert('Car is alredy participated in a race! Reset the game.')
    return
  } else {
    let distance = car.parentElement.clientWidth - 180;
    let time = carData.distance / carData.velocity;
    try {
      raceAnimation(id,stopBtn,car,time,distance);
    } catch (e) {
      console.error(e);
    }
  }
};

function raceAnimation(id,stopBtn,car,time,distance){
  car.style.transform = `translateX(${distance}px)`;
  car.style.transition = `transform ${time/1000}s ease-out`;

  drive(id,car);
};

export function stopRace(id,car) {
  fetch(`${url}engine?id=${id}&status=stopped`, {
    method: 'PATCH'
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('stopped!');
    drive(id,car);
    stop();
    return
  });
};

function drive(id,car) {
  fetch(`${url}engine?id=${id}&status=drive`, {
    method: 'PATCH'
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    // if( car.childNodes[1].childNodes[2] !== undefined ) {
      let stop = car.childNodes[1].childNodes[2].getBoundingClientRect().x;
      car.childNodes[1].childNodes[2].style.transition = 'none';
      car.childNodes[1].childNodes[2].style.transform = `translateX(${stop}px)`;
    // }

    console.log('Ooops, ' + car.parentElement.parentElement.childNodes[0].innerText + `'s engine is died!'`);
  });
}
