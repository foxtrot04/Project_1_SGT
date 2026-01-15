import { gsap } from 'gsap'  //import the GSAP core library

export const initHeaderLogic = (refs) => { //export a function that takes 'refs'
  const tl = gsap.timeline() //create a GSAP timeline, this allows you to chain multiple animations together
  
  if (refs.nav) {  //condition to ensure the nav element actually exists before trying to animate it
    const navItems = refs.nav.querySelectorAll('.header__nav-item')
    tl.from(navItems, {
      //start state
      opacity: 0, //invisible
      y: -20,     //positioned 20 pixels higher than normal
      duration: 0.6, //each individual item takes 0.6 seconds to move
      stagger: 0.1, //it adds a 0.1s delay between each item so they appear one after another
      ease: 'back.out(1.7)' //add affect
    })
  }
}