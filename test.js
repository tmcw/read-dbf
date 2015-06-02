var test = require('tape'),
    fs = require('fs'),
    readDbf = require('./');

test('read-dbf', function(t) {
    readDbf('fixture/ne_110m_land.dbf', function(err, data) {
        t.notOk(err);
        if (process.env.UPDATE) {
            fs.writeFileSync('fixture/ne_110m_land.json', JSON.stringify(data, null, 2));
        }
        t.deepEqual(require('./fixture/ne_110m_land.json'), data);
        t.end();
    });
});
