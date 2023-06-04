// HW 39. Створюємо сутності
// 1. Створити сутність "Людина".
// Властивості:
//    імʼя;
//    вік.
// Методи:
//    конструктор, який приймає два параметри: імʼя та вік;
//    метод, який виводить у консоль інформацію про людину.

// 2. Створити сутність "Автомобіль".
// Властивості:
//    марка, модель, рік виписку, номерний знак (або на Ваш розсуд);
//    власник.
// Методи:
//    конструктор, який приймає чотитри параметри (тобто, всі окрім власника): марка, модель, рік виписку, номерний знак 
//    присвоїти власника - метод повинен приймати екземпляр класу Людина, та зберігати екземпляр класу Людина у відповідному полі, якщо вік більше 18, інакше виводити у консоль відповідне повідомлення
//    метод, який виводить у консоль інформацію про автомобіль та викликає метод виводу інформації класу Людина для виведення інформації про власника


// В якості демонстраціїї створити:

//    декілька екземплярів класу Людина;
//    декілька екземплярів класу Автомобіль;
//    присвоїти власників автомобілям.

class Human {
  constructor (name, age) {
    this.name = name;
    this.age = age;
  }
  getHumanInfo() {
    console.log('owner: Name: ' + this.name + ', Age: ' + this.age);
  }
}

class Car {
  owner = '';

  constructor (brand, model, year, vin, number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.vin = vin;
    this.number = number;
  }
  
  addOwner(owner) {
    if ( !(owner instanceof Human)) {
      console.log('Its not Human instance');
    } else {
      if (owner.age > 18) {
        this.owner = owner;
      } else {
        console.log('The person\'s age is less than 18, and this person can\'t be the car\'s owner');
      }
    }
  }

  getCarInfo() {
    console.log('---------\nCar info:\n---------');
    for (const [key, value] of Object.entries(this)) {
      if (key !== 'owner') {
        console.log(`${key}: ${value}`);
      }
    }
    if (this.owner !== '') {
      this.owner.getHumanInfo();
    }
  }
}

const hum1 = new Human('Dave', 20);
const hum2 = new Human('Nick', 30);
const hum3 = new Human('Max', 15);
const hum4 = new Human('Julya', 28);

const car1 = new Car('Volvo','XC60', 2019, 'VPX123123', 'CA123X');
car1.addOwner(hum1);
car1.getCarInfo();

const car2 = new Car('BMW','525', 2015, 'MR12321123', 'CR567T');
car2.addOwner(hum2);
car2.getCarInfo();

const car3 = new Car('Kia','Soul', 2017, 'TT122321123', 'VR967T');
car3.addOwner(hum3);
car3.addOwner(hum4);
car3.getCarInfo();