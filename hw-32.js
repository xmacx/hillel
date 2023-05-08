const filterProducts = (...params) => {
  const [products, filter] = params;
  let filterParamLastKey;
  for (key in filter) {
    filterParamLastKey = key;
  }
  if (filter[filterParamLastKey]) {
    const filteredProducts = products.filter((product) => {      
      return product[filterParamLastKey] == filter[filterParamLastKey];
    });

    return filteredProducts;
  } else {
    return products;
  }
}

async function getAllProducts(filter) {
  const response = await fetchAllProducts();
  const prouducts = !filter ? response.products : filterProducts(response.products, filter);
  
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

const getSearchParam = (...params) => {
  const searchParams = {};
  params.forEach(param => {
    searchParams[param] = prompt(`Enter the valuer of "${param}" searching parameter`);
  });
  return searchParams;
}

// getAllProducts();
getAllProducts(getSearchParam('price', 'brand'));
