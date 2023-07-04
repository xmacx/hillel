// HW 50. Практика з використання LocalStorage
// 1. Створюємо 2 блоки, з кнопкою Click та лічильником counter (input[type=number]) д. При натисканні на Click – counter збільшується. При перезавантаженні сторінки counter має зберігатись.
// 2. Створити кнопки ClearCounter - скидає усі показники
// 3. Створити кнопку setCounter(), який запитує id блоку і встановлює значення( тип number ) в counter конкретного блока.

window.onload = function () {
  const boxes = document.querySelectorAll('.counter-box');
  const btnSet = document.querySelector('.btn-set');
  const countersId = [];

  const loopCounters = (boxes) => {
    [...boxes].forEach((box) => {
      const counter = box.querySelector('input');
      const btnAdd = box.querySelector('.btn-add');
      const btnClear = box.querySelector('.btn-clear');

      checkStorageAndAppend(counter);
      addCounterToList(counter);
      addHandlerCounter(counter, btnAdd);
      addHandlerCounterReset(counter, btnClear);
    })
  }

  
  const checkStorageAndAppend = (counter) => {
    const id = counter.getAttribute('id');
    const data = localStorage.getItem(id);
    
    counter.value = data;
  };
  
  const addCounterToList = (counter) => {
    const counterId = counter.getAttribute('id');
    countersId.push(counterId);
  }

  const setCounter = (counter, newValue) => {
    counter.value = newValue;
    
    appendToStorage(counter);
  }

  const appendToStorage = (counter) => {
    const id = counter.getAttribute('id');
    const value = counter.value;
    
    localStorage.setItem(id, value);
  };

  const addHandlerCounter = (counter, button) => {
    button.addEventListener("click", function (event) {      
      let counterValue = counter.value;
      
      if (counterValue === '' || counterValue === '0') {
        setCounter(counter, 0);
      }

      setCounter(counter, ++counterValue);
    });
  }

  const addHandlerCounterReset = (counter, button) => {
    button.addEventListener("click", function (event) {      
      let counterValue = counter.value;
  
      setCounter(counter, 0);      
    });
  }

  const addHandlerSetCounter = (button) => {
    button.addEventListener("click", function (event) {     
      const id = +prompt('Enter box id', 1);
      const num = +prompt('Enter new box number', 1);             

      if ( !checkCounterData(id, num) ) {
        return;
      }

      const counter = document.querySelector('#' + countersId[id-1]);
      setCounter(counter, num);    
    });
  }

  const checkCounterData = (id, num) => {        
    if ( !countersId[id-1] ) {
      alert('Enter correct counter');
      return;
    }

    if ( isNaN(num) || num <= 0) {
      alert('Enter correct Number');
      return;
    }
    
    return true;
  }

  loopCounters(boxes);
  addHandlerSetCounter(btnSet);
}