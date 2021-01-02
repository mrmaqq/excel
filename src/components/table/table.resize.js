import {$} from '../../core/dom';
import {shouldResize} from './table.functions';

export function resizeHandler(e, $root) {
  const $resizer = $(e.target);
  const data = $resizer.dataset();
  const $parent = $resizer.closest('[data-type="resize"]');
  const coords = $parent.getCoords();

  const getResizerValueName = isColumn => {
    return isColumn ? 'right' : 'bottom';
  };

  if (shouldResize(e)) {
    const isColumn = data.resize === 'column';
    const startPointName = isColumn ? 'right' : 'bottom';
    const sizeName = isColumn ? 'width' : 'height';
    const startPoint = coords[startPointName];
    const size = coords[sizeName];
    const dataCount = $parent.dataset('count');
    let value = 0;

    $resizer.style({
      [getResizerValueName(!isColumn)]: '-5000px',
    });

    $root.style({
      'user-select': 'none',
    });

    document.onmousemove = event => {
      const pageCoords = isColumn ? event.pageX : event.pageY;
      const delta = Math.floor(pageCoords - startPoint);
      value = size + delta;
      $resizer.style({[getResizerValueName(isColumn)]: `${-delta}px`});
    };

    document.onmouseup = () => {
      document.onmouseup = null;
      document.onmousemove = null;

      const elementsSelector = `
        .${isColumn ? 'cell' : 'row'}[data-count="${dataCount}"]
      `;
      const cells = $root.findAll(elementsSelector);

      $resizer.style({
        [getResizerValueName(isColumn)]: '0',
        [getResizerValueName(!isColumn)]: '0',
      });

      $parent.style({[sizeName]: `${value}px`});
      cells.forEach(el => {
        el.style({[sizeName]: `${value}px`});
      });

      $root.style({
        'user-select': 'auto',
      });
    };
  }
}
