import {ExcelComponent} from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';
  static rootTagName = 'section';

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable="true" spellcheck="false"></div>
    `;
  }

  onInput(event) {
    console.log('Formula: onInut', event);
  }
}
