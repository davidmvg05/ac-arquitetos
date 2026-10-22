<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { menuItemsData } from '~~/shared/data/navigation'
import { useHeaderState } from '~/composables/useHeaderState'

const {
  isPastFirstSection,
  isHeaderHidden,
  isMenuOpen,
  toggleMenu,
  closeMenu,
  setPastFirstSection,
  setHeaderHidden
} = useHeaderState()

const { locale, setLocale } = useI18n()
const route = useRoute()

const activeHoveredIndex = ref<number | null>(null)
const activeImage = ref<string>('')

const isHome = computed(() => route.path === '/' || route.path === '/en')

const switchLanguage = (target: 'pt' | 'en') => {
  setLocale(target)
}

const handleNavigate = (path: string) => {
  closeMenu()
  if (path === '/' || path === '') {
    if (isHome.value && import.meta.client) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    navigateTo('/')
    return
  }
  if (path.startsWith('#')) {
    if (isHome.value && import.meta.client) {
      const el = document.querySelector(path)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    navigateTo(`/${path}`)
    return
  }
  navigateTo(path)
}

const handleItemHover = (index: number, image: string) => {
  activeHoveredIndex.value = index
  activeImage.value = image
}

const handleNavLeave = () => {
  activeHoveredIndex.value = null
  activeImage.value = ''
}

let lastScrollY = 0
let ticking = false

const handleScroll = () => {
  if (ticking || !import.meta.client) return
  ticking = true

  requestAnimationFrame(() => {
    const currentScrollY = window.scrollY

    // If close to top, header is visible
    if (currentScrollY <= 20) {
      setHeaderHidden(false)
      if (isHome.value) {
        setPastFirstSection(false)
      }
      lastScrollY = currentScrollY
      ticking = false
      return
    }

    // Check if past first section on homepage
    if (isHome.value) {
      const heroEl = document.getElementById('gallery-bento-hero')
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect()
        if (rect.bottom <= 60) {
          setPastFirstSection(true)
        } else if (currentScrollY <= 20) {
          setPastFirstSection(false)
        }
      }
    } else {
      setPastFirstSection(true)
    }

    // Scroll direction check:
    // Scroll down -> hide
    // Scroll up -> show
    const diff = currentScrollY - lastScrollY
    if (Math.abs(diff) > 5) {
      if (diff > 0 && currentScrollY > 80) {
        setHeaderHidden(true)
      } else if (diff < 0) {
        setHeaderHidden(false)
      }
      lastScrollY = currentScrollY
    }

    ticking = false
  })
}

watch(
  () => route.path,
  () => {
    closeMenu()
    if (!isHome.value) {
      setPastFirstSection(true)
    } else if (import.meta.client && window.scrollY <= 20) {
      setPastFirstSection(false)
    }
    setHeaderHidden(false)
  },
  { immediate: true }
)

onMounted(() => {
  if (import.meta.client) {
    lastScrollY = window.scrollY
    if (!isHome.value) {
      setPastFirstSection(true)
    } else if (window.scrollY <= 20) {
      setPastFirstSection(false)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-40 transition-all duration-500 will-change-transform"
    :class="[
      isHeaderHidden && !isMenuOpen
        ? '-translate-y-full opacity-0 pointer-events-none'
        : 'translate-y-0 opacity-100 pointer-events-auto',
      isPastFirstSection
        ? 'bg-paper text-ink shadow-xs'
        : 'bg-transparent text-paper'
    ]"
    role="banner"
  >
    <div
      class="max-w-[1400px] mx-auto px-6 lg:px-12 py-4 sm:py-5 grid grid-cols-3 items-center"
    >
      <!-- Left: Architectural Hamburger Button -->
      <div class="flex items-center justify-start">
        <button
          type="button"
          class="group relative flex items-center gap-2.5 px-3.5 py-2 border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brick cursor-pointer shadow-xs"
          :class="[
            isPastFirstSection
              ? 'border-ink/20 hover:border-brick bg-paper text-ink'
              : 'border-paper/40 hover:border-paper bg-ink/30 backdrop-blur-xs text-paper'
          ]"
          :aria-expanded="isMenuOpen"
          :aria-label="isMenuOpen ? 'Fechar menu' : 'Abrir menu'"
          @click="toggleMenu"
        >
          <div class="w-5 h-3 flex flex-col justify-between items-start">
            <span
              class="h-[1.5px] transition-all duration-300"
              :class="[
                isPastFirstSection ? 'bg-ink group-hover:bg-brick' : 'bg-paper group-hover:bg-paper',
                isMenuOpen ? 'w-5 translate-y-[5px] rotate-45' : 'w-5'
              ]"
            />
            <span
              class="h-[1.5px] transition-all duration-300"
              :class="[
                isPastFirstSection ? 'bg-ink group-hover:bg-brick' : 'bg-paper group-hover:bg-paper',
                isMenuOpen ? 'opacity-0' : 'w-3.5'
              ]"
            />
            <span
              class="h-[1.5px] transition-all duration-300"
              :class="[
                isPastFirstSection ? 'bg-ink group-hover:bg-brick' : 'bg-paper group-hover:bg-paper',
                isMenuOpen ? 'w-5 -translate-y-[5.5px] -rotate-45' : 'w-2'
              ]"
            />
          </div>
          <span
            class="text-[11px] uppercase tracking-[0.2em] font-medium transition-colors hidden sm:inline-block"
            :class="[
              isPastFirstSection ? 'text-ink group-hover:text-brick' : 'text-paper'
            ]"
          >
            {{ isMenuOpen ? 'Fechar' : 'Menu' }}
          </span>
        </button>
      </div>

      <!-- Center: Logo (Only Image) -->
      <div class="flex items-center justify-center">
        <NuxtLink
          to="/"
          class="group inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brick rounded-xs"
          aria-label="AC-Arquitetos Início"
          @click="closeMenu"
        >
          <NuxtImg
            src="/images/brand/logo-ac.png"
            alt="Logótipo AC-Arquitetos"
            width="48"
            height="46"
            class="h-9 sm:h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105"
            :class="[
              isPastFirstSection
                ? 'brightness-100'
                : 'brightness-0 invert drop-shadow-sm'
            ]"
          />
        </NuxtLink>
      </div>

      <!-- Right: Language Toggle -->
      <div class="flex items-center justify-end">
        <div
          class="flex items-center text-xs tracking-wider font-medium transition-colors"
          :class="isPastFirstSection ? 'text-ink/70' : 'text-paper/90'"
        >
          <button
            type="button"
            class="px-1.5 py-1 transition-colors hover:text-brick cursor-pointer"
            :class="[
              locale === 'pt'
                ? (isPastFirstSection ? 'text-brick font-semibold' : 'text-paper font-semibold underline underline-offset-4 decoration-paper/70')
                : ''
            ]"
            @click="switchLanguage('pt')"
          >
            PT
          </button>
          <span :class="isPastFirstSection ? 'text-ink/30' : 'text-paper/40'">/</span>
          <button
            type="button"
            class="px-1.5 py-1 transition-colors hover:text-brick cursor-pointer"
            :class="[
              locale === 'en'
                ? (isPastFirstSection ? 'text-brick font-semibold' : 'text-paper font-semibold underline underline-offset-4 decoration-paper/70')
                : ''
            ]"
            @click="switchLanguage('en')"
          >
            EN
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Sidebar Overlay & Drawer (Opens from LEFT) -->
  <Teleport to="body">
    <div
      v-show="isMenuOpen"
      class="fixed inset-0 z-50 flex justify-start"
      :class="isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'"
    >
      <!-- Backdrop -->
      <Transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isMenuOpen"
          class="absolute inset-0 bg-ink/60 backdrop-blur-xs"
          @click="closeMenu"
        />
      </Transition>

      <!-- Architectural Sidebar -->
      <Transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-200 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-full"
      >
        <aside
          v-if="isMenuOpen"
          class="relative w-full max-w-2xl h-full bg-paper text-ink shadow-2xl flex flex-col justify-between z-10 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Menu Principal"
        >
          <!-- Full Sidebar Background with Clean Solid Switch (No ghost overlap) -->
          <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div
              v-for="item in menuItemsData"
              :key="item.path"
              class="absolute inset-0 bg-cover bg-center transition-opacity duration-300 ease-out"
              :style="{ backgroundImage: `url(${item.image})` }"
              :class="activeImage === item.image ? 'opacity-100 z-10' : 'opacity-0 z-0'"
            />

            <!-- Protective text gradient -->
            <div
              class="absolute inset-0 z-20 bg-gradient-to-r from-paper/95 via-paper/60 to-transparent transition-opacity duration-300"
              :class="activeImage ? 'opacity-100' : 'opacity-0'"
            />
          </div>

          <!-- Top bar inside sidebar -->
          <div class="relative z-10 p-6 lg:p-8 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <NuxtImg
                src="/images/brand/logo-ac.png"
                alt="AC-Arquitetos"
                width="36"
                height="35"
                class="h-7 w-auto object-contain"
              />
              <span class="text-xs font-display uppercase tracking-[0.2em] font-semibold text-ink">
                Navegação do Atelier
              </span>
            </div>

            <button
              type="button"
              class="p-2 hover:text-brick transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brick"
              aria-label="Fechar Menu"
              @click="closeMenu"
            >
              <UIcon name="lucide:x" class="w-6 h-6" />
            </button>
          </div>

          <!-- Menu List (Lines removed, buttery crossfade) -->
          <nav
            class="relative z-10 flex-1 py-4 flex flex-col justify-center"
            aria-label="Navegação Principal"
            @mouseleave="handleNavLeave"
          >
            <ul class="space-y-1">
              <li
                v-for="(item, index) in menuItemsData"
                :key="item.path"
                class="relative overflow-hidden group"
                @mouseenter="handleItemHover(index, item.image)"
              >
                <!-- Menu Item Link Content -->
                <a
                  :href="item.path"
                  class="relative z-10 px-6 lg:px-10 py-3.5 flex items-center justify-between text-ink transition-all duration-300 group-hover:translate-x-2 block focus-visible:outline-none focus-visible:bg-ink/5"
                  @click.prevent="handleNavigate(item.path)"
                >
                  <div class="flex items-center gap-4 sm:gap-6">
                    <span class="font-mono text-xs tracking-widest text-brick font-semibold">
                      0{{ index + 1 }}
                    </span>
                    <div>
                      <h2 class="font-display text-xl sm:text-2xl font-medium tracking-tight text-ink group-hover:text-brick transition-colors">
                        {{ item.title }}
                      </h2>
                      <p class="text-[11px] text-ink/50 tracking-wider uppercase font-sans mt-0.5">
                        {{ item.tag }}
                      </p>
                    </div>
                  </div>

                  <div class="w-8 h-8 flex items-center justify-center text-ink/40 group-hover:text-brick group-hover:translate-x-1 transition-all">
                    <UIcon name="lucide:arrow-right" class="w-4 h-4" />
                  </div>
                </a>
              </li>
            </ul>
          </nav>
        </aside>
      </Transition>
    </div>
  </Teleport>
</template>


