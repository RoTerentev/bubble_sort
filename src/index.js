import startAnimation from './animations/startAnimation';
import switchControls from './animations/switchControls';
import FormHandler from './handlers/FormHandler';

/* Show start animation */
document.addEventListener('DOMContentLoaded', startAnimation);

/* Initialize handlers */
document.addEventListener('DOMContentLoaded', () => {
  let fh = new FormHandler('FormChecked');
});

document.addEventListener('FormChecked', (e) => {
  switchControls();
});