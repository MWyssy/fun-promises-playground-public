const axios = require('axios');
const inquirer = require('inquirer');

const question = [
    {
        type: 'input',
        name: 'id',
        message: 'Please type the ID number of the pokemon you wish to get',
        default: '1'
    }
]

const getPokemon = (id) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((data) => {
        console.log(data.data.name)
    })
    .catch((err) => {
        console.log("I'm sorry, this pokemon does not exist")
    })
};

function getID() {
    inquirer
        .prompt(question)
        .then((firstAnswers) => {
            getPokemon(firstAnswers.id)
        })
};

getID()


