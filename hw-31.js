// fetch data from server
const fetchAllProducts = async () => {
  return (await fetch("https://dummyjson.com/products")).json();
};

const productImage = function() { 
  return `
  <div class="image-wrapper">
    <img src="${ this.thumbnail }" alt="${ this.title }" class="image" />
  </div>`;
}

const productTitle = function() { 
  return `
  <div class="title">
    <h4>${ this.title }</h4>
  </div>`;
}

const productPrice = function() {
  const price = this.price;
  let discount,
      salePrice;
  if (this.discountPercentage !== '' && this.discountPercentage !== 0) {
    discount = this.discountPercentage;
    salePrice = (price - price / 100 * discount).toFixed(2);
  }
  
  return `<div class="price">${price}, ${discount !== 0 ? "price with discount " + salePrice : ''}</div>`;
}

const productDescription = function() {
  return `<div class="description">${this.description}</div>`;
} 

const productActions = function() {
  return `
  <div class="actions">
    <button id="cart" class="button green-solid cart">Add to Cart</button>
    <button class="button more">More Details</button>
  </div>`;
}

const productItem = function() {
  return `
  <section class="product-item">
    ${productImage.call(this)}
    <div class="content-wrapper">        
      ${productTitle.call(this)}
      ${productPrice.call(this)}
      ${productDescription.call(this)}
      ${productActions.call(this)}                  
    </div>
  </section>`;
}

async function getAllProducts() {
  const response = await fetchAllProducts();
  const prouducts = response.products;

  const productsTamplate = `
   <article class="products">
        ${prouducts.map((product) => productItem.call(product)).join("")}
   </article>
  `;

  document.getElementById("app").innerHTML = productsTamplate;
}

getAllProducts();
