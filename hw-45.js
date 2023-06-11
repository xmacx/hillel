// HW 45. Dom

// Есть 3 input. Выводить в textarea содержимое всех полей ввода через запятую. Использовать setInterval.
// Кожні N-sec перевіряти інпути (input.value) і якщо є зміни, то додавати в textarea

const inputs = [ ...document.getElementsByTagName('input') ];
const textarea = document.querySelector('textarea');

setInterval(() => {
  textarea.value = '';
  
  textarea.value =  inputs.reduce((res, input, index) => {    
    if (input.value !== '') {
      console.log(index, input.value);
      return  res + `Input ${index + 1} = ${input.value}\n`;
    }
    return res;
  }, '');
}, 1000)