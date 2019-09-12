module.exports = (args) => {
    const platforms = ["win32", "darwin", "linux"]
    if(!platforms.includes(require("os").platform())) return console.log("Yiffbox is only supported on Windows, MacOS and Linux.")
    const ratings = ["safe", "questionable", "explicit"]
    
    if(!args.rating) return console.log("A rating argument is required. It can be used like: \"--rating safe\".")
    if(!ratings.includes(args.rating)) return console.log("Ratings either have to be safe, questionable or explicit.")
    
    if(!args.tags) return console.log("Atleast 1 tag is required. Usage: \"--tags fluffy\"")
    
    require("./downloader.js")(args.rating, args.tags)
}
