const path = require('path');
const aliasList = ['components', 'containers', 'flux'];

const srcPath = p => path.join(__dirname, 'src', p);
const aliasData = aliasList.reduce((acc, cur) => {
  acc[`#${cur}`] = srcPath(cur);
  return acc;
}, {});

console.log(aliasData);
