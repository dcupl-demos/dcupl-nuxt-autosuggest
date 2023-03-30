<template>
  <main class="flex-1 px-2 flex justify-center">
  <div class="max-w-xl w-full">
      <Combobox as="div" v-model="selectedProduct">
        <ComboboxLabel class="block text-sm font-medium leading-6 text-gray-900">Select product ...</ComboboxLabel>
        <div class="relative mt-2">
          <ComboboxInput class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6" @change="searchTerm = $event.target.value" :display-value="(product) => product?.productDisplayName" />
          <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </ComboboxButton>
    
          <ComboboxOptions v-if="filteredProducts.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ComboboxOption v-for="product in filteredProducts" :key="product.styleID" :value="product" as="template" v-slot="{ active, selected }">
              <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-blue-600 text-white' : 'text-gray-900']">
                <span :class="['block truncate', selected && 'font-semibold']">
                  {{ product.productDisplayName }}
                </span>
    
                <span v-if="selected" :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600']">
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </div>
      </Combobox>
  
      <div class="mt-64">
          <h1>Suggestions</h1>
          <div class="my-4 font-bold">
            <p>Selected product: {{ selectedProduct.productDisplayName }}</p>
          </div>
          <ul v-if="filteredProducts.length > 0">
              <li><span class="font-bold text-sm"> {{ filteredProducts.length }} of {{ productList.catalog.fn.metadata().initialSize }} products </span></li>
              <li v-for="product in filteredProducts" :key="product.styleID">
              {{ product.productDisplayName }}
              </li>
          </ul>
      </div>
  </div>
  </main>
</template>
    
<script setup>
  import { Dcupl } from "@dcupl/core";
  import { DcuplAppLoader } from "@dcupl/loader";
  import { computed, ref } from 'vue';
  import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
  import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxLabel,
    ComboboxOption,
    ComboboxOptions,
  } from '@headlessui/vue';

  const searchTerm = ref('');
  const selectedProduct = ref('');

  
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
  
  const productList = await dcupl.lists.create({ modelKey: "Style"});
  const products = productList.catalog.query.execute();

  //filter products and get suggestions
  const filteredProducts = computed(() =>
    //searchTerm.value === ''
    //? products
    //: suggestions(searchTerm)
    suggestions(searchTerm)
  );

  //apply search to generate suggestions
  function suggestions(searchTerm) {
    const query = dcupl.query.generate("Style", {
      attribute: "productDisplayName",
      operator: "find",
      value: `/${searchTerm.value}/`,
      options: {
        transform: ["lowercase", "removeWhitespace"]
      },
    });
    query.count = 50;
    const suggestionList = dcupl.query.execute(query);
    //console.log("searchTerm value", searchTerm.value);
    //console.log("suggestionList: ", suggestionList);
    return suggestionList;
}
  
</script>