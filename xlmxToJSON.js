var XLSX = require("xlsx");
const fs = require("fs");

let xName = "TableColumnsList";
var workbook = XLSX.readFile(`${xName}.xlsx`);
var sheet_name_list = workbook.SheetNames;

let data = [];

sheet_name_list.forEach(function (y) {
  var worksheet = workbook.Sheets[y];
  var headers = {};

  for (z in worksheet) {
    if (z[0] === "!") continue;
    //parse out the column, row, and value
    var tt = 0;
    for (var i = 0; i < z.length; i++) {
      if (!isNaN(z[i])) {
        tt = i;
        break;
      }
    }
    var col = z.substring(0, tt);
    var row = parseInt(z.substring(tt));
    var value = worksheet[z].v;

    //store header names
    if (row == 1 && value) {
      headers[col] = value;
      continue;
    }

    if (!data[row]) data[row] = {};
    data[row][headers[col]] = value;
  }
  //drop those first two rows which are empty
  data.shift();
  data.shift();
  console.log(data);
});

fs.writeFile(`xlsx-JSON/${xName}.json`, JSON.stringify(data), (err) => {
  if (err) {
    console.log(err);
  }
});
