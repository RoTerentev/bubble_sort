/* 
 * Timeline handler class connect Grensock Timeline with controls elements on page
 */

export default class TimelineHandler {

  constructor(timelineInstance, stopEventName = 'TimelineStop') {
    this._init = this._init.bind(this);

    this.timeline = timelineInstance;
    this.eventOnStop = stopEventName;
    this.played = true;

    this._init();
  }

  /* Find controls on page and set handlers by click */
  _init() {
    let btnPp = document.getElementById('pp'),
      btnSlowly = document.getElementById('slowly'),
      btnStop = document.getElementById('stop'),
      btnFaster = document.getElementById('faster');

    /* Play / Pause btn*/
    btnPp.onclick = () => {
      if (this.played) {
        this.pause();
        btnPp.innerText = 'далее';
      } else {
        this.play();
        btnPp.innerText = 'пауза';
      }
    }

    btnStop.onclick = () => this.stop();
    btnSlowly.onclick = () => this.slowly();
    btnFaster.onclick = () => this.faster();
  }

  play() {
    this.timeline.play();
    this.played = true;
    this.timeline.timeScale(1);
  }

  pause() {
    this.timeline.pause();
    this.played = false;
    this.timeline.timeScale(1);
  }

  /* Reset animation */
  stop() {
    this.timeline.stop();

    /* Emit this event  */
    let event = new Event(this.eventOnStop);
    document.dispatchEvent(event);
  }

  /* Speed down animation duration */
  slowly() {
    this._setTimeScale(0.75);
  }

  /* Speed up animation duration */
  faster() {
    this._setTimeScale(1.25);
  }
  _setTimeScale(scale) {
    let newScale = this.timeline.timeScale() * scale;
    this.timeline.timeScale(newScale);
  }

}