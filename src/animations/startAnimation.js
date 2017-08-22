/* Starts animation function for show markup */
import { CSSPlugin, TweenLite, TimelineLite } from 'gsap';

const startAnimation = () => {

  /* Detect needed DOMNodes */
  const head = document.querySelector('.page-header'),
    desc = document.querySelector('.desc'),
    scene = document.querySelector('.scene'),
    form = document.querySelector('.data__form');

  /* timeline for animation */
  const tl = new TimelineLite();

  tl
    .from(head, 0.5, { y: '-220%' })
    .from(desc, 0.4, { scale: 0 }, '-=0.2')
    .from(scene, 0.4, { scale: 0 })
    .from(form, 0.5, { autoAlpha: 0 });
}
export default startAnimation;