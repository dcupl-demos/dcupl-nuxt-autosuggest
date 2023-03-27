<template>
    <main id="errorPage" class="absolute h-full w-full min-h-full bg-blue-500">
      <div class="max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-48">
          <h1 class="bg-teal-500 text-blue-500 px-4 py-2 text-2xl" v-if="error.statusCode === '404'">{{ error.statusCode }}_PAGE_NOT_FOUND</h1>
          <h1 v-else>{{ error.statusCode }}_AN_ERROR_OCCURRED</h1>
  
          <h2 class="mt-10 mb-10 text-6xl font-semibold text-white sm:text-6xl">Uh oh! Blue Screen?<br />... no, but this page is totally decoupled.</h2>
        
          <p class="mt-2 text-lg text-white">We are not sure how you got here, but the page you are looking for might have been removed or temporarily unavailable.</p>
          <div class="mt-6">
              <a href="/" class="inline-flex items-center px-8 py-2 border-2 text-lg font-normal rounded-full text-white  bg-blue-500 border-white hover:bg-blue-900 hover:border-blue-900 transition-colors duration-300"> Go back to home </a>
          </div>
      </div>
    </main>
  </template>
  
  <script setup>
  const props = defineProps({
    error: Object
  })
  
  const handleError = () => clearError({ redirect: '/' })
  </script>