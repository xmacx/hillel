const filterProducts = (...args) => {
  const [products, params] = args;
  const filterParam = params[params.length - 1];  
  const filterParamKey = Object.keys(filterParam)[0]

  if (Object.values(filterParam)[0]) {
    const filteredProducts = products.filter((product) => {
        return product[filterParamKey] == filterParam[filterParamKey];
    });
    
    return filteredProducts;
  } else {
    return products;
  }

}

async function getAllProducts(...params) {
  const response = await fetchAllProducts();
  const prouducts = !params.length ? response.products : filterProducts(response.products, params);

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

const getSearchParam = (param) => {
  const value = prompt(`Enter the valuer of "${param}" searching parameter`);
  return {[param]: value};
}

// getAllProducts();
getAllProducts(getSearchParam('price'), getSearchParam('brand'));
