const htmlReplace = require('./html');
const classReplace = require('./className');

let boutiqueReplace = [
  ...classReplace.className,
  ...htmlReplace.html,
];

module.exports = {
  allReplace: [...boutiqueReplace]
}
