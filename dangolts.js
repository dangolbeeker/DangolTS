var fs = require('fs'),
    path = require('path'),
    rework = require('rework'),
    selectors = require('rework-mutate-selectors');

// vars
var js,
    inputjs,
    options = {},
    stats,
    token;

// process cli-options
process.argv.forEach(function(val, index, array) {
    if (~val.indexOf('=')) {
        optionKey = val.slice(0, val.indexOf('='));
        optionVal = val.slice(val.indexOf('=') + 1);
        
        options[optionKey] = optionVal;
    }
});

if (!options.input) {
    console.log("Error!  No input: You need to define a file or folder for me to process if this is going to work.")

}
// determine token from type
switch(options.type) {
    case "ts":
        token = "%";
        break;
    case "styl":
        token = "$";
        break;
}

stats = fs.statSync(options.input);
if (stats.isFile()) {
    var fileBaseName = path.basename(options.input, '.js');
    inputjs = fs.readFileSync(options.input,'utf8');
    js = rework(inputjs, options.type)
                .use(selectors.replace(/\./g, token))
                .toString();
    fs.writeFileSync("output" + fileBaseName + "." + options.type, js);
}

if (stats.isDirectory()) {
    // loop through each file individually
    var files = fs.readdirSync(options.input);
    files.forEach(function(file) {
        var fullPath = options.input + file,
            fileExtName = path.extname(file),
            fileBaseName = path.basename(file, fileExtName);

        inputjs = fs.readFileSync(fullPath,'utf8');
        js = rework(inputjs, options.type)
                    .use(selectors.replace(/\./g, token))
                    .toString();

        fs.writeFileSync("output/" + fileBaseName + "." + options.type, js);
    });
}