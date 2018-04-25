// 通过spriteLibrary.json中的数组中的 一个一个的对象获取一个一个的json文件 放到asset1目录下
let superagent = require('superagent');
let fs = require('fs-extra');
let path = require('path');
let spritesArr = require('./spriteLibrary.json');
let async = require("async");

let concurrencyCount = 0;
let n = 0;
let fetchUrl = function (url, callback, name) {
    // delay 的值在 2000 以内，是个随机的整数
    n++;
    let delay = parseInt((Math.random() * 10000000) % 2000, 10);
    concurrencyCount++;
    console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒', '第' + n + '个');
    const req = superagent.get(url);
    req.pipe(fs.createWriteStream(path.join(__dirname, '/asset1/', name)));
    setTimeout(function () {
        concurrencyCount--;
        callback(null, name);
    }, delay);
};

async.mapLimit(spritesArr, 5, function (url, callback) {
    fetchUrl('https://cdn.assets.scratch.mit.edu/internalapi/asset/' + url.md5 + '/get/', callback, url.md5)
}, function (err) {
    if (err) {
        console.log(err);
    }
    console.log('finish');
});

