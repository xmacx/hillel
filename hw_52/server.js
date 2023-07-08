// HW 52. Практика з Express + Postman
// есть на складе\нету\все (query)
// підходить ціновому діапазону від - до (query)
// має бути можливість комбінувати пункт 1 - 2
// отримати всі товари в назвах яких присуджує параметр productName(query) (окремий запит)
// отримати товар за конкретним id - отримаємо лише 1 товар (окремий запит) (params)

const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;
const dataJson = "./model/data.json";

app.use((req, res, next) => {
  next();
});


const filters = {
  productName: (keyValue, item) => keyValue !== undefined && item.productName.toString().includes(keyValue),
  stock: (keyValue, item) => keyValue !== undefined && item.productStock.toString() === keyValue,
  minPrice: (keyValue, item) => keyValue !== undefined && parseInt(item.productPrice) >= parseInt(keyValue),
  maxPrice: (keyValue, item) => keyValue !== undefined && parseInt(item.productPrice) <= parseInt(keyValue),
};

const readFileCb = (url, cb) => {
  fs.readFile(url, "utf-8", (error, data) => {
    const payload = JSON.parse(data);

    cb(payload);
  });
};

const matchesFilter = ( {key, keyValue, item} ) => {
  const filter = filters[key];
  
  if (typeof filter !== "function") {
    console.warn(`Filter for ${key} is not defined`);
    return true;
  }

  return filter(keyValue, item);
}

const getFilteredProducts = (data, query) => {
  const queryKeys = Object.keys(query);
  
  return data.filter(item =>
    queryKeys.every((key) =>  
      matchesFilter({
        key,
        keyValue : query[key], 
        item 
      })
    )
  );
}

app.get("/products", (req, res) => {
  const query = req.query;
  const { stock = null, minPrice = null, maxPrice = null } = query;

  fs.readFile(dataJson, "utf-8", (error, data) => {
    let products = null;
  
    if(!Object.keys(query).length) {
      products = JSON.parse(data);
    } else {
      products = getFilteredProducts(JSON.parse(data), query);
    }

    if (!Object.keys(products).length) {
      return res.status(500).json( {message : 'Products by searched parameters not found'} );
    }
    
    res.status(200).json(products);
  });  
});

const findProductById = (id, products) => products.find((product) => product.productId == id);

app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  
  if (!productId) {
    return res.status(500).json({ message: 'Ther\'s product id' } );
  }

  readFileCb(dataJson, (products) => {
    const product = findProductById(productId, products);

    if (!product) {
      return res.status(500).json({ message: `Product by #${productId} product ID hasn't been found` });
    }

    res.status(200).json(product);
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});