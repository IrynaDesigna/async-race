import {getCars} from './garage-render';

export const body = document.querySelector('body');
export const nav = document.createElement('nav');
export const pages = document.createElement('ul');
export const garagePage = document.createElement('li');
export const winnersPage = document.createElement('li');
export const pageTitle = document.createElement('h1');
export const main = document.createElement('main');
export const garage = document.createElement('div');
export const winners = document.createElement('div');
export const carsFactory = document.createElement('div');
export const carsContainer = document.createElement('ul');
export const garagePagination = document.createElement('ul');
export const formsWrapper = document.createElement('div');
export const createCar = document.createElement('form');
export const editCar = document.createElement('form');
export const inputTextCreate = document.createElement('input');
export const inputColorCreate = document.createElement('input');
export const inputSubmitCreate = document.createElement('input');
export const inputTextEdit = document.createElement('input');
export const inputColorEdit = document.createElement('input');
export const inputSubmitEdit = document.createElement('input');
export const gameController = document.createElement('div');
export const raceBtn = document.createElement('div');
export const resetBtn = document.createElement('div');
export const generateCarsBtn = document.createElement('div');
export const url = 'http://localhost:3000/';

 body.appendChild(nav);
 body.appendChild(main);

 nav.appendChild(pages);
 nav.appendChild(pageTitle);
 pageTitle.innerText = 'Async race';

 pages.appendChild(garagePage);
 garagePage.innerText = 'garage';
 garagePage.classList.add('active');
 pages.appendChild(winnersPage);
 winnersPage.innerText = 'winners';

 main.appendChild(garage);
 main.appendChild(winners);
 garage.setAttribute('id', 'garage');
 winners.setAttribute('id', 'winners');

 garage.appendChild(carsFactory);
 garage.appendChild(carsContainer);
 garage.appendChild(garagePagination);
 garage.appendChild(carsContainer);
 garage.appendChild(garagePagination);


 carsContainer.classList.add('cars-container');
 garagePagination.setAttribute('id', 'garage-pagination')

 carsFactory.setAttribute('id', 'cars-factory');
 carsContainer.setAttribute('id', 'cars-container');
 garagePagination.setAttribute('id', 'garage-pagination');

 carsFactory.appendChild(formsWrapper);
 formsWrapper.appendChild(createCar);
 formsWrapper.appendChild(editCar);
 carsFactory.appendChild(gameController);
 gameController.setAttribute('id', 'game-controller');


 createCar.setAttribute('id', 'create-car');
 createCar.classList.add('forms');
 createCar.appendChild(inputTextCreate);
 inputTextCreate.setAttribute('type', 'text');
 inputTextCreate.setAttribute('name', 'name');
 createCar.appendChild(inputColorCreate);
 inputColorCreate.setAttribute('type', 'color');
 inputColorCreate.setAttribute('name', 'color');
 inputColorCreate.setAttribute('id', 'colorpicker');
 inputColorCreate.setAttribute('value', '#ff4da6');
 createCar.appendChild(inputSubmitCreate);
 inputSubmitCreate.setAttribute('id', 'carCreator');
 inputSubmitCreate.setAttribute('type', 'submit');
 inputSubmitCreate.setAttribute('value', 'Create a car');
 inputSubmitCreate.innerText = 'Create a car';

 editCar.setAttribute('id', 'edit-car');
 editCar.classList.add('forms');
 editCar.appendChild(inputTextEdit);
 inputTextEdit.setAttribute('type', 'text');
 inputTextEdit.setAttribute('name', 'name');
 editCar.appendChild(inputColorEdit);
 inputColorEdit.setAttribute('type', 'color');
 inputColorEdit.setAttribute('name', 'color');
 inputColorEdit.setAttribute('id', 'colorpicker');
 inputColorEdit.setAttribute('value', '#7fff00');
 editCar.appendChild(inputSubmitEdit);
 inputSubmitEdit.setAttribute('type', 'submit');
 inputSubmitEdit.setAttribute('value', 'Edit the car');
 inputSubmitEdit.innerText = 'Edit the car';

 gameController.appendChild(raceBtn);
 raceBtn.setAttribute('id', 'race');
 raceBtn.classList.add('game-controller-btn');
 raceBtn.innerText = 'Race';
 gameController.appendChild(resetBtn);
 resetBtn.setAttribute('id', 'reset');
 resetBtn.classList.add('game-controller-btn');
 resetBtn.innerText = 'Reset';
 gameController.appendChild(generateCarsBtn);
 generateCarsBtn.setAttribute('id', 'generate-cars');
 generateCarsBtn.classList.add('game-controller-btn');
 generateCarsBtn.innerText = 'Generate cars';

 // RSERT Cars
 export function resetCars(){
   let cars = document.getElementsByClassName('car');
   for (let i = 0; i < cars.length; i++) {
     if (cars[i].getBoundingClientRect().x !== 50) {
       cars[i].style.transform = `translateX(0px)`;
     }
   }
 }

 //CLEAR
export function clearContainer(parent) {
    var child = parent.lastElementChild;
    while (child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
    }
  }

// DELETE Car
export function deleteTheCar(car) {
     console.log('Car is deleted!');
     let id = car.parentNode.parentElement.id;
     car.parentNode.parentElement.remove()

     fetch(`${url}garage/${id}`, {
       method: 'DELETE'
     });
   }

   // SELECT car
  export function carSelection(car) {
     console.log('Car is selected!');
     car.style.background = '#7fff00';
     car.style.color = '#000';

     let id = car.parentNode.parentElement.id;

     inputSubmitEdit.addEventListener('click', function(e) {
       e.preventDefault();
       console.log('The car is edited');
       const selectedCar =   {
         color: this.parentNode.childNodes[1].value
       };

       if (this.parentNode.childNodes[0].value === '') {
         selectedCar.name = car.parentNode.parentNode.childNodes[0].innerText;
       } else {
         selectedCar.name = this.parentNode.childNodes[0].value;
         car.parentNode.parentNode.childNodes[0].innerText = '- - - ' + this.parentNode.childNodes[0].value + ' - - -';
       }

       car.parentNode.parentNode.childNodes[1].childNodes[2].childNodes[4].childNodes[5].style.fill = this.parentNode.childNodes[1].value;


       fetch(`${url}garage/${id}`, {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(selectedCar)
       })
       .then((response) => response.json())
       .then((data) => {
         console.log(data);
         this.parentNode.childNodes[0].value = '';
         car.style.background = 'none';
         car.style.color = '#7fff00';
       });

     });
   }
 // Create Car
 inputSubmitCreate.addEventListener('click', function(e) {
     e.preventDefault();
     console.log('New car is created');

     if (this.parentNode.childNodes[0].value === '') {alert("Enter car's name")}
     else {
       const car =   {
         name: this.parentNode.childNodes[0].value,
         color: this.parentNode.childNodes[1].value
       };

       fetch(`${url}garage`,{
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(car),
       })
       .then((response) => response.json())
       .then((car) => {
         clearContainer(carsContainer);
         getCars(1);
         this.parentNode.childNodes[0].value === '';
       });
     }
   });

winnersPage.onclick = function(){
  garage.style.display = 'none';
  garagePage.classList.toggle('active');
  winnersPage.classList.toggle('active');
  winners.style.display = 'block';
};

garagePage.onclick = function(){
  winners.style.display = 'none';
  garagePage.classList.toggle('active');
  winnersPage.classList.toggle('active');
  garage.style.display = 'block';
};

generateCarsBtn.onclick = function(){generateCars()};


function generateCar() {
  let newCar = {}

  function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
     return newCar.color = color;
  }
  function getRandomCarName() {
    let carNames = [
      'BMW',
      'Mercedes-Benz',
      'Audi',
      'Toyota',
      'Honda',
      'Ford',
      'Chevrolet',
      'Hyundai',
      'Nissan',
      'Subaru',
      'Kia',
      'Mazda',
      'Volkswagen',
      'Volvo'
    ];

    let carModels = [
      'Accord',
      'Camry',
      'Civic',
      'Corolla',
      'Fiesta',
      'Focus',
      'Jetta',
      'Malibu',
      'Altima',
      'Sentra',
      'Sonata',
      'Taurus',
      'Accent',
      'Elantra',
      'Forte',
      'Optima'
    ];

     function random(arr) {
      let randomIndex = Math.floor(Math.random() * arr.length);
      return randomIndex
    }
    return newCar.name = carNames[random(carNames)] + ' ' + carModels[random(carModels)]
  }

  getRandomColor();
  getRandomCarName();
  return newCar

}

function generateCars() {
  let i = 1;
  while ( i <= 100) {
    i++;
    const newCar = generateCar();
    // console.log(newCar);
    fetch(`${url}garage`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCar),
    })
    .then((response) => response.json())
    .then((car) => {

    });

  }
  clearContainer(carsContainer);
  getCars();
}
