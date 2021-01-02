import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  static rootTagName = 'main';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  onMousedown(e) {
    resizeHandler(e, this.$root);
  }

  handleResizeColumn(e) {
    const data = e.target.dataset;
    const parentsWidth = e.target.parentNode.offsetWidth;
    if (data.resizing) {
      e.target.parentNode.style.width = `${parentsWidth + e.offsetX}px`;
    }
  }

  toHTML() {
    return createTable();
  }
}
