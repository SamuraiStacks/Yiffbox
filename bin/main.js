#! /usr/bin/env node
const args = process.argv.slice(2).join(" ").split("--").slice(1).map(t => t.trim().split(" "))
let options = {}
for(let i = 0; i < args.length; i++) {
    options[args[i][0]] = args[i][1]

    if(args[i].length > 2) {
        options[args[i][0]] = args[i].slice(1).join(" ")
    }
}
require("./src/yiffbox.js")(options)
