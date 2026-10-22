<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionWrapRef = ref<HTMLElement | null>(null)
const draftingWrapRef = ref<HTMLElement | null>(null)
const { withBase } = useAssetUrl()
let ctx: gsap.Context | null = null

// Architectural Technical Drafting building sequence (6 progressive stages)
const draftImages = [
  {
    src: '/images/philosophy/building-draft-01.svg',
    title: 'Eixos & Implantação',
    alt: 'Desenho arquitetónico técnico - Fase 1: Eixos estruturais e implantação'
  },
  {
    src: '/images/philosophy/building-draft-02.svg',
    title: 'Fundações & Piso Térreo',
    alt: 'Desenho arquitetónico técnico - Fase 2: Fundações, sapatas e piso térreo'
  },
  {
    src: '/images/philosophy/building-draft-03.svg',
    title: 'Pisos Intermédios & Núcleo',
    alt: 'Desenho arquitetónico técnico - Fase 3: Lajes intermédias e núcleo de circulação'
  },
  {
    src: '/images/philosophy/building-draft-04.svg',
    title: 'Volumetria & Cobertura',
    alt: 'Desenho arquitetónico técnico - Fase 4: Volumetria total, pisos superiores e cobertura'
  },
  {
    src: '/images/philosophy/building-draft-05.svg',
    title: 'Envolvente & Brise-Soleil',
    alt: 'Desenho arquitetónico técnico - Fase 5: Caixilharias, brise-soleil e varandas'
  },
  {
    src: '/images/philosophy/building-draft-06.svg',
    title: 'Projeto de Execução Final',
    alt: 'Desenho arquitetónico técnico - Fase 6: Alçado principal completo com cotas e carimbo'
  }
]

const currentFrame = ref(0)

const pillars = [
  {
    num: '01',
    title: 'Rigor e Geometria',
    desc: 'O desenho surge da precisão matemática e da clareza espacial. Não há ornamento sem estrutura; cada linha responde a uma exigência física e funcional.'
  },
  {
    num: '02',
    title: 'Luz e Espacialidade',
    desc: 'Esculpir o vazio através da iluminação natural. Criamos transições fluídas entre o interior e o horizonte exterior, modulando sombras e serenidade.'
  },
  {
    num: '03',
    title: 'Matéria e Construção',
    desc: 'Verdade aos materiais: betão à vista, pedra calcária, madeiras nobres, estuques e alvenarias que envelhecem com dignidade e transmitem solidez intemporal.'
  }
]

const services = [
  {
    title: 'Projetos de Arquitetura',
    desc: 'Conceção de raiz para habitações unifamiliares, edifícios residenciais multifamiliares e equipamentos.'
  },
  {
    title: 'Arquitetura de Interiores',
    desc: 'Reabilitação espacial, carpintarias desenhadas à medida, curadoria de texturas e iluminação integrada.'
  },
  {
    title: 'Licenciamento & Simplex',
    desc: 'Instrução rigorosa de processos camarários, conformidade regulamentar e agilização administrativa.'
  },
  {
    title: 'Acompanhamento de Obra',
    desc: 'Supervisão técnica contínua e fiscalização do detalhe construtivo para garantir a integridade do projeto.'
  }
]

onMounted(() => {
  if (!import.meta.client || !sectionWrapRef.value) return

  ctx = gsap.context(() => {
    const mm = gsap.matchMedia()

    // Cascading pinned panels on all screen sizes (desktop + mobile)
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const panels = gsap.utils.toArray<HTMLElement>('.philosophy-panel')

      panels.forEach((panel, i) => {
        const inner = panel.querySelector<HTMLElement>('.panel-inner')
        if (!inner) return

        const isLast = i === panels.length - 1
        const totalScroll = inner.offsetHeight - window.innerHeight
        const hasOverscroll = totalScroll > 0

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: 'top top',
            end: () => (hasOverscroll ? `+=${inner.offsetHeight + 100}` : '+=100%'),
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1
          }
        })

        // 1. Overscroll: scroll the inner content if it overflows the viewport height
        if (hasOverscroll) {
          tl.to(inner, {
            y: -totalScroll,
            ease: 'none',
            duration: 1
          })
        }

        // 2. Hold panel fully visible/readable, then scale down and fade out as next panel approaches
        if (!isLast) {
          tl.to(
            panel,
            {
              scale: 0.9,
              opacity: 0.2,
              ease: 'power1.in',
              duration: 0.4
            },
            hasOverscroll ? '>+=0.1' : 0.6 // Holds at 100% opacity for initial 60% of scroll
          )
        }
      })

      // Pinned Technical Drafting Construction Video Background
      // Swaps the SVG frames progressively as the user scrolls across the entire 3rd section
      if (draftingWrapRef.value && sectionWrapRef.value) {
        ScrollTrigger.create({
          trigger: sectionWrapRef.value,
          start: 'top top',
          end: 'bottom bottom',
          pin: draftingWrapRef.value,
          pinSpacing: false,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const frameIndex = Math.min(
              Math.floor(self.progress * draftImages.length),
              draftImages.length - 1
            )
            if (currentFrame.value !== frameIndex) {
              currentFrame.value = frameIndex
            }
          }
        })
      }

      ScrollTrigger.refresh()
    })

    mm.add('(prefers-reduced-motion: reduce)', () => {
      currentFrame.value = draftImages.length - 1
    })
  }, sectionWrapRef.value)
})

onBeforeUnmount(() => {
  if (ctx) {
    ctx.revert()
  }
})
</script>

<template>
  <div
    id="sobre-nos"
    ref="sectionWrapRef"
    class="philosophy-container relative w-full bg-ink text-white"
    aria-label="Filosofia do Atelier e Serviços"
  >
    <!-- Pinned Drafting Sheet Background Construction Video (SVG Sequence) -->
    <div
      ref="draftingWrapRef"
      class="drafting-canvas-wrap pointer-events-none absolute top-0 left-0 w-full h-screen overflow-hidden z-0"
      aria-hidden="true"
    >
      <div
        v-for="(img, idx) in draftImages"
        :key="img.src"
        class="drafting-frame absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-200 ease-out"
        :class="currentFrame === idx ? 'opacity-40 z-10' : 'opacity-0 z-0 pointer-events-none'"
      >
        <img
          :src="withBase(img.src)"
          :alt="img.alt"
          class="w-full h-full object-contain md:object-cover object-center scale-150 md:scale-100 origin-center select-none"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>

    <!-- Panel 1: Section Title & Manifesto -->
    <section class="philosophy-panel panel-title relative w-full min-h-screen flex items-center justify-center text-white z-10">
      <div class="panel-inner w-full max-w-[1400px] mx-auto px-6 lg:px-14 py-16 flex flex-col justify-center">
        <div class="max-w-4xl">
          <h2 class="font-display text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.12]">
            A arquitetura como síntese entre a disciplina técnica e a emoção do espaço.
          </h2>
          <p class="mt-8 text-base sm:text-lg text-white/85 font-sans leading-relaxed max-w-3xl">
            Com sede em Lisboa, a AC-Arquitetos desenvolve uma prática assente na convicção de que cada lugar contém a sua própria resposta. Através de um diálogo próximo com os clientes e promotores, transformamos aspirações em espaços de solidez palpável e atmosfera luminosa.
          </p>
          <div class="mt-8 flex items-center gap-6 text-xs font-mono text-white/60 uppercase tracking-wider">
            <span>Lisboa &bull; Marquês de Pombal</span>
            <span>&bull;</span>
            <span>Atelier de Conceção</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Panel 2: Architectural Three Pillars -->
    <section class="philosophy-panel panel-pillars relative w-full min-h-screen flex items-center justify-center text-white z-20">
      <div class="panel-inner w-full max-w-[1400px] mx-auto px-6 lg:px-14 py-16 flex flex-col justify-center">
        <div class="mb-10 sm:mb-14">
          <h3 class="font-display text-2xl sm:text-4xl font-medium tracking-tight text-white">
            Princípios Fundamentais
          </h3>
        </div>

        <!-- Architectural Three Pillars Grid (Cards with outline only) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          <div
            v-for="pillar in pillars"
            :key="pillar.num"
            class="flex flex-col justify-between p-6 sm:p-8 border border-white/20 hover:border-white/40 transition-colors"
          >
            <div>
              <span class="font-mono text-xs text-white font-semibold tracking-widest block mb-4">
                {{ pillar.num }} &bull; Princípio
              </span>
              <h4 class="font-display text-xl sm:text-2xl font-medium text-white mb-3">
                {{ pillar.title }}
              </h4>
              <p class="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
                {{ pillar.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Panel 3: Services Grid -->
    <section id="servicos" class="philosophy-panel panel-services relative w-full min-h-screen flex items-center justify-center text-white z-30">
      <div class="panel-inner w-full max-w-[1400px] mx-auto px-6 lg:px-14 py-16 flex flex-col justify-center">
        <!-- Services Grid Header -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <h3 class="font-display text-2xl sm:text-4xl font-medium text-white">
              Serviços Especializados
            </h3>
          </div>
          <a
            href="mailto:ac@ac-arquitetos.com?subject=Pedido%20de%20Orcamento%20-%20AC-Arquitetos"
            class="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 border border-white/50 text-white hover:bg-white hover:text-black transition-all text-xs font-mono uppercase tracking-widest cursor-pointer"
          >
            Peça um Orçamento
            <UIcon name="lucide:arrow-right" class="w-3.5 h-3.5" />
          </a>
        </div>

        <!-- Services Grid Items (Cards with outline only) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(svc, sIdx) in services"
            :key="sIdx"
            class="p-6 border border-white/20 hover:border-white/40 transition-colors flex flex-col justify-between"
          >
            <div>
              <span class="text-[10px] font-mono text-white/70 uppercase tracking-widest block mb-4">
                Fase 0{{ sIdx + 1 }}
              </span>
              <h4 class="font-display text-lg font-medium text-white mb-2">
                {{ svc.title }}
              </h4>
              <p class="text-xs text-white/80 font-sans leading-relaxed">
                {{ svc.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.philosophy-panel {
  background-color: transparent !important;
  color: #ffffff !important;
}

.philosophy-panel h2,
.philosophy-panel h3,
.philosophy-panel h4 {
  color: #ffffff !important;
}

.philosophy-panel p {
  color: rgba(255, 255, 255, 0.88) !important;
}
</style>
