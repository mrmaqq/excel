import {$} from '../../core/dom';
import {getStartEndPoints} from './table.functions';

export function selectHandler(e, selection, root) {
  const $el = $(e.target);

  if (e.shiftKey) {
    selectGroupHandler(e, selection, root);
  } else {
    selection.reset();
    selection.select($el);
  }
}

function selectGroupHandler(e, selection, root = null) {
  if (!root) throw new Error('Root argument is not defined in table.select.js');
  const currentItemId = e.target.dataset.id;
  const currentPoints = currentItemId.split(':').map(Number);

  const points = getStartEndPoints(selection, currentPoints);

  const selectedItems = [];

  for (let i = points.start[0]; i <= points.end[0]; i++) {
    for (let j = points.start[1]; j <= points.end[1]; j++) {
      const item = root.find(`[data-type="cell"][data-id="${i}:${j}"]`);
      console.log(`data-id="${i}:${j}"`);
      selectedItems.push(item);
    }
  }
  selection.selectGroup(selectedItems);
}
