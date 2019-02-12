const optionDefinitions = [
  { name: "rating", type: String },
  { name: "tags", type: String, multiple: true}
]
const commandLineArgs = require('command-line-args')
const options = commandLineArgs(optionDefinitions)
require("./src/yiffbox.js")(options)