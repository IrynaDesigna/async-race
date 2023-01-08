import {canvas} from './canvas';
import {page, url, resetBtn, raceBtn, resetCars, carSelection, deleteTheCar, carsContainer} from './main';
import {getPagination, paginate} from './pagination';
import {race,startEngine} from './race';


export function getCars(page) {
      return fetch(`${url}garage`, {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((cars) => {
        // clearContainer(carsContainer);
        getPagination(cars);
        console.log(cars.length);
        let thisPageCars;
        if (page){
          thisPageCars = paginate(cars,7,page);
        } else { thisPageCars = paginate(cars,7,1); };

        for (const car of thisPageCars) {
          buildCar(car.name,car.color,car.id);
        };
        resetBtn.onclick = function(){resetCars()};
        raceBtn.onclick = function(){race(thisPageCars)};

      });
  };

  function buildCar(name,color,id) {
    const theCar = document.createElement('li'),
          carName = document.createElement('div'),
          carContainer = document.createElement('div'),
          road = document.createElement('div'),
          finish = document.createElement('div'),
          carWrapper = document.createElement('div'),
          carImg = document.createElement('iframe'),
          carControl = document.createElement('div'),
          select = document.createElement('div'),
          deleteCar = document.createElement('div'),
          play = document.createElement('div'),
          stop = document.createElement('div');

    carsContainer.appendChild(theCar);
    theCar.appendChild(carName);
    theCar.setAttribute('id',id);
    carName.classList.add('car-name');
    carName.innerText = '- - - ' + name + ' - - -';
    theCar.appendChild(carContainer);
    carContainer.classList.add('car-container');
    carContainer.appendChild(road);
    road.classList.add('road');
    carContainer.appendChild(finish);
    finish.classList.add('finish');
    carContainer.appendChild(carWrapper);
    carWrapper.classList.add('car');
    carWrapper.innerHTML = canvas;
    carWrapper.childNodes[4].childNodes[5].style.fill = color;
    theCar.appendChild(carControl);
    carControl.classList.add('car-control');
    carControl.appendChild(select);
    select.classList.add('select','car-control-btn');
    select.innerText = 'Select';
    carControl.appendChild(deleteCar);
    deleteCar.classList.add('delete','car-control-btn');
    deleteCar.innerText = 'Delete';
    carControl.appendChild(play);
    play.classList.add('play','car-control-btn');
    play.innerHTML = '<i class="fa-solid fa-play"></i>';
    carControl.appendChild(stop);
    stop.classList.add('stop','car-control-btn');
    stop.innerHTML = '<i class="fa-solid fa-stop"></i>';

    deleteCar.onclick = function(){deleteTheCar(deleteCar)};
    select.onclick = function(){carSelection(select)};
    play.onclick = function(){startEngine(play,stop)};
    // stop.onclick = function(){stopEngine(stop)};
  }
