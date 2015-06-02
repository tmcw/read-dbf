# read-dbf

Simpler interface for dbf reading. Use [mbostock/shapefile](https://github.com/mbostock/shapefile)
if you want streaming: this is a non-streaming wrapper on top of it.

`readDbf(filename, options, callback)`

options.lowercase = lowercase all headers

```js
var readDbf = require('read-dbf');

readDbf('foo.dbf', function(err, res) {
    // res is an array of objects
})
```
