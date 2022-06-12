//https://openfoodfacts.github.io/api-documentation/

import fetch from "node-fetch";

const apiUrl = "https://world.openfoodfacts.org/api/2";

function getData() {
  return fetch(apiUrl).then((response) => response.json());
}

console.log(getData());
