# scratch-crawler

## 用来抓取scratch素材的爬虫

1. 运行app1 通过spriteLibrary.json中的数组中的 一个一个的对象获取一个一个的json文件 放到asset1目录下
2. 运行app2 通过asset1目录中的 一个一个的json文件获取一个一个的音频 放到asset2目录下
3. 运行app3 通过asset1目录中的 一个一个的json文件获取一个一个的图片 放到asset3目录下
4. 运行app4 通过backdropLibrary.json中的数组中的 一个一个的对象获取一个一个的背景图 放到asset4目录下
5. 运行app5 通过soundLibrary.json中的数组中的 一个一个的对象获取一个一个的音乐 放到asset5目录下
6. 最后把 asset1中的json文件 asset2中的音频 asset3中的图片 asset4中的背景图 asset5中的音频库 全都放到asset目录里
7. 把 asset文件夹 放到 服务器根目录（或者自己在scratch-flash/src/util/Server.as的getAsset函数中修改路径）
8. 然后就没有然后了
