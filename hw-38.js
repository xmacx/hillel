// HW 38. Багатоквартирний будинок

class Human {
  name = 'Unkown';

  constructor (name, gender) {
    this.name = name;
    this.gender = gender;
  }
}

class Appartment {
  residents = [];

  addResident(human) {
    this.residents.push(human);      
  }
}

class Building {
  appartments = [];
  
  constructor (appartmentMaxCount) {
    this.appartmentMaxCount = appartmentMaxCount;    
  }

  addAppartment (appartment) {    
    if (this.appartments.length >= this.appartmentMaxCount) {
      console.log('There\s no more place in this building');
    } else {
      this.appartments.push(appartment);
    }
  }
}

const hum1 = new Human("Anton", "man");
const hum2 = new Human("Tetyana", "woman");
const hum3 = new Human("Max", "man");
const hum4 = new Human("Igor", "man");
const hum5 = new Human("Olena", "woman");

const app1 = new Appartment();
const app2 = new Appartment();
const app3 = new Appartment();

app1.addResident(hum1);
app1.addResident(hum2);
app2.addResident(hum3);
app3.addResident(hum4);
app3.addResident(hum5);

const build1 = new Building(2);
build1.addAppartment(app1);
build1.addAppartment(app2);
build1.addAppartment(app3);