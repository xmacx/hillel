// HW 47. Таблиця
// Вивести таблицю 10 × 10, заповнену числами від 1 до 100 (таблиця створюється динамічно)

const table = document.createElement('table');
let number = 1;

for (let i = 0; i < 10; i++) {
  const column = document.createElement('tr');

  for (let j = 0; j < 10; j++) {
    const cell = document.createElement('td');
    cell.innerText = number;
    column.append(cell);
    number++;
  }
  table.append(column);
}

document.body.append(table);