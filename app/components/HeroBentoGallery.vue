<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { useHeaderState } from '~/composables/useHeaderState'

const { setPastFirstSection } = useHeaderState()

const galleryWrapRef = ref<HTMLElement | null>(null)
const galleryElRef = ref<HTMLElement | null>(null)

let ctx: gsap.Context | null = null

const bentoItems = [
  {
    image: '/images/projects/casa-azeitao.jpg',
    title: 'Casa - Azeitão',
    caption: 'Luz meridional & topografia',
    width: 512,
    height: 512,
    priority: true
  },
  {
    image: '/images/projects/casa-dh.jpg',
    title: 'Casa - DH',
    caption: 'Pureza geométrica',
    width: 628,
    height: 628
  },
  {
    image: '/images/projects/twin-house-sesimbra.jpg',
    title: 'Twin House',
    caption: 'Rigor & matéria',
    width: 629,
    height: 628
  },
  {
    image: '/images/projects/casa-db.jpg',
    title: 'Casa - DB',
    caption: 'Volumes esculturais',
    width: 628,
    height: 628
  },
  {
    image: '/images/projects/habitacao-coletiva-rio-maior.jpg',
    title: 'Rio Maior',
    caption: 'Habitação coletiva',
    width: 629,
    height: 628
  },
  {
    image: '/images/projects/casa-benfica.jpg',
    title: 'Casa - BEN',
    caption: 'Interiores & marcenaria',
    width: 628,
    height: 628
  },
  {
    image: '/images/projects/duplex-cs.jpg',
    title: 'Duplex - CS',
    caption: 'Memória pombalina',
    width: 629,
    height: 628
  },
  {
    image: '/images/projects/restaurante-saldanha.jpg',
    title: 'Saldanha',
    caption: 'Espaço e acústica',
    width: 628,
    height: 450
  }
]

onMounted(() => {
  if (!import.meta.client || !galleryWrapRef.value || !galleryElRef.value) return

  ctx = gsap.context(() => {
    const galleryEl = galleryElRef.value!
    const galleryWrap = galleryWrapRef.value!
    const items = galleryEl.querySelectorAll('.bento-item')

    const mm = gsap.matchMedia()

    // Reduced motion branch: show end state directly, no pinning
    mm.add('(prefers-reduced-motion: reduce)', () => {
      galleryEl.classList.add('bento-final')
      setPastFirstSection(false)
    })

    // Mobile branch: no animation, all images directly on display
    mm.add('(max-width: 767px)', () => {
      galleryEl.classList.remove('bento-final')
    })

    // Desktop normal motion branch: Flip scrubbed pinning
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      galleryEl.classList.remove('bento-final')

      // Record final Flip state
      galleryEl.classList.add('bento-final')
      const flipState = Flip.getState(items)
      galleryEl.classList.remove('bento-final')

      const flipTween = Flip.to(flipState, {
        simple: true,
        ease: 'power2.inOut'
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: galleryWrap,
          start: 'top top',
          end: '+=130%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onLeave: () => {
            setPastFirstSection(true)
          },
          onEnterBack: () => {
            setPastFirstSection(false)
          },
          onRefresh: (self) => {
            setPastFirstSection(self.progress >= 1)
          }
        }
      })

      tl.add(flipTween)
    })
  }, galleryWrapRef.value)
})

onBeforeUnmount(() => {
  if (ctx) {
    ctx.revert()
  }
})
</script>

<template>
  <section
    ref="galleryWrapRef"
    class="relative w-full min-h-screen md:h-screen overflow-hidden bg-ink flex items-center justify-center select-none py-16 md:py-0"
    aria-label="Galeria Bento de Abertura"
  >
    <!-- Bento Gallery Container -->
    <div
      id="gallery-bento-hero"
      ref="galleryElRef"
      class="gallery-bento relative w-full h-full flex-none"
    >
      <div
        v-for="(item, idx) in bentoItems"
        :key="idx"
        class="bento-item relative overflow-hidden bg-ink/20 group"
      >
        <NuxtImg
          :src="item.image"
          :alt="item.title"
          :width="item.width"
          :height="item.height"
          :loading="item.priority ? 'eager' : 'lazy'"
          :fetchpriority="item.priority ? 'high' : 'low'"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Bento Grid Structure according to GSAP scrubbed bento gallery spec */
.gallery-bento {
  display: grid;
  gap: 1.2vh;
  grid-template-columns: repeat(3, 31.5vw);
  grid-template-rows: repeat(4, 22.5vh);
  justify-content: center;
  align-content: center;
}

/* Expanded/morphed final state scrubbed by ScrollTrigger */
.gallery-bento.bento-final {
  grid-template-columns: repeat(3, 98vw);
  grid-template-rows: repeat(4, 52vh);
  gap: 1.5vh;
}

.gallery-bento .bento-item:nth-child(1) {
  grid-area: 1 / 1 / 3 / 2;
}

.gallery-bento .bento-item:nth-child(2) {
  grid-area: 1 / 2 / 2 / 3;
}

.gallery-bento .bento-item:nth-child(3) {
  grid-area: 2 / 2 / 4 / 3;
}

.gallery-bento .bento-item:nth-child(4) {
  grid-area: 1 / 3 / 3 / 3;
}

.gallery-bento .bento-item:nth-child(5) {
  grid-area: 3 / 1 / 3 / 2;
}

.gallery-bento .bento-item:nth-child(6) {
  grid-area: 3 / 3 / 5 / 4;
}

.gallery-bento .bento-item:nth-child(7) {
  grid-area: 4 / 1 / 5 / 2;
}

.gallery-bento .bento-item:nth-child(8) {
  grid-area: 4 / 2 / 5 / 3;
}

@media (max-width: 768px) {
  .gallery-bento {
    grid-template-columns: repeat(2, 46vw);
    grid-template-rows: repeat(4, 22vh);
  }
  .gallery-bento.bento-final {
    grid-template-columns: repeat(2, 95vw);
    grid-template-rows: repeat(4, 45vh);
  }
  .gallery-bento .bento-item:nth-child(1) { grid-area: 1 / 1 / 2 / 2; }
  .gallery-bento .bento-item:nth-child(2) { grid-area: 1 / 2 / 2 / 3; }
  .gallery-bento .bento-item:nth-child(3) { grid-area: 2 / 1 / 3 / 2; }
  .gallery-bento .bento-item:nth-child(4) { grid-area: 2 / 2 / 3 / 3; }
  .gallery-bento .bento-item:nth-child(5) { grid-area: 3 / 1 / 4 / 2; }
  .gallery-bento .bento-item:nth-child(6) { grid-area: 3 / 2 / 4 / 3; }
  .gallery-bento .bento-item:nth-child(7) { grid-area: 4 / 1 / 5 / 2; }
  .gallery-bento .bento-item:nth-child(8) { grid-area: 4 / 2 / 5 / 3; }
}
</style>
