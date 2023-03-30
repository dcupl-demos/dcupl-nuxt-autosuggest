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
            placeholder="Search products ..."
            aria-label="Search products"
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

    <div class="max-w-7xl mx-auto my-12 pb-12 px-4 sm:px-6 lg:px-8">
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
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Group
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      In stock
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="product in applySearch()" :key="product.key">
                    <td class="px-6 py-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ product.name }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ product.price }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ product.group }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                      >
                        {{ product.inStock }}
                      </span>
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
import { products } from "~~/products";
import { ref, computed } from "vue";

let searchTerm = ref("");
//let selectedSuggestion = ref("");
let productItems = ref("");

const dcupl = new Dcupl();
dcupl.models.set({
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

// create suggestions
const productList = await dcupl.lists.create({ modelKey: "product" });
const nrOfProducts = productList.catalog.fn.metadata().initialSize;
//apply query
//productList.catalog.query.apply({
//  attribute: "inStock",
//  operator: "eq",
//  value: true, // change me
//});
productItems = productList.catalog.query.execute();
console.log("Initial productItems:", productItems);

//get suggestions
function filteredList() {
  const suggestions = productList.catalog.fn.suggest({
    attribute: "name",
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
  const query = dcupl.query.generate("product", {
    attribute: "name",
    operator: "find",
    value: `/${searchTerm.value}/`,
    options: {
      transform: ["lowercase", "removeWhitespace"]
    },
  });
  query.count = 10;
  productItems = dcupl.query.execute(query);
  console.log("Products applySearch: ", productItems);
  return productItems;
}

</script>
