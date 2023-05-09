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
