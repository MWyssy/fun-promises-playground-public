const fsPromise = require('fs/promises');
const inquirer = require('inquirer');
const axios = require('axios');

const filmChoice = {
        type: 'list',
        name: 'filmName',
        message: 'Which Star Wars film would you like to choose (I\'m refusing to acknowledge the existence of the Sequal trilogy!!)',
        choices: [
            'Film 4 - Episode 1 - The Phantom Menace',
            'Film 5 - Episode 2 - Attack of the Clones',
            'Film 6 - Episode 3 - Revenge of the Sith',
            'Film 1 - Episode 4 - A New Hope',
            'Film 2 - Episode 5 - Empire Strikes Back',
            'Film 3 - Episode 6 - Return of the Jedi',
        ]
    }

const infoType = {
        type: 'list',
        name: 'type',
        message: 'What would you like more information about?',
        choices: [
            'People',
            'Planets',
            'Starships',
            'Vehicles',
            'Species'
        ]
    }

const specificInfo = {
        type: 'list',
        name: 'type',
        message: 'What would you like more information about?',
        choices: []
    }

function runApp() {
    inquirer
        .prompt(filmChoice)
        .then((answer) => {
            const filmUrl = answer.filmName.match(/[1-6]/)[0]
            axios.get(`https://swapi.dev/api/films/${filmUrl}`)
                .then((data) => {
                    console.log(
                        '\nDirector: ', data.data.director,
                        '\nProducers: ', data.data.producer,
                        '\nRelease Date: ', data.data.release_date,
                        '\n\nOpening Crawl: \n\n', data.data.opening_crawl,
                        )
                })
                .catch((err) => {
                    throw new err;
                })
            setTimeout(() => {
                inquirer
                    .prompt(infoType)
                    .then((answer) => {
                        const typeUrl = answer.type.toLowerCase();
                        axios.get(`https://swapi.dev/api/${typeUrl}`)
                            .then((data) => {
                                data.data.results.forEach((option) => specificInfo.choices.push(option.name))
                            })
                            .catch((err) => {
                                throw new err;
                            })
                        setTimeout(() => {
                            inquirer
                                .prompt(specificInfo)
                                .then((answer) => {
                                    axios.get(`https://swapi.dev/api/${typeUrl}/${answer}`)

                                })    
                        }, 2000)    
                    })
            }, 5000)
        })
};

runApp();