// 通过backdropLibrary.json中的数组中的 一个一个的对象获取一个一个的背景图 放到asset4目录下
var superagent = require('superagent');
var fs = require('fs-extra');
var path = require('path');
var spritesArr = require('./backdropLibrary.json');

spritesArr.forEach(element => {
    var addr2 = element.md5;
    addr3 = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/' + addr2 + '/get/';
    console.log(addr3);
    var req = superagent.get(addr3);
    req.pipe(fs.createWriteStream(path.join(__dirname, 'asset4', addr2)));
});
