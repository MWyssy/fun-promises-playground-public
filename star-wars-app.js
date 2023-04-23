const fsPromise = require('fs/promises');
const inquirer = require('inquirer');
const axios = require('axios');
const Spinner = require('cli-spinner').Spinner;

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
            'Characters',
            'Planets',
            'Starships',
            'Vehicles',
            'Species'
        ]
    }

const specificInfo = {
        type: 'list',
        name: 'specificItem',
        message: 'What would you like more information about?',
        choices: []
    }

const goAgain = {
    type: 'list',
    name: 'wouldLike',
    message: 'Would you like information about anythign else?',
    choices: ['Yes', 'No']
}

function runApp() {
    inquirer
        .prompt(filmChoice)
        .then((answerOne) => {
            const spinner = new Spinner('finding film info...');
            spinner.setSpinnerString('|/-\\');
            spinner.start();
            const filmUrl = answerOne.filmName.match(/[1-6]/)[0];
            const urlStore = {};
            axios.get(`https://swapi.dev/api/films/${filmUrl}`)
                .then((filmData) => {
                    console.log(
                        '\nDirector: ', filmData.data.director,
                        '\nProducers: ', filmData.data.producer,
                        '\nRelease Date: ', filmData.data.release_date,
                        '\n\nOpening Crawl: \n\n', filmData.data.opening_crawl,
                        )
                        spinner.stop()
                    })
                    .catch((err) => {
                        throw new err;
                    })
                    setTimeout(() => {
                        inquirer
                        .prompt(infoType)
                        .then((answerTwo) => {
                        const spinner = new Spinner(`'finding the ${answerTwo.type}...`);
                        spinner.setSpinnerString('|/-\\');
                        spinner.start();
                        const subcat = answerTwo.type.toLowerCase()
                        axios.get(`https://swapi.dev/api/films/${filmUrl}`)
                            .then((filmData) => {
                                let subcatSearch = subcat;
                                if (subcatSearch === 'characters') subcatSearch = 'people';
                                filmData.data[subcat].forEach((option) => {
                                    const optionNum = option.match(/[0-9]+/)[0];
                                    axios.get(`https://swapi.dev/api/${subcatSearch}/${optionNum}`)
                                    .then((subcatData) => {
                                        specificInfo.choices.push(subcatData.data.name);
                                        urlStore[subcatData.data.name] = `https://swapi.dev/api/${subcatSearch}/${optionNum}`;
                                    })
                                })
                                spinner.stop()
                            })
                            .catch((err) => {
                                throw new err;
                            })
                            setTimeout(() => {
                                inquirer
                                .prompt(specificInfo)
                                .then((answerThree) => {
                                    const specificInfoUrl = urlStore[answerThree.specificItem]
                                    axios.get(specificInfoUrl)
                                    .then((soecificItemData) => {
                                        console.log(soecificItemData.data)
                                    })
                                    .catch((err) => {
                                        throw new err
                                    });
                                    setTimeout(() => {
                                        inquirer
                                        .prompt(goAgain)
                                        .then((answer) => {
                                            if (answer.wouldLike === 'Yes') runApp();
                                        });
                                    }, 2000)
                                });
                        }, 2000); 
                    });
            }, 5000);
        });
};

runApp();