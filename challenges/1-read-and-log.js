const fsPromise = require('fs/promises');

function readAndLog(file) {
    fsPromise.readFile(`./${file}`)
        .then((message) => {
            console.log(message.toString())
        })
        .catch((err) => {
            console.log(err)
        });
};

readAndLog('./details.txt');