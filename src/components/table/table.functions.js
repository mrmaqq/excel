export function shouldResize(e) {
  const dataResize = e.target.dataset.resize;
  return dataResize === 'column' || dataResize === 'row';
}

export function isCell(e) {
  return e.target.dataset.type === 'cell';
}

export function getStartEndPoints(_selection, endPoints) {
  const minGroupPoints = _selection.getMinPoints();
  const maxGroupPoints = _selection.getMaxPoints();

  if (minGroupPoints[0] <= endPoints[0] || minGroupPoints[1] <= endPoints[1]) {
    return {
      start: minGroupPoints,
      end: endPoints,
    };
  } else {
    return {
      start: endPoints,
      end: maxGroupPoints,
    };
  }
}
