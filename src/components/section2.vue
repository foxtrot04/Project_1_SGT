<template>
  <section class="thank-you-section" ref="section">
    <div class="container">
      <h2 class="thank-you-heading" ref="heading">
        <span 
          v-for="(word, index) in words" 
          :key="index"
          class="word"
          ref="words"
        >
          {{ word }}
        </span>
      </h2>
    </div>
  </section>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default {
  name: 'ThankYouSection',
  
  data() {
    return {
      words: ['Thank', 'you']
    }
  },
  
  beforeDestroy() {
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.id === 'thank-you-section') {
        trigger.kill()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';

.thank-you-section {
  min-height: 100vh;
  background: $color-dark;
  color: $color-primary;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.thank-you-heading {
  font-size: clamp(2.8rem, 7vw, 7rem);
  font-weight: 400;
  margin: 0;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  perspective: 1000px;
  font-style: italic;
  font-family: Georgia, 'Times New Roman', serif;
  
  @media (max-width: $breakpoint-desktop) {
    font-size: clamp(2.4rem, 6vw, 5.5rem);
  }
  
  @media (max-width: $breakpoint-tablet) {
    font-size: clamp(2rem, 5vw, 4.5rem);
    gap: 1rem;
  }
  
  @media (max-width: $breakpoint-mobile) {
    font-size: clamp(1.8rem, 4.5vw, 4rem);
    gap: 0.75rem;
  }
}
.word {
  display: inline-block;
  transform-origin: center bottom;
  transform-style: preserve-3d;
}
</style>