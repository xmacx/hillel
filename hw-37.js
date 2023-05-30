/*
HW 37. SuperMath

Створити ф-ю конструктор SuperMath.

Додати до екземпляра метод - check(obj) та input, параметр obj якого має властивості X, Y, znak. Метод повинен підтвердити у користувача, чи хоче він зробити дію znak c Х і У. Якщо хоче, зробити математичну дію znak (яка описана в прототипі), інакше - запитати введення нових даних через метод-екземпляра input() який поверне новий obj .
Приклад об'єкта: `obj = {X:12, Y:3, znak: “/”}`, можливі варіанти znak => `+ - / * %`.

При введенні znak потрібно перевірити коректність введення на можливі математичні дії.

p = new SuperMath();
p.check(obj); // --> no p.input() -> 3 prompt -> рахує
*/
function SuperMath() {
  this.check = function({x, y, znak}) {
    this.x = x;
    this.y = y;
    this.znak = znak;
    let confirmOperation = confirm(`Ви хочете порахувати ${this.x} та ${this.y} використовуючи операцію "${this.znak}" ?`);
    if (!confirmOperation) {
      this.input();
    } else {    
      this.calculate();      
    }
  };

  this.input = function() {
    const newObj = {
      x: +prompt('Введіть нове значення x:'),
      y: +prompt('Введіть нове значення y:'),
      znak:  prompt('Введіть операцію (+ - / * %):') 
    }
    this.check(newObj);
  };
}
SuperMath.prototype.calculate = function() {
  let result;
  switch (this.znak) {
    case '+':
      result = this.x + this.y;
      break;
    case '-':
      result = this.x - this.y;
      break;
    case '/':
      result = this.x / this.y;
      break;
    case '*':
      result = this.x * this.y;
      break;
    case '%':
      result = this.x % this.y;
      break;
    default:
      alert('Невірний знак операції, використовуйте тільки (+ - / * %)');
      return;
  }
  alert(`Результат: ${result}`);
}

const obj = { x: 12, y: 3, znak: '/' };
const p = new SuperMath();
p.check(obj);