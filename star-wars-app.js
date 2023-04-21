const fsPromise = require('fs/promises');
const inquirer = require('inquirer');
const axios = require('axios');

const whichFilm = {
    type: 'list',
    name: 'filmname',
    
}