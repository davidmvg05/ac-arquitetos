<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { blogPostsData } from '~~/shared/data/blog'

const carouselRef = ref<any>(null)
const canScrollPrev = ref(false)
const canScrollNext = ref(true)

const getEmblaApi = () => {
  const exposed = carouselRef.value?.emblaApi
  if (!exposed) return null
  return typeof exposed === 'object' && 'value' in exposed ? exposed.value : exposed
}

const updateScrollState = () => {
  const api = getEmblaApi()
  if (!api) return
  canScrollPrev.value = api.canScrollPrev()
  canScrollNext.value = api.canScrollNext()
}

const scrollPrev = () => {
  const api = getEmblaApi()
  if (!api) return
  api.scrollPrev()
  updateScrollState()
}

const scrollNext = () => {
  const api = getEmblaApi()
  if (!api) return
  api.scrollNext()
  updateScrollState()
}

onMounted(() => {
  if (import.meta.client) {
    ScrollTrigger.refresh()
    setTimeout(() => {
      const api = getEmblaApi()
      if (api) {
        api.on('select', updateScrollState)
        api.on('reInit', updateScrollState)
        updateScrollState()
      }
    }, 100)
  }
})
</script>

<template>
  <section
    id="blog"
    class="relative z-40 py-20 lg:py-28 bg-paper text-ink"
    aria-label="Artigos e Publicações do Atelier"
  >
    <div class="max-w-[1400px] mx-auto px-6 lg:px-14">
      <!-- Section Header -->
      <div class="mb-12">
        <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ink leading-normal pb-1">
          Blo<span class="font-sans font-medium">g</span> & Reflexões
        </h2>
      </div>

      <!-- Nuxt UI Carousel with 3 visible cards & outer arrow navigation -->
      <div class="relative px-5 sm:px-8 lg:px-10">
        <!-- Left Arrow: normal is arrow in square, hover is only arrow, positioned close to card & visible on mobile -->
        <button
          type="button"
          :disabled="!canScrollPrev"
          class="absolute -start-2 sm:-start-4 lg:-start-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center cursor-pointer transition-all border border-ink/30 bg-paper hover:border-transparent hover:bg-transparent disabled:opacity-20 disabled:cursor-not-allowed focus-visible:outline-none"
          aria-label="Artigo Anterior"
          @click="scrollPrev"
        >
          <UIcon
            name="lucide:arrow-left"
            class="w-4 h-4 sm:w-4.5 sm:h-4.5 text-ink transition-transform group-hover:-translate-x-0.5"
          />
        </button>

        <!-- Right Arrow: normal is arrow in square, hover is only arrow, positioned close to card & visible on mobile -->
        <button
          type="button"
          :disabled="!canScrollNext"
          class="absolute -end-2 sm:-end-4 lg:-end-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center cursor-pointer transition-all border border-ink/30 bg-paper hover:border-transparent hover:bg-transparent disabled:opacity-20 disabled:cursor-not-allowed focus-visible:outline-none"
          aria-label="Próximo Artigo"
          @click="scrollNext"
        >
          <UIcon
            name="lucide:arrow-right"
            class="w-4 h-4 sm:w-4.5 sm:h-4.5 text-ink transition-transform group-hover:translate-x-0.5"
          />
        </button>

        <UCarousel
          ref="carouselRef"
          v-slot="{ item }"
          :items="blogPostsData"
          align="start"
          :slides-to-scroll="1"
          contain-scroll="trimSnaps"
          :loop="false"
          :ui="{
            root: 'relative focus:outline-none',
            container: 'flex gap-6 ms-0',
            item: 'ps-0 min-w-0 flex-none basis-full md:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]'
          }"
          class="w-full"
          @select="updateScrollState"
        >
          <article
            class="group h-full flex flex-col justify-between bg-paper border border-ink/15 hover:border-brick transition-all duration-300 p-5"
          >
            <div>
              <!-- Article Image: identical uniform sizing -->
              <div class="relative w-full h-52 sm:h-56 overflow-hidden bg-ink/5 mb-4">
                <NuxtImg
                  :src="item.image"
                  :alt="item.alt"
                  width="500"
                  height="312"
                  loading="lazy"
                  class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div class="absolute top-3 left-3 bg-paper/95 backdrop-blur-xs px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase text-brick border border-ink/10">
                  {{ item.category }}
                </div>
              </div>

              <!-- Meta Info -->
              <div class="flex items-center gap-3 text-[11px] font-mono text-ink/50 mb-2">
                <span>{{ item.date }}</span>
                <span>&bull;</span>
                <span>{{ item.readTime }} de leitura</span>
              </div>

              <!-- Title -->
              <h3 class="font-display text-lg sm:text-xl font-medium text-ink group-hover:text-brick transition-colors line-clamp-2 mb-2.5 leading-snug">
                {{ item.title }}
              </h3>

              <!-- Excerpt -->
              <p class="text-xs text-ink/70 font-sans leading-relaxed line-clamp-3">
                {{ item.excerpt }}
              </p>
            </div>

            <!-- Read Article Link (internal line removed per request) -->
            <div class="pt-4 flex items-center justify-between">
              <span class="text-xs font-mono uppercase tracking-wider text-brick font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                Ler Artigo
                <UIcon name="lucide:arrow-right" class="w-3.5 h-3.5" />
              </span>
              <span class="text-[10px] text-ink/40 font-mono">
                AC Arquitetos
              </span>
            </div>
          </article>
        </UCarousel>
      </div>
    </div>
  </section>
</template>
