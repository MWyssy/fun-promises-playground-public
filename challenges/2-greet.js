const fsPromise = require('fs/promises');
const inquirer = require('inquirer');

const question = {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
};

function askName() {
    inquirer
        .prompt(question)
        .then((firstAnswers) => {
            console.log(`Hello ${firstAnswers.name}!`)
        });
};

askName();