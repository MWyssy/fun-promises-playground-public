const fsPromise = require('fs/promises');

fsPromise.readFile(`./secret-message.txt`)
    .then((message) => {
        console.log(message.toString())
    })
    .catch((err) => {
        console.log(err)
    });