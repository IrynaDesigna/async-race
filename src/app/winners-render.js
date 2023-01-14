import {canvas} from './canvas';
import {url,winners,clearContainer,winnersPagination} from './main';
import {getPagination, paginate} from './pagination';

const winnersNav = document.createElement('ul');
const winnersList = document.createElement('div');
const winnersNum = document.createElement('li');
const winnersIMG = document.createElement('li');
const winnersNames = document.createElement('li');
const winnersWins= document.createElement('li');
const winnersBestTime = document.createElement('li');
const winnerPagination = document.createElement('ul');

winners.appendChild(winnersNav);
winners.appendChild(winnersList);
winners.appendChild(winnerPagination);
winnerPagination.setAttribute('id', 'winners-pagination');

winnersNav.setAttribute('id', 'winners-nav')
winnersNav.appendChild(winnersNum);
winnersNav.appendChild(winnersIMG);
winnersNav.appendChild(winnersNames);
winnersNav.appendChild(winnersWins);
winnersNav.appendChild(winnersBestTime);

winnersNum.innerText = '№';
winnersIMG.innerText = 'Image of the car';
winnersNames.innerText = 'Name of the car';
winnersWins.innerText = 'Wins number';
winnersBestTime.innerText = 'Best time in seconds';

winnersNav.setAttribute('id', 'winners-nav')
winnersWins.setAttribute('id','wins');
winnersBestTime.setAttribute('id','best-time');

winnersWins.onclick = function(){sortByWins(winnersList)};
winnersBestTime.onclick = function(){sortByBestTime(winnersList)};

export function getWinners(page,sort){
  clearContainer(winnersList);
  let thisPageCars;
  fetch(`${url}winners`, {
    method: 'GET'
  })
  .then((response) => response.json())
  .then((cars) => {
    getPagination(cars,winnerPagination,winnersList)
    let thisPageCars;
    if (page) {
      thisPageCars = paginate(winnerPagination,cars,7,page);
    } else {
      thisPageCars = paginate(winnerPagination,cars,7,1);
    };
    if (sort === 'by wins') {
      thisPageCars = cars.sort((a, b) => b.wins - a.wins);
    } else {
      thisPageCars = cars.sort((a, b) => a.time - b.time);
    }

    // thisPageCars

    for (const car of thisPageCars) {
        buldWinner(car);
    };
  });
}



function buldWinner(winner) {
  fetch(`${url}garage/${winner.id}`, {
    method: 'GET'
  })
  .then((response) => response.json())
  .then((car) => {
    buildWinnners(car,winner)
  });
};



function buildWinnners(car,winner) {
  const winnerRender = document.createElement('ul');
  const deleteWinner = document.createElement('li');
  const number = document.createElement('li');
  const image = document.createElement('li');
  const name = document.createElement('li');
  const wins = document.createElement('li');
  const time = document.createElement('li');

  winnersList.appendChild(winnerRender);
  winnerRender.classList.add('winner-descr');
  winnerRender.appendChild(deleteWinner);
  winnerRender.appendChild(number);
  winnerRender.appendChild(image);
  winnerRender.appendChild(name);
  winnerRender.appendChild(wins);
  winnerRender.appendChild(time);

  deleteWinner.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteWinner.classList.add('delete-winner');
  deleteWinner.setAttribute('id', `del-${car.id}`);
  number.innerText = car.id;


  image.classList.add('car');
  image.innerHTML = canvas;
  image.childNodes[4].childNodes[5].style.fill = car.color;

  name.innerText = car.name;
  wins.innerText = winner.wins;
  time.innerText = winner.time;

  deleteWinner.onclick = function(){winnerDelete(car.id,deleteWinner,winnerRender)};

}

async function winnerDelete(id,btn,car) {
  if (btn.id === `del-${id}`) {

    await fetch(`${url}winners/${id}`,{method: 'DELETE'});
    car.remove();
    console.log('Car is deleted!');
    getWinners(1);
  }
}

function sortByWins(winnersList) {
  const sort = 'by wins';
  getWinners(1,sort);
}

function sortByBestTime(winnersList) {
  getWinners(1);
}
