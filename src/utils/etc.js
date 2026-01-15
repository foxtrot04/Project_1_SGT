import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger) //using ScrollTrigger plugin

//context: the component instance
//refs: the HTML elements marked with 'ref' in Vue
//el: actual main DOM element of the component
export const initEtcLogic = (context, refs, el) => { 

  //intialises the container and layers from the DOM
  const container = refs.fullscreenContainer
  const slides = el.querySelectorAll('.slide-content')
  const backgrounds = el.querySelectorAll('.background-layer')
  const ctaWrapper = refs.ctaWrapper

  backgrounds.forEach((bg, i) => { //prepare background layers
    gsap.set(bg, {
      //only the first image starts visible
      opacity: i === 0 ? 1 : 0,

      //scales the image in a small size
      scale: 0.3
    })
  })

  //text inlines
  slides.forEach((slide) => {
    const title = slide.querySelector('.slide-title')
    gsap.set(title, { 
      opacity: 0, //stay hidden by default
      //position below the center and smaller in size
      transform: 'translate(-50%, calc(-50% + 150px)) scale(0.85)'
    })
  })

  // loop through each section data to create individual scroll boundaries
  context.sections.forEach((section, index) => {
    const start = (index / context.sections.length) * 100
    const end = ((index + 1) / context.sections.length) * 100
    
    //create actual trigger that tracks the scrollbar
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',  //start tracking when top of container hits top of screen
      end: 'bottom bottom', //stop tracking when bottom hits bottom
      scrub: 1, //smoothly links animation to scroll
      onUpdate: (self) => {
        //self.progress is a number from 0 to 1 representing the total scroll
        const totalProgress = self.progress * 100
        
        //condition to check is the user currently scrolling inside this specific range
        if (totalProgress >= start && totalProgress < end) {

          //calculate progress within this section 0 to 1
          const sectionProgress = (totalProgress - start) / (end - start)
          

          //logic to update the active index if it changes
          if (context.activeSlideIndex !== index) {
            context.activeSlideIndex = index
            
            //fade the current section's counter in, others out
            const counters = el.querySelectorAll('.slide-counter')
            counters.forEach((counter, i) => {
              gsap.to(counter, {
                opacity: i === index ? 1 : 0,
                duration: 0.3
              })
            })
          }
          

          //scale grows from 0.3 (starting) to 1.0 (full size) as you scroll
          const scale = 0.3 + (sectionProgress * 0.7)
          gsap.to(backgrounds[index], {
            scale: scale,
            opacity: 1,
            duration: 0.1,
            ease: 'none' //'none' ensures it follows user's scroll gesture
          })
          
          if (index > 0) {
            gsap.to(backgrounds[index - 1], {
              //becomes transparent quickly as you move into the new section
              opacity: Math.max(0, 1 - sectionProgress * 2),
              duration: 0.1,
              ease: 'none'
            })
          }
          
          const counter = slides[index].querySelector('.slide-counter')
          const title = slides[index].querySelector('.slide-title')
          const contentOpacity = sectionProgress > 0.3 ? 1 : 0  //wait until we are 30% through the section before showing text
          
          //slide counter up from 80px to 0px
          const counterY = Math.max(0, 80 * (1 - sectionProgress * 1.5))
          gsap.to(counter, {
            opacity: contentOpacity,
            y: counterY,
            duration: 0.05,
            ease: 'none'
          })
          
          //slide title up from 150px to 0px and scale from 0.85 to 1.0
          const titleY = Math.max(0, 150 * (1 - sectionProgress * 1.5))
          const titleScale = 0.85 + (Math.min(1, sectionProgress * 1.5) * 0.15)
          
          gsap.to(title, {
            opacity: contentOpacity,
            transform: `translate(-50%, calc(-50% + ${titleY}px)) scale(${titleScale})`,
            duration: 0.05,
            ease: 'none'
          })
          
          //for the button
          if (ctaWrapper) {
            //only show button in the second half of the section scroll
            const ctaOpacity = Math.max(0, Math.min(1, (sectionProgress - 0.5) * 2))
            gsap.to(ctaWrapper, {
              opacity: ctaOpacity,
              duration: 0.05,
              ease: 'none'
            })
          }
          
          if (index > 0) {
            const oldSlide = slides[index - 1]
            const fadeOut = sectionProgress > 0.3 ? 0 : 1
            const oldY = -150 * Math.min(1, sectionProgress * 1.5)
            
            gsap.to(oldSlide.querySelector('.slide-counter'), {
              opacity: fadeOut,
              y: oldY,
              duration: 0.05,
              ease: 'none'
            })
            
            gsap.to(oldSlide.querySelector('.slide-title'), {
              opacity: fadeOut,
              transform: `translate(-50%, calc(-50% + ${oldY}px))`,
              duration: 0.05,
              ease: 'none'
            })
          }
        }
      }
    })
    
    //store the trigger in the Vue component so we can clean later
    context.scrollTriggerInstance = trigger
  })
}