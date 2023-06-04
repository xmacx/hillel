class HTMLElement {
  foo = 12;
  constructor(tagName, className, id) {
    this.tagName = tagName;
    this.className = className;
    this.id = id;
  }
  rotate() {
    console.log("rotating from HTMLElement", this.tagName);
  }
  render() {
    console.log("rendering from HTMLElement", this.tagName);
  }
}

class HTMLAnchor extends HTMLElement {
  href = "";

  #c3 = 25;

  constructor(href, ...arg) {
    super(...arg); // < --- must have call parent constructor
    this.href = href;
  }

  // ---- computed ---
  get hrefWithoutProtocol() {
    return this.href.slice(9); // https:://
  }

  set hrefWithoutProtocol(v) {
    if (true) {
      this.href = v;
    }
  }

  get c3() {
    return this.#c3;
  }

  set c3(v) {
    if (true) {
      this.#c3 = v;
    }
  }

  redirect() {
    console.log("redirecting...", this.tageName);
  }
  rotate() {
    console.log("Prepareing rotate from HTMLAnchor", this.tagName);
    // super.rotate(); // HTMLElement.prototype.rotate()
  }
}

const a1 = new HTMLAnchor("https://roga", "anchor", "link", "facebook-link");
// console.log(a1);


// 2) Додати до роботи в класі конструктор HTMLElementInput по прикладу HTMLAnchor. Прототипне успадкувати render, rotate. Самостійно вирішити які будуть поля, методи прототипа та екземпляра HTMLElementInput.


class HTMLElementInput extends HTMLElement {
  type = "text";
  placeholder = "Enter your text";
  
  #defaultValue = "";
  
  constructor(type, label, placeholder, ...arg) {
    super(...arg);
    this.type = type;
    this.placeholder = placeholder;
    
    if (type !== "submit") {
      this.label = label;    
    }
    
  }

  get defaultValue() {
    return this.#defaultValue;
  }

  set defaultValue(val) {
    switch (this.type) {
      case "text":
        if (typeof val !== 'string' || val.length > 10) {
          alert('Set default value as a string and less than 10 symbols');
        } else {
          this.#defaultValue = val;
        }
        break;
      case "email":
        if (typeof val !== 'string' || val.indexOf('@') < 0) {
          alert('Set right default email description');
        } else {
          this.#defaultValue = val;
        }
        break;
      case "tel":
        if (typeof val !== 'number' || val.toString().length !== 9) {
          alert('Set right phone example');
        } else {
          this.#defaultValue = val;
        }
        break;
      case "submit":        
        alert('This type doesn\'t have default value');      
        break;
      default: 
        alert('It\'s input\'s tag of unknown type');
        return;
    }  
  }
}


const textInput = new HTMLElementInput("text", "Name", "Enter your name", "input", "input-text", "input-name");
const emailInput = new HTMLElementInput("email", "Email", "Enter your email", "input", "input-email", "input-email");
const telInput = new HTMLElementInput("tel", "Phone", "Enter your phone", "input", "input-phone", "input-phone");
const submitInput = new HTMLElementInput("submit", "Send", "Send", "input", "input-submit", "input-submit");

console.log(textInput);
console.log(telInput);
console.log(emailInput);
console.log(submitInput);