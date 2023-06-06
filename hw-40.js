  // HW 40. Гамбургери

// Мережа фастфудів пропонує кілька видів гамбургерів:
// маленький (50 тугриків, 20 калорій);
// великий (100 тугриків, 40 калорій).

// Гамбургер може бути з одним із декількох видів начинок:
// сиром (+ 10 тугриків, + 20 калорій);
// салатом (+ 20 тугриків, + 5 калорій);
// картоплею (+ 15 тугриків, + 10 калорій).

// Можна додати добавки:
// посипати приправою (+15 тугриків, 0 калорій) - полити майонезом (+ 20 тугриків, +5 калорій).

// Напишіть програму, яка розраховує вартість та калорійність гамбургера. Використовуйте ООП підхід.
// (підказка: потрібен клас Гамбургер, константи, методи для вибору опцій та розрахунку потрібних величин)

// Приклад роботи коду:
// маленький гамбургер з начинкою з сиру
// var hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// добавка з майонезу
// hamburger.addTopping(Hamburger.TOPPING_MAYO);
// запитаємо скільки там калорій
// console.log(“Calories: “ + hamburger.calculate ());
// скільки коштує
// console.log("Price: “ + hamburger.calculatePrice());
// я тут передумав і вирішив додати ще приправу
// hamburger.addTopping(Hamburger .TOPPING_SAUCE);
// А скільки тепер коштує?
// console.log("Price with sauce: “ + hamburger.calculatePrice());

class Hamburger {
  static SIZE_SMALL = {price: 50, calories: 20};
  static SIZE_LARGE = {price: 100, calories: 40};
  
  static STUFFING_CHEESE = {price: 10, calories: 20};
  static STUFFING_SALAD =  {price: 20, calories: 5};
  static STUFFING_POTATO = {price: 15, calories: 10}; 
  
  static TOPPING_SEASONING = {price: 15, calories: 0};
  static TOPPING_MAYO = {price: 20, calories: 5};
  static TOPPING_SAUCE = {price: 10, calories: 5};
  
  size = null;
  stuffing = null;
  topping = [];

  #price = 0;
  #calories = 0;

  constructor (size, stuffing, topping) {
    this.size = size;
    if (stuffing) {
      this.stuffing = stuffing;
    }
    if (topping) {
      this.topping.push(topping);
    }
  }

  addTopping(topping) {
    this.topping.push(topping);
  }

  getToppingAttr(attr) {
    let toppingAttr = 0;
    if (this.topping.length > 0) {
      toppingAttr = this.topping.reduce((acc, item) => {
        return acc + item[attr];
      }, 0)      
    }
    console.log();
    return toppingAttr;
  }

  getStuffingAttr(attr) {
    return this.stuffing !== null ? this.stuffing[attr] : 0;
  }

  calculate() {
    this.#calories = this.size.calories + this.getStuffingAttr('calories') + this.getToppingAttr('calories');
    return this.#calories;
  }

  calculatePrice() {
    this.#price = this.size.price + this.getStuffingAttr('price') + this.getToppingAttr('price');
    return this.#price;
  }
}

const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);

hamburger.addTopping(Hamburger.TOPPING_MAYO);
console.log("Calories: " + hamburger.calculate ());
console.log("Price: " + hamburger.calculatePrice());

hamburger.addTopping(Hamburger.TOPPING_SAUCE);
console.log("Price with sauce: " + hamburger.calculatePrice());