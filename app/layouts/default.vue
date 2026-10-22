<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-paper text-ink flex flex-col selection:bg-brick selection:text-paper font-sans w-full max-w-full overflow-x-clip">
    <AppHeader />
    <main class="flex-1 w-full max-w-full overflow-x-clip">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
