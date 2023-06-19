// HW 49. Практикуємось з делегуванням події
// Зверстати таблицю 5х5 з будь-яким текстовим вмістом заздалегідь заповненим. +

// При кліку на будь-яку ячейку таблиці з'являється всередині ячейки багаторядкове текстове поле(textarea) з текстом який був у ячейці (на яку натиснули) і дві кнопки під нею save, cancel
// save - зберегти в поточну клікнуту ячйку введені "змінені данні", cancel - залишить все без змін як було раніше.

// P.S. обов'язково використати делегування події.

window.onload = function () {
  
  function tableEditor(selector) {    
    const table = document.querySelector(selector);
        
    const buttons = {
      'save' : {
        name: 'Save', 
        action: function(target) {
          const td = target.closest('td');
          const textarea = target.closest('.td-edit').querySelector('textarea').value;
          
          setCellText(td, textarea);
          td.classList.remove('td-edit');
        }
      },
      'cancel': {
        name: 'Cancel', 
        action: function(target) {
          const td = target.closest('td');
          
          setCellText(td, td.dataset.backup);
          td.classList.remove('td-edit');
        }
      },
    }

    function addButton(type) {
      const { name } = buttons[type];      
      const button = document.createElement('button');
      button.type = 'button';
      button.innerText = name;      
      button.dataset.action = type;

      return button;
    }

    function setCellClear(td) {
      td.innerText = '';
    }

    function setCellText(td, text) {
      td.innerText = text;
    }

    function backupCellText(td, text) {
      td.dataset.backup = td.innerText;
    }

    function addTextarea(td) {          
      const textarea = document.createElement('textarea');
      textarea.rows = 3;
      textarea.value = td.innerText;
      
      return textarea;
    }
    
    function addEditTools(td) {
      const editTool = document.createElement('div');
      const btnWrap = document.createElement('div');
            
      editTool.classList.add('td-edit');
      editTool.append( addTextarea(td) );
      
      btnWrap.classList.add('td-edit-btns');
      btnWrap.append( addButton('save') );
      btnWrap.append( addButton('cancel') );
      
      editTool.append(btnWrap);
      
      backupCellText(td);    
      setCellClear(td);
      
      td.classList.toggle('cell-edit');
      
      return editTool;
    }

    function onClickHandler(event) {
      const { target } = event;
      
      if (target.nodeName === "TD") {
        target.append( addEditTools(target) );        
      } 

      if (target.nodeName === "BUTTON") {
        const { action } = event.target.dataset;

        if (action && typeof buttons[action].action === "function") {
          buttons[action].action(target);        
        }
      }
    }  

    table.addEventListener("click", onClickHandler);
  }
  
  tableEditor('.table');
  
};