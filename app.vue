<script setup>
const route = useRoute();

let pageTitle = "";

if (route.name === "index") {
  pageTitle = "dcupl-nuxt-autosuggest";
} else {
  pageTitle = `dcupl-nuxt-autosuggest - ${route.name.replace('-',' ')}`;
}

useHead({
  title: pageTitle,
  titleTemplate: (title) => `${title}`,
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "utf-8",
  script: [
  ],
  meta: [
  ],
  htmlAttr: {
    class: "h-full"
  },
  bodyAttr: {
    class: "h-full"
  },
  link: [
  ],
});
</script>
<template>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

</template>
