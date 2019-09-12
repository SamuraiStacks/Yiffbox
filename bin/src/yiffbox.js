module.exports = (args) => {
    const ratings = ["safe", "questionable", "explicit"]

    if(!args.rating) return console.log("A rating argument is required. It can be used like: \"--rating safe\".")
    if(!args.rating.includes(ratings)) return console.log("Ratings either have to be safe, questionable or explicit.")
    
    if(!args.tags) return console.log("Atleast 1 tag is required. Usage: \"--tags fluffy\"")
    
    require("./downloader,js")(args.rating, args.tags)
}
