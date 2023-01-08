import './main.sass';
import {canvas} from './app/canvas';
import {inputSubmitCreate} from './app/main'
import {getCars} from './app/get-cars';

getCars();

// Create a Car
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
        getCars();
        this.parentNode.childNodes[0].value === '';
      });
    }
  });
