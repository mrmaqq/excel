export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
  }

  select($el) {
    this.group.push($el);
    this.group.forEach(el => el.addClass(TableSelection.className));
  }

  selectGroup($elements) {
    this.group = [...this.group, ...$elements];
    this.group.forEach(el => el.addClass(TableSelection.className));
  }

  reset() {
    this.group.forEach(el => el.removeClass(TableSelection.className));
    this.group = [];
  }

  getMinPoints() {
    if (!this.group.length) return [0, 0];
    let minRowCount = Infinity;
    let minColumnCount = Infinity;

    this.group.forEach(x => {
      const dataId = x.dataset('id').split(':').map(Number);
      minRowCount = dataId[0] < minRowCount ? dataId[0] : minRowCount;
      minColumnCount = dataId[1] < minColumnCount ? dataId[1] : minColumnCount;
    });
    return [minRowCount, minColumnCount];
  }

  getMaxPoints() {
    if (!this.group.length) return [0, 0];
    let minRowCount = 0;
    let minColumnCount = 0;

    this.group.forEach(x => {
      const dataId = x.dataset('id').split(':').map(Number);
      minRowCount = dataId[0] > minRowCount ? dataId[0] : minRowCount;
      minColumnCount = dataId[1] > minColumnCount ? dataId[1] : minColumnCount;
    });
    return [minRowCount, minColumnCount];
  }
}
