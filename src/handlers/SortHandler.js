/*
 * Sort handler class for create and sort visual object
 */

import { CSSPlugin, TweenLite, TimelineMax } from 'gsap';

/* Duration time of cursor higlighting in seconds */
const CURSOR_DURATION = 1;

export default class SortHandler {

  constructor(arr, sceneNode) {
    this.rawData = arr.map((val) => Number.parseInt(val));
    this.result = [];
    this.scene = sceneNode;
    this.timeline = new TimelineMax();

    this._init = this._init.bind(this);
    this.getTimeline = this.getTimeline.bind(this);
    this.getResult = this.getResult.bind(this);

    this._init();
  }

  _init() {
    /* Clear scene */
    setTimeout(() => {
      this.scene.innerHTML = '';
    }, 0);

    /* Create and insert elements to scene */
    for (let val of this.rawData) {
      let element = this._createEl(val);
      setTimeout(() => {
        this.scene.appendChild(element);
        this.timeline.fromTo(element, 0.5, { autoAlpah: 0, scale: 0, right: 100 }, { autoAlpah: 1, scale: 1, right: 0 }, '-=0.4');
      }, 0);
    }

    /* Start sort after insert childs */
    setTimeout(() => {
      this._startSort();;
    }, 0);
  }

  /* Create DOMNode with visual element */
  _createEl(value) {
    let element = document.createElement('div');
    element.className = 'scene__item';
    element.innerHTML = `<span class="scene__lbl">${value}</span>`;
    return element;
  }

  _startSort() {

    let sorted = this.rawData.concat([]);
    let len = sorted.length;

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1 - i; j++) {

        // /* Show compared elements in scene */
        // this._moveCursor(j, () => {
        //   /* Compare :-) */
        //   if (sorted[j] > sorted[j + 1]) {
        //     this._swap(j, () => {
        //       let temp = sorted[j];
        //       sorted[j] = sorted[j + 1];
        //       sorted[j + 1] = temp;
        //     });
        //   }
        // });

        /* Show compared elements in scene */
        this._moveCursor(j);

        /* Compare :-) */
        if (sorted[j] > sorted[j + 1]) {
          this._swap(j);
          let temp = sorted[j];
          sorted[j] = sorted[j + 1];
          sorted[j + 1] = temp;
        }

      }
    }

    this.result = sorted;

    /* Hide cursor highlight */
    this._moveCursor(false);
  }

  /* For showing compared elements */
  _moveCursor(index, callback) {

    /* Find 2 elemnts nodes on scene start from index */
    let nodes = Array.prototype.slice.call(this.scene.children, index, index + 2);

    /* Cancel higlight*/
    this.timeline.staggerTo(this.scene.children, CURSOR_DURATION, { boxShadow: 'none' })

    if (index !== false) {
      /* Higlight compared elements */
      this.timeline
        .staggerTo(nodes, CURSOR_DURATION, { boxShadow: '0 0 5px 2px #009587' }, `-=${CURSOR_DURATION}`);
    }
  }

  _scroll() {

  }

  /* Change position of el on index with next el  */
  _swap(index) {
    let small = this.scene.children[index + 1],
      big = this.scene.children[index];

    let style = small.currentStyle || window.getComputedStyle(small);
    let { marginTop, marginBottom, marginLeft, marginRight } = style;
    let elSize = {
      h: small.offsetHeight + parseInt(marginTop) + parseInt(marginBottom),
      w: small.offsetWidth + parseInt(marginLeft) + parseInt(marginRight)
    };

    let swapNodes = () => {
      TweenLite.set(small, { clearProps: 'x' });
      TweenLite.set(big, { clearProps: 'x' });
      this.scene.insertBefore(small, big);
    };

    /* Animate swap */
    this.timeline
      .to(small, CURSOR_DURATION, { y: +elSize.h })
      .to(big, CURSOR_DURATION, { x: +elSize.w })
      .to(small, CURSOR_DURATION, { x: -elSize.w })
      .to(small, CURSOR_DURATION, { y: 0 })
      .call(swapNodes);
  }

  getTimeline() {
    return this.timeline;
  }

  getResult() {
    return {
      before: this.rawData,
      after: this.result
    };
  }

}