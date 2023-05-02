// fetch data from server
const fetchAllProducts = async () => {
  return (await fetch("https://dummyjson.com/products")).json();
};

const productImage = product => `
<div class="image-wrapper">
  <img src="${ product.thumbnail }" alt="${ product.title }" class="image" />
</div>`;

const productTitle = product => `
<div class="title">
  <h4>${ product.title }</h4>
</div>`;

const productPrice = product => {
  const price = product.price;
  let discount,
      salePrice;
  if (product.discountPercentage !== '' && product.discountPercentage !== 0) {
    discount = product.discountPercentage;
    salePrice = (price - price / 100 * discount).toFixed(2);
  }
  
  return `<div class="price">${price} ${discount !== 0 ? ", price with discount " + salePrice : ''}</div>`;
}

const productDescription = product => `<div class="description">${product.description}</div>`;

const productActions = () => `
<div class="actions">
  <button id="cart" class="button green-solid cart">Add to Cart</button>
  <button class="button more">More Details</button>
</div>`;

const productItem = (product) => {
  console.log(product);
  return `
  <section class="product-item">
    ${productImage(product)}
    <div class="content-wrapper">        
      ${productTitle(product)}
      ${productPrice(product)}
      ${productDescription(product)}
      ${productActions()}                  
    </div>
  </section>`;
}

async function getAllProducts() {
  const response = await fetchAllProducts();
  const prouducts = response.products;

  const productsTamplate = `
   <article class="products">
        ${prouducts.map((product) => productItem(product)).join("")}
   </article>
  `;

  document.getElementById("app").innerHTML = productsTamplate;
}

getAllProducts();
