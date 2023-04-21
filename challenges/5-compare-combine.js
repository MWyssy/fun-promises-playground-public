const fsPromise = require('fs/promises');

const readSecetMessage = fsPromise.readFile('./secret-message.txt')
    .then((data) => {
        return data.toString();
    })
    .catch((err) => {
        console.log(err)
    });

const readSuperSecretMessage = fsPromise.readFile('./super-secret-message.txt')
    .then((data) => {
        return data.toString();
    })
    .catch((err) => {
        console.log(err)
    });

Promise.all([readSecetMessage, readSuperSecretMessage])
    .then((array) => {
        if (array[0].length > array[1].length) {
            console.log(`secret-message.txt is larger, it has ${array[0].length - array[1].length} more characters in it.`);
        } else {
            console.log(`super-secret-message.txt is larger, it has ${array[1].length - array[0].length} more characters in it.`)
        };
        const combinedFiles = array[0] + array[1]
        return fsPromise.writeFile('./mega-secret-message.txt', combinedFiles);
    })
    .catch((err) => {
        console.log(err)
    })
    