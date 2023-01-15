import {canvas} from './canvas';
import {url,winners,clearContainer,winnersPagination} from './main';
import {getPagination, paginate} from './pagination';

const winnersNav = document.createElement('ul'),
      winnersList = document.createElement('div'),
      winnersNum = document.createElement('li'),
      winnersIMG = document.createElement('li'),
      winnersNames = document.createElement('li'),
      winnersWins= document.createElement('li'),
      winnersBestTime = document.createElement('li');
// const winnerPagination = document.createElement('ul');

winners.appendChild(winnersNav);
winners.appendChild(winnersList);
winners.appendChild(winnersPagination);
winnersPagination.setAttribute('id', 'winners-pagination');

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
  return fetch(`${url}winners`,{method: 'GET'}).then((res) => res.json())
    .then((cars) => {
      getPagination(cars,winnersPagination,winnersList)
      let thisPageCars;
      if (page && sort === 'by wins') {
        thisPageCars = paginate(winnersPagination,cars.sort((a, b) => b.wins - a.wins),7,page);
      } else if (page) {
        thisPageCars = paginate(winnersPagination,cars.sort((a, b) => a.time - b.time),7,page);
      } else {
        thisPageCars = paginate(winnersPagination,cars,7,1);
      };
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
  const winnerRender = document.createElement('ul'),
        deleteWinner = document.createElement('li'),
        number = document.createElement('li'),
        image = document.createElement('li'),
        name = document.createElement('li'),
        wins = document.createElement('li'),
        time = document.createElement('li');

  winnersList.appendChild(winnerRender);
  winnerRender.appendChild(deleteWinner);
  winnerRender.appendChild(number);
  winnerRender.appendChild(image);
  winnerRender.appendChild(name);
  winnerRender.appendChild(wins);
  winnerRender.appendChild(time);

  winnerRender.classList.add('winner-descr');
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

// DELETE the Winner
async function winnerDelete(id,btn,car) {
  if (btn.id === `del-${id}`) {

    await fetch(`${url}winners/${id}`,{method: 'DELETE'});
    car.remove();
    console.log('Car is deleted!');
    getWinners(1);
  }
}
// SORT winners by wins quantity
function sortByWins(winnersList) {
  const sort = 'by wins';
  getWinners(1,sort);
}
// SORT winners by the best time
function sortByBestTime(winnersList) {
  getWinners(1);
}
