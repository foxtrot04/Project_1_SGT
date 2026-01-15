<template>
  <div class="fullscreen-container" ref="fullscreenContainer">

    <div class="sticky-fullscreen" ref="stickyFullscreen">

      <div class="background-layers">
        <div
          v-for="(section, index) in sections"
          :key="`bg-${section.id}`"
          :class="['background-layer', { 'is-active': activeSlideIndex === index }]"
          :style="{ backgroundImage: `url(${section.image})` }"
        ></div>
      </div>
      
      <div class="fixed-counter">
        {{ activeSlideIndex + 1 }}—{{ sections.length }}
      </div>
      
      <div class="slides-wrapper">
        <div
          v-for="(section, index) in sections"
          :key="`slide-${section.id}`"
          :class="['slide-content', { 'is-active': activeSlideIndex === index }]"
        >

          <h1 class="slide-title">{{ section.title }}</h1>
        </div>
      </div>
      
      <div class="fixed-cta">
        <button class="slide-cta">Learn More</button>
      </div>
    </div>
    
    <div class="scroll-spacer"></div>
  </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import { initEtcLogic } from '../utils/etc.js'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default {
  name: 'EtcSection',
  props: {
    sections: { type: Array, required: true }
  },
  data() {
    return {
      activeSlideIndex: 0,
      scrollTriggerInstance: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      //execute the logic
      initEtcLogic(this, this.$refs, this.$el)
    })
  },
  beforeDestroy() {
    if (this.scrollTriggerInstance) {
      this.scrollTriggerInstance.kill()
    }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';

.fullscreen-container {
  position: relative;
  height: calc(300vh * var(--section-count, 3));
}

.sticky-fullscreen {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-layers {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.background-layer {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  will-change: opacity, transform;
  transform-origin: center center;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba($color-dark, 0.5);
  }
  
  &.is-active {
    opacity: 1;
  }
}

.slides-wrapper {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  pointer-events: none;
  
  &.is-active {
    pointer-events: auto;
  }
}

.fixed-counter {
  position: absolute;
  top: 8rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  font-size: clamp(0.875rem, 2vw, 1.125rem);
  color: $color-primary;
  letter-spacing: 0.2em;
  font-weight: 300;
  font-style: italic;
  
  @media (max-width: $breakpoint-tablet) {
    top: 6rem;
    font-size: 1rem;
  }
  
  @media (max-width: $breakpoint-mobile) {
    font-size: 0.875rem;
    top: 5rem;
  }
}

.slide-title {
  font-size: clamp(6rem, 20vw, 16rem);
  font-weight: 400;
  color: $color-primary;
  font-style: italic;
  line-height: 0.9;
  margin: 0;
  will-change: transform, opacity;
  text-transform: lowercase;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: max-content;
  font-family: Georgia, 'Times New Roman', serif;
  
  @media (max-width: $breakpoint-tablet) {
    font-size: clamp(5rem, 16vw, 12rem);
  }
  
  @media (max-width: $breakpoint-mobile) {
    font-size: clamp(4rem, 14vw, 8rem);
  }
}

.fixed-cta {
  position: absolute;
  bottom: 8rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  
  @media (max-width: $breakpoint-tablet) {
    bottom: 6rem;
  }
  
  @media (max-width: $breakpoint-mobile) {
    bottom: 5rem;
  }
}

.slide-cta {
  padding: 1rem 2.5rem;
  border: 2px solid $color-primary;
  border-radius: 50px;
  color: $color-primary;
  font-size: 0.875rem;
  font-weight: 400;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: capitalize;
  font-family: inherit;
  letter-spacing: 0.05em;
  
  &:hover {
    background: $color-primary;
    color: $color-dark;
    transform: scale(1.05);
  }
  
  @media (max-width: $breakpoint-mobile) {
    padding: 0.875rem 2rem;
    font-size: 0.8125rem;
  }
}

.scroll-spacer {
  height: 1px;
  pointer-events: none;
}
</style>