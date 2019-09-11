module.exports = (args) => {
    const ratings = ["safe", "questionable", "explicit"]
    if(!args.rating) return console.log("A rating argument is required. It can be used like: \"--rating safe\".")
    if(!args.rating.includes(ratings)) return console.log("Ratings either have to be safe, questionable or explicit.")
    require("./downloader,js")(args.rating, args.tags)
	/* switch(args.rating) {
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
			console.log("The rating has to be either safe, questionable or explicit.")      } */
}
