# weblib-node
Use a library for web with node using jsdom
## Install
```
npm i weblib-node
```
## Example
```js
const weblib = require('weblib-node');

webllib.loadLib('https://example.com/lib.js');
const { Lib } = weblib.getWindow();
```
