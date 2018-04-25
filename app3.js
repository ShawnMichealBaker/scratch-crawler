// 通过asset1目录中的 一个一个的json文件获取一个一个的图片 放到asset3目录下
let superagent = require('superagent');
let fs = require('fs');
let path = require('path');
let async = require('async');
let assetDir = path.join(__dirname, './asset1/');
let files = fs.readdirSync(assetDir);

let concurrencyCount = 0;
let n = 0;

let fetchUrl = function (url, callback, name) {
    // delay 的值在 2000 以内，是个随机的整数
    n++;
    let delay = parseInt((Math.random() * 10000000) % 2000, 10);
    concurrencyCount++;
    console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒', '第' + n + '个');
    const req = superagent.get(url);
    req.pipe(fs.createWriteStream(path.join(__dirname, '/asset3/', name)));
    setTimeout(function () {
        concurrencyCount--;
        callback(null, name);
    }, delay);
};

async.mapLimit(files, 5, function (val, callback) {
    let fPath = path.join(assetDir, val);
    let extName = fPath.split('.')[1];
    if (extName === 'json') {
        let sourceStr = fs.readFileSync(fPath);
        let obj = JSON.parse(sourceStr);
        if (obj.costumes) {
            obj.costumes.forEach(element => {
                let addr2 = element.baseLayerMD5;
                if (addr2) {
                    fetchUrl('https://cdn.assets.scratch.mit.edu/internalapi/asset/' + addr2 + '/get/', callback, addr2)
                }
            });
        }
    }
}, function (err) {
    if (err) {
        console.log(err);
    }
    console.log('finish');
});
