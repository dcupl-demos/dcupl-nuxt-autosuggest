<template>
  <div>
    <input type="text" />
    <ul>
      <li v-for="suggestion in suggestions">
        {{ suggestion.value }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import { Dcupl } from "@dcupl/core";
import { products } from "~~/products";


  const dcupl = new Dcupl();
  dcupl.models.add({
    key: "product",
    properties: [
      {
        key: "name",
        type: "string",
      },
      {
        key: "price",
        type: "int",
      },
      {
        key: "group",
        type: "string",
      },
      {
        key: "inStock",
        type: "boolean",
      },
    ],
  });
  dcupl.data.set(products, { model: "product" });
  await dcupl.init();

  // query instock products
  //   const query = dcupl.query.generate("product", {
  //     attribute: "inStock",
  //     operator: "eq",
  //     value: true, // change me
  //   });
  //   const items = dcupl.query.execute(query);
  //   console.log('Items', items);

  // create suggestions
  const productList = await dcupl.lists.create({ modelKey: "product" });
  //apply query
  productList.catalog.query.apply({
    attribute: "inStock",
    operator: "eq",
    value: true, // change me
  });
  
  //get suggestions
  const suggestions = await productList.catalog.fn.suggest({
    attribute: "name",
    searchTerm: "/Backpack/",
    //transform: ["lowercase", "removeWhitespace"],
  });
  console.log('Suggestions for "Backpack"', suggestions);
  
</script>
