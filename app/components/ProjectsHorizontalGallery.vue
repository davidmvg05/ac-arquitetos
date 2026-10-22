<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projectsData } from '~~/shared/data/projects'
import type { Project } from '~~/shared/types'

const sectionRef = ref<HTMLElement | null>(null)
const stripRef = ref<HTMLElement | null>(null)
const scrollContainerRef = ref<HTMLElement | null>(null)
const selectedProject = ref<Project | null>(null)

let ctx: gsap.Context | null = null

const scrollMobilePrev = () => {
  if (scrollContainerRef.value) {
    scrollContainerRef.value.scrollBy({ left: -window.innerWidth * 0.75, behavior: 'smooth' })
  }
}

const scrollMobileNext = () => {
  if (scrollContainerRef.value) {
    scrollContainerRef.value.scrollBy({ left: window.innerWidth * 0.75, behavior: 'smooth' })
  }
}

const openProject = (project: Project) => {
  selectedProject.value = project
}

const closeProject = () => {
  selectedProject.value = null
}

onMounted(() => {
  if (!import.meta.client || !sectionRef.value || !stripRef.value) return

  ctx = gsap.context(() => {
    const sec = sectionRef.value!
    const pinWrap = stripRef.value!

    const mm = gsap.matchMedia()

    // Reduced motion or very small devices: disable pinning
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(pinWrap, { clearProps: 'all' })
    })

    // Screens starting from 768px (md breakpoint per GEMINI.md)
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const getScrollLength = () => pinWrap.scrollWidth - window.innerWidth + 80

      gsap.to(pinWrap, {
        x: () => -getScrollLength(),
        ease: 'none',
        scrollTrigger: {
          trigger: sec,
          pin: true,
          scrub: 1.2,
          start: 'top top',
          end: () => `+=${pinWrap.scrollWidth}`,
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      })
    })
  }, sectionRef.value)
})

onBeforeUnmount(() => {
  if (ctx) {
    ctx.revert()
  }
})
</script>

<template>
  <section
    id="projetos"
    ref="sectionRef"
    class="relative w-full min-h-0 md:min-h-screen bg-paper text-ink overflow-hidden pt-8 md:pt-12 pb-4 md:pb-0"
    aria-label="Apresentação de Projetos em Galeria Horizontal"
  >
    <!-- Section Header (Sticky / Top Info) -->
    <div class="px-6 lg:px-14 pb-4 md:pb-6 flex items-center justify-between gap-6">
      <div>
        <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ink">
          Obras & Projetos
        </h2>
      </div>

      <!-- Mobile Navigation Arrows (Visible only on mobile to scroll projects) -->
      <div class="flex md:hidden items-center gap-2">
        <button
          type="button"
          class="w-9 h-9 border border-ink/20 flex items-center justify-center text-ink hover:border-brick hover:text-brick transition-colors cursor-pointer"
          aria-label="Projeto Anterior"
          @click="scrollMobilePrev"
        >
          <UIcon name="lucide:arrow-left" class="w-4 h-4" />
        </button>
        <button
          type="button"
          class="w-9 h-9 border border-ink/20 flex items-center justify-center text-ink hover:border-brick hover:text-brick transition-colors cursor-pointer"
          aria-label="Próximo Projeto"
          @click="scrollMobileNext"
        >
          <UIcon name="lucide:arrow-right" class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Horizontal Strip Container: hide native scrollbar -->
    <div
      ref="scrollContainerRef"
      class="w-full h-auto md:h-[calc(100vh-160px)] flex items-center overflow-x-auto md:overflow-visible py-4 md:py-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      <div
        ref="stripRef"
        class="horiz-gallery-strip flex flex-nowrap items-stretch gap-6 md:gap-8 px-6 lg:px-14"
      >
        <!-- Project Card -->
        <article
          v-for="(project, index) in projectsData"
          :key="project.id"
          class="project-wrap group flex-none w-[85vw] sm:w-[55vw] md:w-[42vw] lg:w-[32vw] flex flex-col justify-between bg-paper border border-ink/15 hover:border-brick transition-all duration-500 cursor-pointer p-4 sm:p-5"
          @click="openProject(project)"
        >
          <!-- Top Meta: Index & Category -->
          <div class="flex items-center justify-between pb-3 border-b border-ink/10 text-xs font-mono">
            <span class="text-brick font-semibold">
              0{{ index + 1 }} / 0{{ projectsData.length }}
            </span>
            <span class="text-ink/60 uppercase tracking-wider text-[11px]">
              {{ project.category }}
            </span>
          </div>

          <!-- Image Container with Architectural Aspect Ratio -->
          <div class="relative w-full aspect-[4/3] sm:aspect-square my-4 overflow-hidden bg-ink/5">
            <NuxtImg
              :src="project.image"
              :alt="project.alt"
              :width="project.dimensions?.width || 628"
              :height="project.dimensions?.height || 628"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <!-- Subtle hover badge -->
            <div class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-paper/90 backdrop-blur-xs px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase text-brick border border-brick/30">
              Ver Detalhe
            </div>
          </div>

          <!-- Bottom Info: Title, Location & Year -->
          <div class="pt-2">
            <div class="flex items-baseline justify-between gap-2">
              <h3 class="font-display text-lg sm:text-xl font-medium text-ink group-hover:text-brick transition-colors">
                {{ project.title }}
              </h3>
              <span class="font-mono text-xs text-ink/50">
                {{ project.year }}
              </span>
            </div>
            <p class="text-xs text-ink/60 font-sans mt-1 flex items-center gap-1.5">
              <UIcon name="lucide:map-pin" class="w-3.5 h-3.5 text-brick flex-none" />
              <span>{{ project.location }}</span>
            </p>
          </div>
        </article>
      </div>
    </div>

    <!-- Project Detail Modal (Accessible, Clean Architectural Overlay) -->
    <Teleport to="body">
      <div
        v-if="selectedProject"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-ink/80 backdrop-blur-xs"
        role="dialog"
        aria-modal="true"
        :aria-label="selectedProject.title"
      >
        <div
          class="relative w-full max-w-4xl max-h-[90vh] bg-paper text-ink overflow-y-auto border border-ink/20 shadow-2xl p-6 sm:p-10"
        >
          <!-- Close button -->
          <button
            type="button"
            class="absolute top-6 right-6 p-2 border border-ink/20 hover:border-brick hover:text-brick transition-colors cursor-pointer"
            aria-label="Fechar detalhe do projeto"
            @click="closeProject"
          >
            <UIcon name="lucide:x" class="w-5 h-5" />
          </button>

          <!-- Modal Header -->
          <div class="mb-6">
            <span class="text-xs font-mono tracking-widest uppercase text-brick font-semibold">
              {{ selectedProject.category }} &bull; {{ selectedProject.year }}
            </span>
            <h3 class="font-display text-2xl sm:text-4xl font-medium text-ink mt-1">
              {{ selectedProject.title }}
            </h3>
            <p class="text-xs text-ink/60 mt-1 flex items-center gap-1.5 font-sans">
              <UIcon name="lucide:map-pin" class="w-3.5 h-3.5 text-brick" />
              {{ selectedProject.location }}
            </p>
          </div>

          <!-- Main Image -->
          <div class="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-ink/5 border border-ink/10 mb-6">
            <NuxtImg
              :src="selectedProject.image"
              :alt="selectedProject.alt"
              :width="selectedProject.dimensions?.width || 628"
              :height="selectedProject.dimensions?.height || 628"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Description & Architectural Notes -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-ink/10 text-xs">
            <div class="md:col-span-2">
              <h4 class="font-display text-sm font-semibold uppercase tracking-wider text-ink mb-2">
                Memória Descritiva
              </h4>
              <p class="font-sans leading-relaxed text-ink/80 text-sm">
                {{ selectedProject.description }}
              </p>
            </div>
            <div class="space-y-3 bg-ink/[0.03] p-4 border border-ink/10">
              <div>
                <span class="block text-[10px] uppercase font-mono text-ink/50">Tipologia</span>
                <span class="font-medium text-ink">{{ selectedProject.category }}</span>
              </div>
              <div>
                <span class="block text-[10px] uppercase font-mono text-ink/50">Localização</span>
                <span class="font-medium text-ink">{{ selectedProject.location }}</span>
              </div>
              <div>
                <span class="block text-[10px] uppercase font-mono text-ink/50">Conclusão</span>
                <span class="font-mono text-ink">{{ selectedProject.year }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.horiz-gallery-strip {
  will-change: transform;
}
</style>
