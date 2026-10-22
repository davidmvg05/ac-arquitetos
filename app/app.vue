<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'pt-PT'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#ffffff' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/images/brand/logo-ac.png' }
  ]
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
