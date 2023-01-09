import {canvas} from './canvas';
import {url,winners} from './main';
import {getPagination, paginate} from './pagination';


export function getWinners(page){
  fetch(`${url}winners`, {
    method: 'GET'
  })
  .then((response) => response.json())
  .then((cars) => {
    console.log(cars);
    let thisPageCars;

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

const winnersNav = document.createElement('ul');
const winnersList = document.createElement('div');

winners.appendChild(winnersNav);
winners.appendChild(winnersList);


winnersNav.setAttribute('id', 'winners-nav')
winnersNav.innerHTML = `
    <li>№</li>
    <li>Image of the car</li>
    <li>Name of the car</li>
    <li>Wins number</li>
    <li>Best time in seconds</li>
`;


function buildWinnners(car,winner) {
  const winnerRender = document.createElement('ul');
  const number = document.createElement('li');
  const image = document.createElement('li');
  const name = document.createElement('li');
  const wins = document.createElement('li');
  const time = document.createElement('li');

  winnersList.appendChild(winnerRender);
  winnerRender.classList.add('winner-descr');
  winnerRender.appendChild(number);
  winnerRender.appendChild(image);
  winnerRender.appendChild(name);
  winnerRender.appendChild(wins);
  winnerRender.appendChild(time);

  number.innerText = car.id;

  image.classList.add('car');
  image.innerHTML = canvas;
  image.childNodes[4].childNodes[5].style.fill = car.color;

  name.innerText = car.name;
  wins.innerText = winner.wins;
  time.innerText = winner.time;

}
