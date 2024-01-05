import * as XLSX from 'xlsx/xlsx.mjs';

function autoWidthFn(ws, data) {
  /* set worksheet max width per col */
  const colWidth = data.map(row =>
    row.map(val => {
      /* if null/undefined */
      if (val == null) {
        return { wch: 10 };
      }
      /* if chinese */
      if (val.toString().charCodeAt(0) > 255) {
        return { wch: val.toString().length * 2 };
      }
      return { wch: val.toString().length };
    })
  );
  /* start in the first row */
  const result = colWidth[0];
  for (let i = 1; i < colWidth.length; i++) {
    for (let j = 0; j < colWidth[i].length; j++) {
      if (result[j].wch < colWidth[i][j].wch) {
        result[j].wch = colWidth[i][j].wch;
      }
    }
  }
  ws['!cols'] = result;
}

function jsonToArray(key, jsonData) {
  return jsonData.map(v =>
    key.map(j => {
      return v[j];
    })
  );
}

// fix data,return string
/* function fixdata(data) {
  let o = '';
  let l = 0;
  const w = 10240;
  for (; l < data.byteLength / w; ++l)
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
  return o;
} */

// get head from excel file,return array
function getHeaderRow(sheet) {
  const headers: string[] = [];
  const range = XLSX.utils.decode_range(sheet['!ref']);
  let C;
  const R = range.s.r; /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]; /* find the cell in the first row */
    let hdr = `UNKNOWN ${C}`; // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
    headers.push(hdr);
  }
  return headers;
}

export const exportTableToExcel = (id, filename) => {
  const table = document.getElementById(id);
  const wb = XLSX.utils.table_to_book(table);
  XLSX.writeFile(wb, filename);
};

export const exportJsonToExcel = ({ data, key, title, filename, autoWidth }) => {
  const wb = XLSX.utils.book_new();
  data.unshift(title);
  const ws = XLSX.utils.json_to_sheet(data, { header: key, skipHeader: true });
  if (autoWidth) {
    const arr = jsonToArray(key, data);
    autoWidthFn(ws, arr);
  }
  XLSX.utils.book_append_sheet(wb, ws, filename);
  XLSX.writeFile(wb, `${filename}.xlsx`);
  // XLSX.writeFile(wb, `${filename}.xlsx`, {}, callback);
};

export const exportArrayToExcel = ({ key, data, title, filename, autoWidth }) => {
  const wb = XLSX.utils.book_new();
  const arr = jsonToArray(key, data);
  arr.unshift(title);
  const ws = XLSX.utils.aoa_to_sheet(arr);
  if (autoWidth) {
    autoWidthFn(ws, arr);
  }
  XLSX.utils.book_append_sheet(wb, ws, filename);
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

export const read = (data, type) => {
  const workbook = XLSX.read(data, { type });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const header = getHeaderRow(worksheet);
  const results = XLSX.utils.sheet_to_json(worksheet);
  return { header, results };
};

export default {
  exportTableToExcel,
  exportArrayToExcel,
  exportJsonToExcel,
  read
};
