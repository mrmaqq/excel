export function shouldResize(e) {
  const dataResize = e.target.dataset.resize;
  return dataResize === 'column' || dataResize === 'row';
}
