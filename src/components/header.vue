<template>
  <header class="header" ref="header">
    <div class="container">
      <div class="header__content">

        <nav class="header__nav" ref="nav">
          <button
            v-for="(section, index) in sections"
            :key="section.id"
            :class="['header__nav-item', { 'is-active': activeIndex === index }]"
            @click="$emit('navigate', index)"
          >
            {{ section.title }}
          </button>
        </nav>
        
        <div class="header__counter">
          <span class="counter-current">{{ activeIndex + 1 }}</span>
          <span class="counter-separator">/</span>
          <span class="counter-total">{{ sections.length }}</span>
        </div>
        
        <button 
          class="header__mobile-toggle" 
          :class="{ 'is-open': mobileMenuOpen }"
          @click="toggleMobileMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
      <transition name="mobile-menu">
        <div v-if="mobileMenuOpen" class="header__mobile-menu">
          <button
            v-for="(section, index) in sections"
            :key="`mobile-${section.id}`"
            :class="['header__mobile-item', { 'is-active': activeIndex === index }]"
            @click="handleMobileNav(index)"
          >
            {{ section.title }}
          </button>
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */

//importing the GSAP animation logic from our .js file in the utils
import { initHeaderLogic } from '../utils/header.js'

export default {
  name: 'SiteHeader',
  
  props: {
    //type array passed from App.vue that contains section titles and IDs
    sections: {
      type: Array,
      required: true
    },
    //index of the scroll, so from 0, 1, 2, etc
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  
  data() {
    return {
      //to track if the mobile dropdown is currently visible
      mobileMenuOpen: false
    }
  },
  
  mounted() {
    // this triggers the animation once the component loads
    initHeaderLogic(this.$refs)
  },
  
  methods: {
    //reverse boolean value
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    
    handleMobileNav(index) {  //executes navigation and resets menu state
      this.$emit('navigate', index) //send index to the parent
      this.mobileMenuOpen = false //closes the menu and not block the screen
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';

.header {
  /* The header fixed at the top left position of the screen */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* stays at the top of all other elements */
  background: transparent;  /* semi see through background, which is for the font */
  pointer-events: none;
  

  /* align the items in a row with space between, used for the plan, design and build */
  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 0;
  }
  
  /* enabling the clicks so nav button works */
  &__nav {
    display: flex;
    gap: 1rem;
    pointer-events: auto;
    
    @media (max-width: $breakpoint-tablet) {
      display: none;
    }
  }
  
  &__nav-item {
    position: relative;
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    text-transform: lowercase;
    letter-spacing: 0;
    color: rgba($color-light, 0.3);
    transition: color $transition-fast;
    font-weight: 600;
    font-style: italic;
    line-height: 1;
    
    &:hover {
      color: rgba($color-light, 0.6);
    }
    
    &.is-active {
      color: $color-primary;
    }
  }
  
  &__counter {
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
    font-style: italic;
    pointer-events: auto;
    
    @media (max-width: $breakpoint-tablet) {
      display: none;
    }
  }
  
  .counter-current {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    color: $color-primary;
    line-height: 1;
  }
  
  .counter-separator {
    font-size: clamp(1.5rem, 3vw, 2rem);
    color: rgba($color-light, 0.3);
  }
  
  .counter-total {
    font-size: clamp(1.5rem, 3vw, 2rem);
    color: rgba($color-light, 0.3);
  }
  
  &__mobile-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    padding: 8px;
    
    @media (max-width: $breakpoint-tablet) {
      display: flex;
    }
    
    span {
      width: 25px;
      height: 2px;
      background: $color-primary;
      transition: all $transition-fast;
      transform-origin: center;
    }
    
    &.is-open {
      span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }
      
      span:nth-child(2) {
        opacity: 0;
        transform: scaleX(0);
      }
      
      span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }
    }
  }
  
  &__mobile-menu {
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    gap: 1rem;
    
    @media (min-width: $breakpoint-tablet) {
      display: none;
    }
  }
  
  &__mobile-item {
    font-size: 1rem;
    text-transform: lowercase;
    letter-spacing: 0.05em;
    color: $color-light;
    padding: 0.75rem 0;
    text-align: left;
    transition: all $transition-fast;
    position: relative;
    padding-left: 1rem;
    font-style: italic;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 2px;
      background: $color-primary;
      transition: width $transition-fast;
    }
    
    &:hover,
    &.is-active {
      color: $color-primary;
      padding-left: 1.5rem;
      
      &::before {
        width: 20px;
      }
    }
  }
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all $transition-fast;
}

.mobile-menu-enter,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>