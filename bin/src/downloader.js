module.exports = async (rating, tags) => {
	const https = require("https")
	const fs = require("fs")
	const fetch = require("node-fetch")
	const writeDir = `${require('os').userInfo().homedir}\\Documents\\Yiffbox\\e621-${rating}\\${tags}`
	const mkdirp = require("mkdirp")
	mkdirp(writeDir, (err) => {
		if(err) throw err;

		fetch(`https://e621.net/post/index.json?tags=${tags.join("+")}+rating:${rating}&limit=20`, {
			headers: {
				"User-Agent": "Yiffbox 1.0"
			}
		})
		.then(res => res.json())
		.then(json => {
			const t = json[Math.floor(Math.random() * json.length)]
			download(t.file_url, `${writeDir}\\${t.id}.${t.file_ext}`)
		})
	})

	async function download(url, path) {
        const res = await fetch(url);
        let r = await fetch(url, {
        	method: "HEAD"
        })
        const fileStream = fs.createWriteStream(path);
        await new Promise((resolve, reject) => {
        	let gotten = 0
            res.body.pipe(fileStream);
            res.body.on("error", (err) => {
              reject(err);
            });
            res.body.on("data", (chunk) => {
            	gotten += chunk.length
            	dlpercent(gotten, r.headers._headers["content-length"])
            })
        	fileStream.on("finish", function() {
            	resolve();
        	});
        });
    }

    function dlpercent(gotten, size) {
	    const progress = (gotten * 100) / size;
	    console.log(progress);
	}
}