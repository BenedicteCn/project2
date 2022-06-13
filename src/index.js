//https://openfoodfacts.github.io/api-documentation/

import fetch from "node-fetch";

//const fetch = require("node-fetch");

const apiUrl = "https://world.openfoodfacts.org/api/v2/product/3701215611254";

async function getData() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log(data.product.product_name);
  console.log(data.product.nutriscore_grade);
  console.log(data.product.ecoscore_grade);
  console.log(data.product.selected_images.front.display.fr);
  // console.log(data.product.stores);
  // console.log(data.product.nova_group);
}

getData();
