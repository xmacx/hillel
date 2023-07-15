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

const promise1 = new Promise(function(resolve, reject) {
  resolve('0');
}).then(
  (v) => {
    console.log(v);
    return '1';
  }
).then(
  (v) => {
    console.log(v);
    return Promise.resolve('3');
  }
).then(
  (v) => {
    console.log(v);
    return Promise.reject('6');
  }
).then(
  (v) => {
    console.log(v);
  },
  (err) => {
    console.log(err);
    return new Promise(function(res, rej) {
      rej('8');
    });
  }
).then(null, (err) => {
    console.log(err);
    return new Promise(function(resolve, reject) {
      reject('0');
    });
  }
).then(
  (v) => {
    console.log(v);
    return '1';
  },
  (err) => {
    console.log('\n');
    console.log(err);
    return '2';
  },
).then(
  (v) => {
    console.log(v);
    return '3';
  }
).then(
  (v) => {
    console.log(v);
    throw new Error("6")
    // return Promise.reject('6');
  }
).then(
  null,
  (err) => {
    console.log(err);
    return new Promise(function(res, rej) {
      res('7');
    });
  }
).then((v) => {
    console.log(v);
});