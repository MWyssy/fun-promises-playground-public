const inquirer = require('inquirer');

const question = {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
};

const goAgain = {
    type: 'list',
    name: 'goAgain',
    message: 'Would you like to have another go?',
    choices: ['Yes', 'No']
}

function askName() {
    inquirer
        .prompt(question)
        .then((answer) => {
            console.log(`Hello ${answer.name}!`)
            inquirer
            .prompt(goAgain)
            .then((wouldLike) => {
                if (wouldLike.goAgain == 'Yes') askName();
            });
        });
};

askName();