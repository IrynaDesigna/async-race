import {garagePagination,carsContainer} from './main';
import {getCars} from './garage-render';


export function paginate(array, page_size, page_number) {
  garagePagination.childNodes[page_number-1].classList.add('current');
  let newCarsArr = array.slice((page_number - 1) * page_size, page_number * page_size);
  return newCarsArr;
}

export function getPagination(cars) {
  clearContainer(garagePagination);

  let pagesNums = Math.ceil(cars.length / 7);
  for (let i = 1; i <=pagesNums; i++ ) {
    let paginationPage = document.createElement('li');
    garagePagination.appendChild(paginationPage);
    paginationPage.innerText = i;

    paginationPage.classList.add('switch-page');
    paginationPage.onclick = function() {
      console.log('clicked');
      console.log(this);
      if (this.classList.contains('current')) {console.log(true);return}
      else {
        document.querySelector('.current').classList.remove('current');

        this.classList.add('current');
        clearContainer(carsContainer);
        getCars(this.innerText);
      };
    };
  }
}

function clearContainer(parent) {
  var child = parent.lastElementChild;
  while (child) {
      parent.removeChild(child);
      child = parent.lastElementChild;
  }
}
