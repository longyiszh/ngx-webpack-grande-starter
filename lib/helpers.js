const path = require('path');
const _root = path.resolve(__dirname, '..');

/**
 * Get absolute path from workspace folder root 
 * (i.e. usually the folder containing node_modules and package.json)
 * 
 * e.g.
 * 
 * * root('src', 'app')  --> /home/xmj/Documents/project1/src/app
 * 
 * * root('src', 'server', 'config.json')  --> C:\Users\xmj\Documents\project1\src\server\config.json
 * 
 * * root('dist', '..', 'src')  --> /Users/xmj/Documents/project1/src
 */
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

module.exports= {
  root
}