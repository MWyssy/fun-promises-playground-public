const fsPromise = require('fs/promises');
const Spinner = require('cli-spinner').Spinner;

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
        const spinner = new Spinner('reading and merging files.. %s');
        spinner.setSpinnerString('|/-\\');
        spinner.start();
        if (array[0].length > array[1].length) {
            console.log(`secret-message.txt is larger, it has ${array[0].length - array[1].length} more characters in it.`);
        } else {
            console.log(`super-secret-message.txt is larger, it has ${array[1].length - array[0].length} more characters in it.`)
        };
        const combinedFiles = array[0] + array[1]
        fsPromise.writeFile('./mega-secret-message.txt', combinedFiles);
        setTimeout(() => {
            console.log('merge complete!')
            return spinner.stop(true);
        }, 2000)
    })
    .catch((err) => {
        console.log(err)
    })
    