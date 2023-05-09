/*
HW 32. Пошукові крітерії
Задача - 1

До нашого шаблону потрібно додати пошукові критерії.
1) Створити ф-ю яка буде повертати об`єкт з параметрами отриманими від користувача(prompt()) (обов`язково використання ES6 там де це можливо, в противному разі буде понижено бал).
2) Ці критерії передати як параметри до getAllProducts(*). Останній (*) за наявності відфільтрує лист продуктів.

Фільтрація продуктів повинна бути універсальною. Розширюючи критерії (параметри пошуку) із пункту 1, то операція фільтрації не повинна бути змінена.

Задача - 2
В продовження Задачі - 1. Реалізувати:
1) Використовуючи параметр rating - конкретного продукту потрібно відсортувати фільтровані або не фільтровані дані так щоб товари з найвищим рейтингом були зверху, меншим знизу.
(sort , а також у вільний час ознайомтесь)
*/

const fetchAllProducts = async () => {
  return (await fetch("https://dummyjson.com/products")).json();
};

const getPictures = (thumbnail) => {
  thumbnail = thumbnail
    ? thumbnail
    : "https://40.media.tumblr.com/2a46a0ec64f5d1c0dcc8814baf9833f4/tumblr_nj930lpXGB1qif4c6o1_1280.jpg";

  return `
        <img
            src="${thumbnail}"
            alt=""
            class="image"
        />
    `;
};

// Hometask --- refactoring  ---- decomposition

const divToHundred = (v) => v / 100;
const toPercent = (v) => divToHundred(v);
const toCoin = (v) => v * 100;
const unWrapFromCoin = (v) => divToHundred(v);

const getProductInfo = ({ title, price, rating, description, discountPercentage }) => {
  const total = unWrapFromCoin(
    toCoin(price) - toCoin(price) * toPercent(discountPercentage)
  );

  return `
        <div class="product-info">
            <div class="title">
                <h4>${title}</h4>
                </div>
            <div class="rating">${rating}</div>
            <div class="price">
                ${price}, 
                price with discount ${total.toFixed(2)}
            </div>
            <div class="description">${description}</div>
        </div>
    `;
};

const getProductItem = (product, classes = []) => {
  return `
        <section class="product-item ${classes.join(" ")}">
            <div class="image-wrapper">
                ${getPictures(product.thumbnail)}
            </div>
            <div class="content-wrapper">
                ${getProductInfo(product)}
                <div class="actions">
                    <button id="cart"class="button green-solid cart">
                        Add to Cart
                    </button>
                    <button class="button more">More Details</button>
                </div>
            </div>
        </section>  
    `;
};

const filterProducts = ({products, filter}) => {  
  return products.filter(product => {
    for (let key in filter) {
      if (product[key] !== filter[key]) {
        return false;
      }
    }
    return true;
  });
}

async function getAllProducts(filter) {
  const response = await fetchAllProducts();
  const products = response.products;
  const prouducts = !Object.keys(filter).length ? products : filterProducts({products, filter});
  

  if (prouducts.length) {
    const productsTamplate = `
       <article class="products">
          ${prouducts
            .sort(function(a, b) {          
              return b.rating - a.rating;
            })
            .map((product) => {
              const { brand, category } = product;
              const classesList = [
                brand.split(" ").join("-").toLowerCase(),
                category.toLowerCase(),
              ];
  
              return getProductItem(product, classesList);
            })            
            .join("")}
       </article>
      `;
  
    document.getElementById("app").innerHTML = productsTamplate;    
  } else {
    document.getElementById("app").innerHTML = 'There are no products by your search request'; 
  }
}

const validateSearchParam = (param, value) => {  
  switch (param) {
    case 'id':
    case 'stock':
    case 'price':
    case 'rating':
    case 'discountPercentage':
        value = parseFloat(value);
        break;
  }
  return value;
}
const getSearchParam = (...params) => {
  const searchParams = {};
  params.forEach(param => {
    searchParams[param] = validateSearchParam(param, prompt(`Enter the value of "${param}" searching parameter`) );
  });
  return searchParams;
}

// getAllProducts();
getAllProducts(getSearchParam('price', 'brand'));
