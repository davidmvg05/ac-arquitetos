import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'

export default defineNuxtPlugin((nuxtApp) => {
  gsap.registerPlugin(ScrollTrigger, Flip, SplitText)

  // Initialize smooth scroll with Lenis
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 1.8
  })

  // Synchronize Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  const tickerCallback = (time: number) => {
    lenis.raf(time * 1000)
  }

  gsap.ticker.add(tickerCallback)
  gsap.ticker.lagSmoothing(0)

  // Refresh ScrollTrigger when page finishes transitioning
  nuxtApp.hook('page:finish', () => {
    ScrollTrigger.refresh()
  })

  return {
    provide: {
      gsap,
      ScrollTrigger,
      Flip,
      SplitText,
      lenis
    }
  }
})
