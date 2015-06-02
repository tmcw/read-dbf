var dbf = require('shapefile/dbf');

module.exports = function(filename, opts, callback) {
  var options = {};
  if (!callback) {
      callback = opts;
  } else {
      options = opts;
  }
  var reader = dbf.reader(filename);
  function join(header, val) {
      var obj = {};
      for (var i = 0; i < val.length; i++) {
          obj[header.fields[i].name] = val[i];
      }
      return obj;
  }
  reader.readHeader(function(error, header) {
    if (error) return callback(error);
    if (options.lowercase) {
        header.fields.forEach(function(field) {
            field.name = field.name.toLowerCase();
        });
    }
    var rows = [];
    function readAllRecords() {
      (function readRecord() {
        reader.readRecord(function(error, record) {
          if (error) return callback(error);
          if (record === dbf.end) {
            reader.close(function(error) {
              if (error) return callback(error);
              callback(null, rows);
            });
            return;
          }
          rows.push(join(header, record));
          process.nextTick(readRecord);
        });
      })();
    }
    readAllRecords();
  });
};
