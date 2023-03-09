const Stock = require("./allStock.json");
const fs = require("fs");

console.log("-------start make~~~~~~~~~~~~");

function toLower(d, s) {
  let o = s;
  let l = s.toLowerCase();
  d[l] = d[o];
  delete d[o];
}

function changeName(d, o, n) {
  d[n] = d[o];
  delete d[o];
}
function change(d, o, n) {
  d[n] = d[o];
}

Stock.map((s) => {
  delete s["Last Sale"];
  delete s["Net Change"];
  delete s["% Change"];
  delete s["Market Cap"];
  delete s["Volume"];

  toLower(s, "Symbol");
  toLower(s, "Name");
  // toLower(s, "Country");
  // changeName(s, "IPO Year", "ipoYear");
  // toLower(s, "Sector");
  // toLower(s, "Industry");

  delete s["Country"];
  delete s["IPO Year"];
  delete s["Sector"];
  delete s["Industry"];
});

console.log(Stock[0]);

let data = JSON.stringify(Stock);

fs.writeFile("new/simpleStockList.json", data, function (err) {
  if (err) {
    console.log(err);
  }
});
