/* Toggle between TimelineControls and DataForm */
import { CSSPlugin, TimelineLite } from 'gsap';

const switchControls = (() => {

  /* Detect needed DOMNodes */
  const panel = document.querySelector('.panel'),
    form = document.querySelector('.data__form');

  let hidden = form,
    displayed = panel;

  /* timeline for animation */
  const tl = new TimelineLite();

  return () => {

    [displayed, hidden] = [hidden, displayed];

    if (displayed && hidden) {
      tl
        .to(displayed, 0.5, { autoAlpha: 0, display: 'none' })
        .to(hidden, 0.5, { autoAlpha: 1, display: 'block' });
    }
  };

})();
export default switchControls;