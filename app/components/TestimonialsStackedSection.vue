<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { testimonialsData } from '~~/shared/data/testimonials'

const sectionRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!import.meta.client || !sectionRef.value) return

  ctx = gsap.context(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('.testimonial-card')
      if (cards.length <= 1) return

      // Initial card stack presentation: cards 0, 1, 2, 3 stacked with depth
      cards.forEach((card, i) => {
        gsap.set(card, {
          scale: 1 - i * 0.035,
          y: i * 12,
          transformOrigin: 'center center'
        })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top top',
          end: `+=${(cards.length - 1) * 120}%`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1
        }
      })

      // Animate throwing each card: alternating left (even) and right (odd)
      cards.slice(0, -1).forEach((card, i) => {
        const nextCard = cards[i + 1]
        const isLeft = i % 2 === 0

        tl.to(card, {
          xPercent: isLeft ? -150 : 150,
          rotation: isLeft ? -8 : 8,
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut'
        })

        if (nextCard) {
          tl.to(
            nextCard,
            {
              scale: 1,
              y: 0,
              duration: 0.6,
              ease: 'power1.out'
            },
            '<+=0.3'
          )
        }
      })
    })

    mm.add('(prefers-reduced-motion: reduce)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('.testimonial-card')
      cards.forEach((card) => {
        gsap.set(card, { clearProps: 'all' })
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
    id="testemunhos"
    ref="sectionRef"
    class="relative z-50 w-full min-h-screen bg-ink text-white flex flex-col justify-center py-16 overflow-hidden"
    aria-label="Testemunhos de Clientes e Parceiros"
  >
    <div class="max-w-[1400px] w-full mx-auto px-6 lg:px-14 mb-8 sm:mb-12">
      <!-- Section Title Header -->
      <div>
        <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white">
          Testemunhos
        </h2>
      </div>
    </div>

    <!-- Stacked Cards Container: all cards overlap in the same viewport spot -->
    <div class="relative w-full max-w-4xl mx-auto px-6 h-[460px] sm:h-[380px]">
      <article
        v-for="(testimonial, idx) in testimonialsData"
        :key="testimonial.id"
        class="testimonial-card absolute inset-x-6 top-0 bg-paper text-ink border border-ink/20 shadow-2xl p-6 sm:p-10 lg:p-12 will-change-transform"
        :style="{ zIndex: testimonialsData.length - idx }"
      >
        <!-- Top Architectural Plate Line -->
        <div class="flex items-center justify-between pb-4 sm:pb-6 mb-4 sm:mb-6 border-b border-ink/10 text-xs font-mono">
          <div class="flex items-center gap-3">
            <span class="text-brick font-semibold">0{{ idx + 1 }}</span>
            <span class="text-ink/30">/</span>
            <span class="text-ink/60 uppercase tracking-widest text-[11px]">
              {{ testimonial.projectTitle }} &bull; {{ testimonial.year }}
            </span>
          </div>
          <span class="text-ink/40 uppercase tracking-wider text-[10px]">
            {{ testimonial.location }}
          </span>
        </div>

        <!-- Testimonial Quote -->
        <blockquote class="font-display text-base sm:text-xl lg:text-2xl font-light text-ink leading-relaxed tracking-tight mb-6 sm:mb-8">
          &ldquo;{{ testimonial.quote }}&rdquo;
        </blockquote>

        <!-- Author details -->
        <div class="flex items-center justify-between pt-4 border-t border-ink/10">
          <div>
            <p class="font-display text-sm sm:text-base font-semibold text-ink">
              {{ testimonial.author }}
            </p>
            <p class="text-xs text-ink/60 font-sans">
              {{ testimonial.role }}
            </p>
          </div>

          <!-- Architectural Seal Detail -->
          <div class="hidden sm:flex items-center gap-2 text-brick font-mono text-[10px] tracking-widest uppercase border border-brick/30 px-3 py-1">
            <span>AC-Arquitetos</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.testimonial-card {
  box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.12), 0 5px 15px -5px rgba(0, 0, 0, 0.06);
}
</style>
