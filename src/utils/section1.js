import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger) //register the ScrollTrigger plugin to link animations to the scrollbar


//context: the Vue component data/props
//refs: the HTML elements from the Vue template
export const initSection1Logic = (context, refs) => {
  const texts = refs.texts
  const backgrounds = refs.backgrounds
  const icons = refs.icons
  const container = refs.scrollContainer

  //if any main element is missing, stop the function to prevent errors
  if (!texts || !backgrounds || !icons || !container) return

  //timeline that is tied to the scroll progress
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container, //the long 200vh-per-section container
      start: 'top top', //start when the top of container hits the top of the screen
      end: 'bottom bottom', //end when the bottom of container hits the bottom of the screen
      scrub: true, //makes animation follow the scroll exactly
    }
  })

  //hide all images, icons, and text blocks initially
  gsap.set([backgrounds, icons, texts], { display: 'none' })

  //show only the first set (index 0) so the user sees content immediately
  gsap.set([backgrounds[0], icons[0], texts[0]], { display: 'block' })
  
  //start backgrounds slightly zoomed in
  gsap.set(backgrounds, { scale: 1.2 }) 

  //start icons at their normal size
  gsap.set(icons, { scale: 1 })

  context.sections.forEach((_, i) => {
    //zoom the background out slightly
    tl.to(backgrounds[i], { scale: 1.1, ease: "none", duration: 1 }, i)
    //zoom the icon IN
    tl.to(icons[i], { scale: 1.8, ease: "none", duration: 1 }, i)
    
    if (i < context.sections.length - 1) {
      const nextIndex = i + 1
      
      //hide the current section elements
      tl.set([backgrounds[i], icons[i], texts[i]], { display: 'none' }, i + 1)

      //the next section elements immediately
      tl.set([backgrounds[nextIndex], icons[nextIndex], texts[nextIndex]], { display: 'block' }, i + 1)
      
      //reset the zoom levels for the new background and icon so they can start their own animation
      tl.set(backgrounds[nextIndex], { scale: 1.2 }, i + 1)
      tl.set(icons[nextIndex], { scale: 1 }, i + 1)
    }
  })
}