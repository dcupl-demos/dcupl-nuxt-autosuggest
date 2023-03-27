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
import { DcuplAppLoader } from "@dcupl/loader";

// // await loader.config.fetch() will get the data from our CDN - demo project "Fashion Products" (free to join)
//const dcupl = new Dcupl({ 
//  config: { 
//    projectId: "amNlybMblzqF2qcixBVT",
//    apiKey: "0857c213-e2dc-49f3-95af-d6001a6327d4" 
//  } 
//});
// const loader = new DcuplAppLoader();
// dcupl.loaders.add(loader);

// await loader.config.fetch();
// 
// await loader.process({
//   applicationKey: "default",
// });
// 
// dcupl.on((msg) => console.log(msg));
// 
// await dcupl.init();


const dcupl = new Dcupl({
    // config: {
    // projectId: 'xxx',
    // apiKey: 'yyy'
    // },
});
const loader = new DcuplAppLoader();
dcupl.loaders.add(loader);

// use this config in order to load the data of your local dcupl project
await loader.config.fetch({
   baseUrl: "http://localhost:8083",
   loaderFileName: "dcupl.lc.json",
});

// process the files (applies variables and downloads the files from localhost)
await loader.process({
    applicationKey: 'default',
  });

  dcupl.on((msg) => console.log(msg));

// init dcupl - models and data will be combined
await dcupl.init();





// query instock products
// const query = dcupl.query.generate("product", {
//   attribute: "inStock",
//   operator: "eq",
//   value: true, // change me
// });
// const items = dcupl.query.execute(query);
// console.log("Items", items);




// create suggestions
const productList = await dcupl.lists.create({ modelKey: "Style" });

//get suggestions (default max 20)
const suggestions = await productList.catalog.fn.suggest({
  attribute: "productDisplayName",
  searchTerm: "/Manchester/",
  //searchTerm: `/${value}/`,
  //transform: ["lowercase", "removeWhitespace"],
});
console.log('Suggestions for "Manchester"', suggestions);
</script>
