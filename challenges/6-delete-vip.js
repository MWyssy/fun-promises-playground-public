const fsPromise = require('fs/promises');
const inquirer = require('inquirer');

const getNames = fsPromise.readFile('./vip-list.txt')
    .then((data) => {
        return data.toString();
    })
    .catch((err) => {
        console.log(err);
    });

const question = [
    {
        type: 'list',
        name: 'name',
        message: 'Which VIP name would you like to remove?',
        choices: []
    }
];

function deleteName() {
    inquirer
        .prompt(question)
        .then((answer) => {
            const newNames = question[0].choices
                .filter((name) => name !== answer.name)
                .toString()
                .replaceAll(',', '\n');
            console.log(`${answer.name} was successfully removed from the VIP list`);
            return fsPromise.writeFile('./vip-list.txt', newNames);
        });
};

Promise.all([getNames, deleteName])
    .then((arr) => {
        const nameArr = arr[0].match(/([a-z])\w+/ig);
        nameArr.forEach((name) => question[0].choices.push(name));
        deleteName();
    });