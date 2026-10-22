<script setup lang="ts">
import HeroBentoGallery from '~/components/HeroBentoGallery.vue'
import ProjectsHorizontalGallery from '~/components/ProjectsHorizontalGallery.vue'
import StudioPhilosophySection from '~/components/StudioPhilosophySection.vue'
import BlogCarouselSection from '~/components/BlogCarouselSection.vue'
import TestimonialsStackedSection from '~/components/TestimonialsStackedSection.vue'

// SEO and Meta Tags per GEMINI.md
useSeoMeta({
  title: 'AC-Arquitetos | Atelier de Arquitetura e Interiores em Lisboa',
  description: 'Referência em arquitetura residencial e reabilitação em Portugal. Concebemos espaços únicos pautados pelo rigor, solidez, luz natural e materialidade.',
  ogTitle: 'AC-Arquitetos | Atelier de Arquitetura e Interiores',
  ogDescription: 'Transformamos ideias em espaços habitacionais e comerciais únicos, aliando estética, rigor construtivo e funcionalidade.',
  ogImage: '/images/projects/casa-azeitao.jpg',
  ogImageAlt: 'AC-Arquitetos projeto de arquitetura residencial',
  ogType: 'website',
  ogLocale: 'pt_PT',
  twitterCard: 'summary_large_image',
  twitterTitle: 'AC-Arquitetos | Arquitetura e Interiores',
  twitterDescription: 'Atelier de arquitetura em Lisboa. Rigor, solidez, luz e materialidade.',
  twitterImage: '/images/projects/casa-azeitao.jpg'
})

// Priority hint preload for LCP hero image per GEMINI.md
useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: '/images/projects/casa-azeitao.jpg',
      // @ts-expect-error fetchpriority attribute
      fetchpriority: 'high'
    }
  ]
})
</script>

<template>
  <div>
    <!-- 1. Scrubbed Bento Gallery Intro (Menu appears upon completion) -->
    <HeroBentoGallery />

    <!-- 2. Horizontal Scrolling Project Presentation Gallery -->
    <ProjectsHorizontalGallery />

    <!-- 3. Studio Philosophy & Specialized Architectural Services -->
    <StudioPhilosophySection />

    <!-- 4. Blog & Industry Perspectives (Nuxt UI Carousel) -->
    <BlogCarouselSection />

    <!-- 5. Testimonials Section (Vertical Scroll Overlapping Stack) -->
    <TestimonialsStackedSection />
  </div>
</template>
