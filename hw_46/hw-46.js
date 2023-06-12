// HW 46. Калькулятор

// Реалізувати калькулятор, у якому є слайдер (`input type=”range”`) та поле введення (`input type=”number”`).

// Змінюючи стан range змінюється стан поля введення `number`. І навпаки.

// Реалізувати блок-діаграму (https://prnt.sc/mxG6oHraHYHv), який у пікселях відображатиме значення range.Наприклад - range вибрали число 83, висота блоку зеленого кольору буде 83 пікселі.

// Червоний блок – кількість комісії. Комісія обчислюється за такою формулою:

// (range < 20) -> 2%
// (20 - 50) -> 4%
// (50 - 75) -> 6%
// (75 - 100) -> 8%

// Наприклад, значення вибору 100, комісія буде 8%. Результатова сума: 108. Висота червоного блоку - 8px
function onLoadHandler() {
  const rangeInput = document.querySelector(".calc-range__input");
  const rangeNum = document.querySelector(".calc-range__num");
  const diagramRange = document.querySelector(".calc-diag__range");
  const diagramComm = document.querySelector(".calc-diag__comm");
  const calcRes = document.querySelector(".calc__res span");  

  const onChangeRange = function() {
    const value = parseInt(this.value);
    
    updateInput(value);    
    updateDiagram(value, getCommision(value));
  }
    
  const onChangeInput = function() {  
    const value = parseInt(this.value);
    const validatedValue = validateInput(value);
    
    updateInput(validatedValue)
    updateRange(validatedValue);
    updateDiagram(validatedValue, getCommision(validatedValue));
  }
  
  const updateInput = function(value) {  
    rangeNum.value = value; 
  
  }
  const updateRange = function(value) {
    rangeInput.value = value;
  }

  const validateInput = value => {
    if (value > 100) {
      value = 100;
    } else if (value < 0) {
      value = Math.abs(value);
    }
    return value;
  };

  const getCommision = value => {   
    switch (true) {
      case value == 0:
        return 0;
      case value > 0 && value < 20:
        return 2;
      case value >= 20 && value < 50:
        return 4;
      case value >= 50 && value < 75:
        return 6;
      case value >= 75 && value <= 100:
        return 8;
      default:
        return 0;
    }
  }

  const updateDiagram = function(value, commision) {
    diagramRange.style.height = value + 'px';
    
    diagramComm.style.bottom = value + 'px';
    diagramComm.style.height = commision + 'px';
    
    calcRes.innerHTML = value + commision;
  }
  
  rangeInput.addEventListener("change", onChangeRange);  
  rangeNum.addEventListener("input", onChangeInput);
}

window.onload = onLoadHandler;