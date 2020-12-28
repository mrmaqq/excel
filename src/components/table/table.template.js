const CODES = {
  A: 65,
  Z: 90,
};

const ALLOW_COLUMNS_COUNT = 26;

function toCell(cellText) {
  return `<div class="cell" contenteditable="true">${cellText}</div>`;
}

function toColumn(columnText) {
  return `<div class="column">${columnText}</div>`;
}

function createRow(rowData, rowInfo = '') {
  return `
    <div class="row">
        <div class="row-info">${rowInfo}</div>
        <div class="row-data">
            ${rowData}
        </div>
    </div>
    `;
}

function toCharWithNum(_, index) {
  const idxPlusOne = index + 1;
  const string = index % ALLOW_COLUMNS_COUNT;
  const substring = idxPlusOne / ALLOW_COLUMNS_COUNT;
  const isNeedSubstring = substring > 1;
  const symbol = String.fromCharCode(string + CODES.A);
  const substringForFloor = idxPlusOne % ALLOW_COLUMNS_COUNT === 0
  ? substring - 1
  : substring;
  return isNeedSubstring ? symbol + Math.floor(substringForFloor) : symbol;
}


export function createTable(rowsCount = 15, columnsCount = 15) {
  const rows = [];
  const columns = new Array(columnsCount)
      .fill('')
      .map(toCharWithNum)
      .map(toColumn)
      .join('');

  rows.push(createRow(columns));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(columnsCount)
        .fill('')
        .map(toCell)
        .join('');
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
