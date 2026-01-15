<template>
  <div class="index-page" :style="cssVars">
    <Header 
      v-if="showHeader"
      :sections="sections" 
      :activeIndex="activeIndex"
      @navigate="scrollToSection"
    />
    
    <Section1 
      :sections="sections"
      :activeIndex="activeIndex"
      :currentNumber="currentNumber"
      :totalSections="sections.length"
      @navigate="scrollToSection"
      @scroll-progress="handleScrollProgress"
    />
    
    <FullscreenSlides :sections="sections" />
    
    <Section2 />
  </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import Lenis from '@studio-freight/lenis'
import Header from '../components/header.vue'
import Section1 from '../components/section1.vue'
import FullscreenSlides from '../components/etc.vue'
import Section2 from '../components/section2.vue'

export default {
  name: 'HomePage',
  
  components: {
    Header,
    Section1,
    FullscreenSlides,
    Section2
  },
  
  data() {
    return {
      activeIndex: 0,
      currentNumber: 1,
      lenis: null,
      scrollProgress: 0,
      showHeader: true,
      sections: [
        {
          id: 'plan',
          title: 'plan',
          heading: 'The sitemap of the experience',
          description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea',
          image: require('../assets/images/imgi_2_638e3f15b3ed3463ebe6038b_pexels-wendy-wei-14397945.jpg'),
          iconImage: require('../assets/images/imgi_1_638e411bd0e9dd70ed4f30e8_plan.svg'),
        },
        {
          id: 'design',
          title: 'design',
          heading: 'Time to paint the room walls',
          description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
          image: require('../assets/images/imgi_4_638e4092e9575c0f9629ae01_walls.jpg'),
          iconImage: require('../assets/images/imgi_3_638e3f259cd4ab766024d0e3_icon.svg'),
        },
        {
          id: 'build',
          title: 'build',
          heading: 'Magic happens to build it out',
          description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et.',
          image: require('../assets/images/imgi_21_638e45c467fd8f44a5687f97_pexels-cottonbro-studio-5474032-p-800.jpg'),
          iconImage: require('../assets/images/imgi_5_638e45c4ee2e7c91334d22ba_code.svg'),
        }
      ]
    }
  },
  
  computed: {
    cssVars() {
      return {
        '--section-count': this.sections.length
      }
    }
  },
  
  mounted() {
    this.initLenis()
    this.setupScrollListener()
    this.checkHeaderVisibility()
  },
  
  beforeDestroy() {
    if (this.lenis) {
      this.lenis.destroy()
    }
    window.removeEventListener('scroll', this.handleScroll)
  },
  
  methods: {
    initLenis() {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false
      })

      const raf = (time) => {
        this.lenis.raf(time)
        requestAnimationFrame(raf)
      }
      
      requestAnimationFrame(raf)
    },
    
    setupScrollListener() {
      window.addEventListener('scroll', this.handleScroll)
      this.handleScroll()
    },
    
    checkHeaderVisibility() {
      window.addEventListener('scroll', () => {
        const section1 = document.querySelector('.scroll-container')
        const fullscreenSlides = document.querySelector('.fullscreen-container')
        
        if (!section1 || !fullscreenSlides) return
        
        const section1Bottom = section1.offsetTop + section1.offsetHeight
        const scrollY = window.pageYOffset
        
        // Hide header when we've scrolled past Section 1
        this.showHeader = scrollY < section1Bottom
      })
    },
    
    handleScroll() {
      const container = document.querySelector('.scroll-container')
      if (!container) return
      
      const scrollTop = window.pageYOffset
      const containerTop = container.offsetTop
      const containerHeight = container.offsetHeight
      const windowHeight = window.innerHeight
      
      // Calculate which section should be active
      const scrollProgress = (scrollTop - containerTop) / (containerHeight - windowHeight)
      const sectionProgress = scrollProgress * this.sections.length
      const newIndex = Math.min(Math.max(Math.floor(sectionProgress), 0), this.sections.length - 1)
      
      if (newIndex !== this.activeIndex) {
        this.activeIndex = newIndex
        this.currentNumber = newIndex + 1
      }
    },
    
    handleScrollProgress(progress) {
      this.scrollProgress = progress
    },
    
    scrollToSection(index) {
      const container = document.querySelector('.scroll-container')
      if (!container) return
      
      const containerTop = container.offsetTop
      const windowHeight = window.innerHeight
      const containerHeight = container.offsetHeight
      
      // Calculate scroll position for the section
      const scrollTarget = containerTop + (index / this.sections.length) * (containerHeight - windowHeight)
      
      if (this.lenis) {
        this.lenis.scrollTo(scrollTarget, {
          duration: 1.5,
          easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        })
      } else {
        // Fallback if Lenis isn't available
        window.scrollTo({
          top: scrollTarget,
          behavior: 'smooth'
        })
      }
      
      // Update immediately
      this.activeIndex = index
      this.currentNumber = index + 1
    }
  }
}
</script>

<style lang="scss" scoped>
.index-page {
  position: relative;
}
</style>