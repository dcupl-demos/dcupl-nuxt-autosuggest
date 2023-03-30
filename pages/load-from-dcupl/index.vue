<template>
  <main>
    <div class="flex-1 px-2 flex justify-center">
      <div class="max-w-lg w-full">
        <label for="search" class="sr-only">Search</label>
        <div class="relative">
          <input
            v-model="searchTerm"
            id="search"
            class="block w-full bg-white py-2 pl-10 pr-3 border border-black rounded-md leading-5 text-gray-900 placeholder-gray-500"
            placeholder="Search styles ..."
            aria-label="Search styles"
            type="search"
            name="search"
          />
          <ul class="border border-gray-200 rounded-md text-gray-500">  
            <li class="border-b border-gray-200 font-bold text-xs p-2">
              Showing {{ filteredList().length }} of
              {{ nrOfProducts }} results
            </li>
            <li class="item suggestion p-1 text-sm" v-for="suggestion in filteredList()"
            :key="suggestion" @click="selectSuggestion(suggestion.value)">{{ suggestion.value }}</li>
          </ul>
          <div class="item error" v-if="searchTerm && !filteredList().length">
            <p>No results found!</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto my-12 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      productDisplayName
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      gender
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      season
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      year
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      usage
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      masterCategory
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      subCategory
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      articleType
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      baseColour
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      image
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="product in applySearch()" :key="product.styleID">
                    <td class="px-6 py-4">
                      <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                      >
                        {{ product.productDisplayName }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ product.gender }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ product.season }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ product.year }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">
                        {{ product.usage }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ product.masterCategory }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ product.subCategory }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ product.articleType }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ product.baseColour }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        <img :src="product.imageURL" :alt="product.productDisplayName" width="50" height="50"/>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { Dcupl } from "@dcupl/core";
import { DcuplAppLoader } from "@dcupl/loader";
import { ref } from "vue";

let searchTerm = ref("");
//let selectedSuggestion = ref("");
let productItems = ref("");

// await loader.config.fetch() will get the data from our CDN - demo project "Fashion Products" (free to join)
const dcupl = new Dcupl({
  config: {
    projectId: "amNlybMblzqF2qcixBVT",
    apiKey: "0857c213-e2dc-49f3-95af-d6001a6327d4",
  },
});
const loader = new DcuplAppLoader();
dcupl.loaders.add(loader);
await loader.config.fetch();

await loader.process({
  applicationKey: "default",
});

dcupl.on((msg) => console.log(msg));

await dcupl.init();

//
// const dcupl = new Dcupl({
//     // config: {
//     // projectId: 'xxx',
//     // apiKey: 'yyy'
//     // },
// });
// const loader = new DcuplAppLoader();
// dcupl.loaders.add(loader);
//
// // use this config in order to load the data of your local dcupl project
// await loader.config.fetch({
//    baseUrl: "http://localhost:8083",
//    loaderFileName: "dcupl.lc.json",
// });
//
// // process the files (applies variables and downloads the files from localhost)
// await loader.process({
//     applicationKey: 'default',
//   });
//
//   dcupl.on((msg) => console.log(msg));
//
// // init dcupl - models and data will be combined
// await dcupl.init();
//

//query Men's products
//const query = dcupl.query.generate("Style", {
//  attribute: "gender",
//  operator: "eq",
//  value: "Men", // change me
//});
//const productList = await dcupl.lists.create({ modelKey: "Style", query: query });
const productList = await dcupl.lists.create({ modelKey: "Style"});
const nrOfProducts = productList.catalog.fn.metadata().initialSize;


productItems = productList.catalog.query.execute();
console.log("Initial productItems:", productItems);

//get suggestions
function filteredList() {
  const suggestions = productList.catalog.fn.suggest({
    attribute: "productDisplayName",
    value: `/${searchTerm.value}/`,
    max: 10,
    transform: ["lowercase", "removeWhitespace"],
  });
  console.log(searchTerm.value);
  console.log("Suggestions: ", suggestions);
  return suggestions;
}

//set suggestion (to search input)
const selectSuggestion = (suggestion) => {
  //selectedSuggestion.value = suggestion;
  searchTerm.value = suggestion;
}

//apply search
function applySearch() {
  const query = dcupl.query.generate("Style", {
    attribute: "productDisplayName",
    operator: "find",
    value: `/${searchTerm.value}/`,
    options: {
      transform: ["lowercase", "removeWhitespace"]
    },
  });
  query.count = 100;
  productItems = dcupl.query.execute(query);
  console.log("Products applySearch: ", productItems);
  return productItems;
}

</script>
