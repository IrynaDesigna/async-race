import {garagePagination,carsContainer,clearContainer} from './main';
import {getCars} from './garage-render';
import {getWinners} from './winners-render';

// GETTING Cars on the current page
export function paginate(page,array, page_size, page_number) {
  page.childNodes[page_number-1].classList.add('current');
  let newCarsArr = array.slice((page_number - 1) * page_size, page_number * page_size);
  return newCarsArr;
}

// Pagination
export function getPagination(cars,page,container) {
  clearContainer(page);

  let pagesNums = Math.ceil(cars.length / 7);
  for (let i = 1; i <=pagesNums; i++ ) {
    let paginationPage = document.createElement('li');
    page.appendChild(paginationPage);
    paginationPage.innerText = i;

    paginationPage.classList.add('switch-page');
    paginationPage.onclick = function() {
      if (this.classList.contains('current')) {console.log(true);return}
      else {
        document.querySelector('.current').classList.remove('current');

        this.classList.add('current');
        clearContainer(container);
        if (page === garagePagination) {
          getCars(this.innerText);
        } else {
          getWinners(this.innerText);
        }

      };
    };
  }
}
