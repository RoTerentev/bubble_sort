import startAnimation from './animations/startAnimation';
import switchControls from './animations/switchControls';
import FormHandler from './handlers/FormHandler';
import SortHandler from './handlers/SortHandler';
import TimelineHandler from './handlers/TimelineHandler';

/* Show start animation */
document.addEventListener('DOMContentLoaded', startAnimation);

/* Initialize handlers */
document.addEventListener('DOMContentLoaded', () => {
  let fh = new FormHandler('FormChecked');
});

document.addEventListener('FormChecked', (e) => {
  switchControls();
  let sh = new SortHandler(e.detail, document.getElementsByClassName('scene__wrapper')[0]);
  let th = new TimelineHandler(sh.getTimeline(), 'TimelineStop');

  document.addEventListener('TimelineStop', switchControls);
});