module.exports = (args) => {
	const fs = require("fs")
	switch(args.rating) {
		case "safe":
			require("./downloader.js")("safe", args.tags)
			break;
		case "explicit":
			require("./downloader.js")("explicit", args.tags)
			break;
		case "questionable":
			require("./downloader.js")("questionable", args.tags)
			break;
		default:
			console.log("The rating has to be either safe, questionable or explicit.")
	}
}