const fs = require('fs');

const file = fs.readFileSync('./fake_options.js', 'utf8');

console.log('file ', file.split('\n'))

const fileSplit = file.split('\n');

let obj = {};

let curr;
for (let i = 0; i < fileSplit.length; i++) {
  if (!fileSplit[i].match(/\\t/)) {
    curr = fileSplit[i];
    obj[curr] = [];
  }

  if (fileSplit[i].match(/\\t/)) {
    obj[curr].push(fileSplit[i].slice(2));
  }
}

fs.writeFileSync('./fake_options_2.js', JSON.stringify(obj));
console.log(obj)
