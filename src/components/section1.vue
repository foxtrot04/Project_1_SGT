<template>
  <div class="scroll-container" ref="scrollContainer">
    <div class="sticky-section" ref="stickySection">
      
      <div class="center-line"></div>

      <div class="background-window">
        <div
          v-for="section in sections"
          :key="`bg-${section.id}`"
          class="background-image"
          ref="backgrounds"
          :style="{ backgroundImage: `url(${section.image})` }"
        >
          <div class="feathered-mask"></div>
        </div>

        <div class="icon-overlay">
          <img 
            v-for="section in sections" 
            :key="`icon-${section.id}`"
            :src="section.iconImage"
            class="zoom-icon"
            ref="icons"
          />
        </div>
      </div>
      
      <div class="container">
        <div class="text-column">
          <div
            v-for="section in sections"
            :key="`text-${section.id}`"
            class="text-content"
            ref="texts"
          >
            <h2 class="heading">{{ section.heading }}</h2>
            <p class="description">{{ section.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */

//import from the utils directory, helper function
import { initSection1Logic } from '../utils/section1.js'

//import ScrollTrigger to handle cleanup
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default {
  name: 'Section1',
  props: {
    //expects an array of objects containing heading, description, image, and icon
    sections: { type: Array, required: true }
  },
  mounted() {
    //wait for the DOM to be fully ready before starting GSAP animations
    this.$nextTick(() => {
      //run the logic from the utils directory
      initSection1Logic(this, this.$refs)
    })
  },
  beforeDestroy() {
    //stops all the GSAP triggers when leaving this page
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  }
}
</script>

<style lang="scss" scoped>
/*@use allows access to your brand variables like $color-primary */
@use '../assets/styles/variables.scss' as *;

.scroll-container {
  position: relative;
  /*total height = 200% of the screen height multiplied by the number of sections */
  height: calc(200vh * var(--section-count, 3));
}

.sticky-section {
  /*keeps the content visible on the screen while scrolling the container */
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  background: $color-dark;
  /*ensures nothing spills out of the rounded window */
  overflow: hidden;
}

.background-window {
  position: absolute;
  right: 0;
  top: 0;
  /*takes up exactly half of the screen width */
  width: 50%;
  height: 100vh;
  z-index: 1;
  overflow: hidden;
  /*radius for the edge from section 1 */
  border-top-left-radius: 60px; 
  border-bottom-left-radius: 60px;
}

.background-image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  display: none;
}

.icon-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  pointer-events: none;
}

.zoom-icon {
  position: absolute;
  width: 110px;
  height: 110px;
  /*ensures the icon isn't stretched */
  object-fit: contain;
  display: none;
}

.container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1400px;
  height: 100%;
  margin: 0 auto;
  padding: 0 4rem;
  display: flex;
  /*aligns the text column to the bottom-left */
  align-items: flex-end; 
  justify-content: flex-start;
}

.text-column {
  position: relative;
  width: 100%;
  max-width: 580px;
  height: 300px;
  /*positions the text slightly above the bottom of the screen */ 
  margin-bottom: 8vh;
}

.text-content {
  /*stack the images on top of each other */
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: none;
  text-align: left;
}

.heading {
  color: $color-primary;
  /*fluid font size: scales between 2rem and 3.5rem */
  font-size: clamp(2rem, 4.5vw, 3.5rem);
  font-weight: 400;
  line-height: 1;
  margin-bottom: 1.5rem;
  font-style: italic;
  font-family: $font-heading;
}

.description {
  /*semi-transparent version of the primary color */
  color: rgba($color-primary, 0.7);
  font-size: 1.05rem;
  line-height: 1.6;
}

.center-line {
  position: absolute;
  left: 50%;
  top: 0;
  width: 1px;
  height: 100%;
  background: rgba($color-primary, 0.1);
  z-index: 5;
}

.feathered-mask {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(
    to right,
    rgba($color-dark, 0.85) 0%,
    rgba($color-dark, 0.3) 10%,
    transparent 35%
  );
}
</style>