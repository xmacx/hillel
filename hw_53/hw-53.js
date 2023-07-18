// HW 53. Практика з використання Promise
// Використовуючи ланцюжок Promise згідно з таблицею (див вкладення).
// Організувати виведення в консоль такий порядок цифр "0 1 3 6 8", "0 2 3 6 7".
// Де 0 - це значення, яке виводиться в сallback - ф-ії яка передається в Promise.
// res | rej
//   0 | 0
//   1 | 2
//   3 | 4
//   5 | 6
//   7 | 8

const promise1 = new Promise(function(res, rej) {
  console.log(0);
  res();
});

promise1.then(
  () => {  
    console.log('1');
  },
  () => {
    console.log('2');
  }
).then(
  () => {
    console.log('3');
    return Promise.reject();
  },
  () => {
    console.log('4');
  }
).then(
  () => {
    console.log('5');    
  },
  () => {
    console.log('6');
    return Promise.reject();
  }
).then(
  () => {
    console.log('7');
  },
  () => {
    console.log('8');
  }
)

const promise2 = new Promise(function(res, rej) {
  setTimeout(() => {
    console.log(0);
    rej();
  });
});

promise2.then(
  () => {  
    console.log('1');
  },
  () => {
    console.log('2');
  }
).then(
  () => {
    console.log('3');
    throw new Error('Error');
  },
  () => {
    console.log('4');
  }
).then(
  () => {
    console.log('5');    
  },
  () => {
    console.log('6');    
  }
).then(
  () => {
    console.log('7');
  },
  () => {
    console.log('8');
  }
)