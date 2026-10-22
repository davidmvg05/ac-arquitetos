<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://instagram.com/ac_arquitetos',
    icon: 'simple-icons:instagram'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/ac-arquitetos',
    icon: 'simple-icons:linkedin'
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/ac.arquitetos.lisboa',
    icon: 'simple-icons:facebook'
  }
]
</script>

<template>
  <footer
    class="relative w-full overflow-hidden bg-paper text-ink border-t border-ink/20 py-16 sm:py-20 lg:py-24"
    role="contentinfo"
  >
    <!-- Architectural Drafting Sheet SVG Background Image (Full Section) -->
    <div
      class="absolute inset-0 w-full h-full pointer-events-none select-none bg-[url('/images/footer/architectural-drafting-sheet.svg')] bg-cover bg-center"
      aria-hidden="true"
    />

    <!-- Foreground Content Layer: standard full-width container -->
    <div class="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-14">
      <!-- Architectural Grid Top Row: Studio Identity & Coordinates -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-ink/15">
        <!-- Logo & Brand Column -->
        <div class="md:col-span-5 flex flex-col justify-between">
          <div class="flex items-center gap-4">
            <NuxtImg
              src="/images/brand/logo-ac.png"
              alt="Logótipo Oficial AC-Arquitetos"
              width="64"
              height="62"
              class="h-12 sm:h-14 w-auto object-contain flex-none brightness-0"
            />
            <div>
              <span class="font-display text-lg uppercase tracking-[0.25em] font-bold text-ink block leading-none">
                AC-Arquitetos
              </span>
              <span class="text-[11px] tracking-[0.2em] uppercase text-ink/65 mt-1 block font-sans">
                Arquitetura &amp; Arquitetura de Interiores
              </span>
            </div>
          </div>

          <p class="mt-6 text-xs text-ink/75 font-sans leading-relaxed max-w-sm">
            Atelier sediado em Lisboa dedicado ao projeto residencial e comercial, conciliando pureza estética, rigor de detalhe e excelência construtiva.
          </p>

          <div class="mt-6 flex items-center gap-3 font-mono text-[10px] text-ink/50 uppercase tracking-widest">
            <span>Matriz Lisboa</span>
            <span>&bull;</span>
            <span>Coord. 38.7223° N, 9.1393° W</span>
          </div>
        </div>

        <!-- Contacts Column -->
        <div class="md:col-span-4 border-t md:border-t-0 md:border-l border-ink/15 pt-6 md:pt-0 md:pl-8 flex flex-col justify-between">
          <div>
            <span class="text-[10px] font-mono tracking-widest uppercase text-ink/70 font-semibold block mb-3">
              Contacto Direto
            </span>
            <ul class="space-y-3 text-xs font-sans">
              <li class="flex items-start gap-2.5">
                <UIcon name="lucide:map-pin" class="w-4 h-4 text-brick flex-none mt-0.5" />
                <span class="leading-relaxed text-ink/80">
                  Rua Braamcamp, Marquês de Pombal<br>
                  1250-096 Lisboa, Portugal
                </span>
              </li>
              <li class="flex items-center gap-2.5">
                <UIcon name="lucide:phone" class="w-4 h-4 text-brick flex-none" />
                <a
                  href="tel:+351964222226"
                  class="font-mono text-ink/80 hover:text-brick transition-colors"
                >
                  +351 964 222 226
                </a>
              </li>
              <li class="flex items-center gap-2.5">
                <UIcon name="lucide:mail" class="w-4 h-4 text-brick flex-none" />
                <a
                  href="mailto:ac@ac-arquitetos.com"
                  class="text-ink/80 hover:text-brick transition-colors"
                >
                  ac@ac-arquitetos.com
                </a>
              </li>
            </ul>
          </div>

          <div class="mt-6 pt-4 border-t border-ink/15 text-[11px] font-mono text-ink/55">
            <span>Atendimento: Segunda a Sexta &bull; 09h00–18h30</span>
          </div>
        </div>

        <!-- Social Media Icons (Architectural layout) -->
        <div class="md:col-span-3 border-t md:border-t-0 md:border-l border-ink/15 pt-6 md:pt-0 md:pl-8 flex flex-col justify-between">
          <div>
            <span class="text-[10px] font-mono tracking-widest uppercase text-ink/70 font-semibold block mb-3">
              Presença Digital
            </span>
            <ul class="space-y-2.5">
              <li
                v-for="social in socialLinks"
                :key="social.name"
              >
                <a
                  :href="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group flex items-center justify-between p-2.5 border border-ink/15 hover:border-brick hover:bg-ink/[0.03] transition-all text-xs bg-paper/70 backdrop-blur-xs"
                >
                  <div class="flex items-center gap-2.5 text-ink/80 group-hover:text-ink transition-colors">
                    <UIcon :name="social.icon" class="w-4 h-4 flex-none" />
                    <span class="font-sans font-medium">{{ social.name }}</span>
                  </div>
                  <UIcon name="lucide:arrow-up-right" class="w-3.5 h-3.5 text-ink/40 group-hover:text-brick group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </li>
            </ul>
          </div>

          <div class="mt-6 pt-4 border-t border-ink/15 text-[10px] font-mono text-ink/50 uppercase">
            <span>Atelier &bull; Arquitetura</span>
          </div>
        </div>
      </div>

      <!-- Architectural Bottom Row: Policies, Copyright & Rigor note -->
      <div class="pt-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-ink/65 font-sans">
        <!-- Policies -->
        <nav class="flex flex-wrap items-center gap-6" aria-label="Políticas Legais">
          <NuxtLink
            to="/politica-de-privacidade"
            class="hover:text-brick transition-colors"
          >
            Política de Privacidade
          </NuxtLink>
          <span class="text-ink/25">/</span>
          <NuxtLink
            to="/termos-e-condicoes"
            class="hover:text-brick transition-colors"
          >
            Termos e Condições
          </NuxtLink>
          <span class="text-ink/25">/</span>
          <a
            href="https://www.livroreclamacoes.pt"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-brick transition-colors inline-flex items-center gap-1"
          >
            Livro de Reclamações
            <UIcon name="lucide:external-link" class="w-3 h-3 text-ink/40" />
          </a>
        </nav>

        <!-- Rights -->
        <div class="flex items-center gap-3 text-center md:text-right font-mono text-[11px] text-ink/50">
          <span>&copy; {{ currentYear }} AC-Arquitetos.</span>
          <span>Todos os direitos reservados.</span>
        </div>
      </div>
    </div>
  </footer>
</template>
