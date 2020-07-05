const fs = require('fs');
const config = require('./config/index.js');

function addMapping(router, mapping) {
	for (let url in mapping) {
		if (url.startsWith('GET ')) {
			let path = config.prefix + url.substring(4);
			router.get(path, mapping[url]);
		} else if (url.startsWith('POST ')) {
			let path = config.prefix + url.substring(5);
			router.post(path, mapping[url]);
		} else {
			console.error(`invalid URL: ${url}`);
		}
	}
}

function addControllers(router, dir) {
  let files = fs.readdirSync(__dirname + '/' + dir);
  let js_files = [];
  for (let i in files) {
    js_files.push(`${files[i]}/index.js`);
  }

	for (let f of js_files) {
		console.log(`process controller: ${f}...`);
		let mapping = require(__dirname + '/' + dir + '/' + f);
		addMapping(router, mapping);
	}
}

module.exports = function (dir) {
	let controllers_dir = dir || 'controllers';
	let router = require('koa-router')();
	addControllers(router, controllers_dir);
	return router.routes();
};
