/* 
 * Form handler class
 */

const INPUT_NAME = 'data';

export default class FormHandler {

  constructor(successEventName = 'FormChecked') {
    this.submit = this.submit.bind(this);
    this.formatData = this.formatData.bind(this);

    this.eventOnSubmit = successEventName;

    /* Find form */
    this.form = document.forms[0];
    if (!!this.form) {
      this.form.onsubmit = this.submit;
      this.input = this.form[INPUT_NAME];
      this._addConstrains();
    }

  }

  submit(e = null) {
    if (e)
      e.preventDefault();

    this.formatData();
    let dataArr = [];

    /* Generate default content */
    if (this.input.value === "") {
      for (let i = 0; i <= 7; i++) {
        dataArr.push(Math.round(Math.random() * 100));
        this.input.value = dataArr.join(',');
      }
    } else {
      dataArr = this.input.value.split(' ');
    }

    /* Emit event with data array in detail */
    let custEvnt = new CustomEvent(this.eventOnSubmit, { detail: dataArr });
    document.dispatchEvent(custEvnt);
  }

  formatData() {
    let rawVal = this.input.value;
    /* Replace comma to space */
    rawVal = rawVal.replace(/,/g, ' ');

    /* Replace minus without number */
    rawVal = rawVal.replace(/-\D/g, ' ');

    /* Trim right*/
    rawVal = rawVal.replace(/\D*$/, '');

    /* Trim left*/
    rawVal = rawVal.replace(/^[^-\d]*/, '');

    /* Replace "---" or ",,,," to "-" and "," */
    let regx = /(\D)\1+/g;
    rawVal = rawVal.replace(regx, '$1');
    this.input.value = rawVal;
  }

  _addConstrains() {
    let regx = /^[\s\d-,]$/;
    /* Add constrains to input characters */
    this.input.oninput = (event) => {
      let character = event.data || '';
      if (regx.test(character)) {
        return true;
      }
      if (character != '') {
        this.input.value = this.input.value.slice(0, -1);
        return false;
      }
    };
    /* Detect paste from clipboard */
    this.input.onpaste = (event) => {
      this.formatData();
    };
  }

}