import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {TableSelection} from './TableSelection';
import {isCell} from './table.functions';
import {selectHandler} from './table.select';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  static rootTagName = 'main';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const firstCell = this.$root.find('[data-id="0:0"]');
    this.selection.select(firstCell);
  }

  onMousedown(e) {
    console.log('e', e);
    resizeHandler(e, this.$root);
    if (isCell(e)) {
      selectHandler(e, this.selection, this.$root);
    }
  }

  toHTML() {
    return createTable();
  }
}
