// HW 47. Таблиця
// Вивести таблицю 10 × 10, заповнену числами від 1 до 100 (таблиця створюється динамічно)

// HW 47. Таблиця
// Вивести таблицю 10 × 10, заповнену числами від 1 до 100 (таблиця створюється динамічно)

function newNumTable( rows, cols ) {  
  const createCell = createCellFunc();  

  function createCellFunc() {
    let number = 1;
    return function() {
      const cell = document.createElement('td');
      cell.innerText = number++;
      return cell;
    }
  }
  
  function createRow(cols) {
    const row = document.createElement('tr');  
    for (let i = 0; i < cols; i++) {
      row.append(createCell());
    }    
    return row;
  }

  function createTable(rows) {
    const table = document.createElement('table');    
    for (let i = 0; i < rows; i++) {
      table.append(createRow(cols));
    }
    return table;
  }
  
  return createTable(rows);
}

document.body.append(newNumTable(10, 10));