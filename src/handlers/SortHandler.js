/*
 * Sort handler class for create and sort visual object
 */

import { CSSPligin, TimelineMax } from 'gsap';
import ScrollToPlugin from "gsap/ScrollToPlugin";

/* Duration time of animation steps in seconds */
const STEP_DURATION = 0.5;
/* Salt for scene item markup */
const ELS_KEY_SALT = 'item_key';

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

    /* For id items */
    let count = 0;

    /* Create and insert elements to scene */
    for (let val of this.rawData) {

      let element = this._createEl(val, ELS_KEY_SALT + count);
      setTimeout(() => {
        this.scene.appendChild(element);
        this.timeline.fromTo(element, 0.5, { autoAlpah: 0, scale: 0, right: 100 }, { autoAlpah: 1, scale: 1, right: 0 }, '-=0.4');
      }, 0);

      count++;
    }

    /* Start sort after insert childs */
    setTimeout(() => {
      this._startSort();;
    }, 0);
  }


  _startSort() {

    let sorted = this.rawData.concat([]);
    let len = sorted.length;

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1 - i; j++) {

        let scene = this.scene;
        let childs = this._sceneChilds();
        let comparedChilds = [childs[j], childs[j + 1]];

        let small = childs[j + 1],
          big = childs[j],
          elSize = this._getElSize(big);

        /* Check scene scroll */
        let sceneWidth = scene.clientWidth,
          halfScene = sceneWidth / 2;

        let scrollMaxVal = scene.scrollWidth - sceneWidth;
        let scrollPxCoeficient = scrollMaxVal / (scene.scrollWidth - elSize.w);
        let centerOfComparedPair = elSize.w * (j + 1);
        let scrollPx = centerOfComparedPair - halfScene;

        /* Higlight compared elements */
        this.timeline
          .staggerTo(comparedChilds, STEP_DURATION, { boxShadow: '0 0 5px 2px #009587' }, `-=${STEP_DURATION}`)
          .to(scene, STEP_DURATION, {
            scrollLeft: parseInt(scrollPx * scrollPxCoeficient)
          }, `-=${STEP_DURATION}`);

        /* Compare :-) */
        if (sorted[j] > sorted[j + 1]) {

          /* Swap id`s of childrens to correct higlighting */
          let temp = small.id;
          small.id = big.id;
          big.id = temp;

          /* Swap arr items */
          temp = sorted[j];
          sorted[j] = sorted[j + 1];
          sorted[j + 1] = temp;

          /* Animate swap */
          this.timeline
            .to(small, STEP_DURATION, { scale: 0.8 })
            .to(big, STEP_DURATION, { scale: 1.2, borderColor: '#ffd194', boxShadow: '0 0 5px 2px #ffd194' }, `-=${STEP_DURATION}`)
            .to(small, STEP_DURATION, { y: elSize.h / 2 })
            .to(big, STEP_DURATION, { y: -elSize.h / 2 }, `-=${STEP_DURATION}`)
            .to(small, STEP_DURATION, { x: `-=${elSize.w}` })
            .to(big, STEP_DURATION, { x: `+=${elSize.w}` }, `-=${STEP_DURATION}`)
            .to(small, STEP_DURATION, { y: 0, scale: 1 })
            .to(big, STEP_DURATION, { y: 0, scale: 1, borderColor: '#009587', boxShadow: '0 0 5px 2px #009587' }, `-=${STEP_DURATION}`);
        }

        /* Cancel higlight */
        this.timeline.staggerTo(comparedChilds, STEP_DURATION, { boxShadow: 'none' }, `-=${STEP_DURATION}`);
      }
    }

    /* Save result */
    this.result = sorted;
    /* Warn document and scroll to start*/
    this.timeline.call(() => {
        let event = new Event('VisualSortEnd');
        document.dispatchEvent(event);
      })
      .to(this.scene, STEP_DURATION, {
        scrollLeft: 0
      }, `-=${STEP_DURATION}`);

  }

  /* Create DOMNode with visual element */
  _createEl(value, id) {
    let element = document.createElement('div');
    element.className = 'scene__item';
    element.id = id;
    element.innerHTML = `<span class="scene__lbl">${value}</span>`;
    return element;
  }

  _getChildByIndex(index) {
    return document.getElementById(ELS_KEY_SALT + '' + index);
  }

  /* Return array with scene`s childs, sort by id in markup  */
  _sceneChilds() {
    let arr = Array.prototype.slice.call(this.scene.children);
    arr.sort((a, b) => {
      let aId = a.id.substr(ELS_KEY_SALT.length),
        bId = b.id.substr(ELS_KEY_SALT.length);
      return aId - bId;
    });
    return arr;
  }

  _getElSize(el) {
    let style = el.currentStyle || window.getComputedStyle(el);
    let { marginTop, marginBottom, marginLeft, marginRight } = style;
    return {
      h: el.offsetHeight + parseInt(marginTop) + parseInt(marginBottom),
      w: el.offsetWidth + parseInt(marginLeft) + parseInt(marginRight)
    };

  }
  _swapVar(a, b) {
    let temp = a;
    a = b;
    b = temp;
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