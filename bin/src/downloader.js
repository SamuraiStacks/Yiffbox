module.exports = async (rating, tags) => {
	const https = require("https")
	const fs = require("fs")
	const fetch = require("node-fetch")
	const writeDir = `${require('os').userInfo().homedir}/Documents/Yiffbox/e621-${rating}/${tags}`
	const mkdirp = require("mkdirp")
    const chalk = require("chalk")
	mkdirp(writeDir, (err) => {
		if(err) throw err;

		fetch(`https://e621.net/post/index.json?tags=${tags.replace(" ", "+")}+rating:${rating}&limit=20`, {
			headers: {
				"User-Agent": "Yiffbox 1.0"
			}
		})
		.then(res => res.json())
		.then(json => {
			const t = json[Math.floor(Math.random() * json.length)]
			download(t.file_url, `${writeDir}/${t.id}.${t.file_ext}`)
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
            	// console.log(r.headers.get('content-length'))
                drawBar(gotten, r.headers.get("content-length"))
            })
        	fileStream.on("finish", function() {
            	resolve();
        	});
        });
    }

    function drawBar(gotten, total) {
        const progress = gotten / total
        const barlength = process.stdout.columns - 60

        const fillbarlength = (progress * barlength).toFixed(0)
        const emptybarlength = barlength - fillbarlength

        const filledbar = get_bar(fillbarlength, " ", chalk.bgWhite)
        const emptybar = get_bar(emptybarlength, "=")
        const percent = `${(progress * 100).toFixed(2)}%`

        process.stdout.clearLine()
        process.stdout.cursorTo(0)
        process.stdout.write(`pg: [${filledbar}${emptybar}] | percent: ${percent}`)

        function get_bar(length, char, color = a => a) {
            let str = ""
            for(let i = 0; i < length; i++) {
                str += char;
            }
            return color(str)
        }    
    }
}
