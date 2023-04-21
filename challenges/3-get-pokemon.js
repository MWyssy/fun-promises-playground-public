const fsPromise = require('fs/promises');
const axios = require('axios');

axios.get('https://pokeapi.co/api/v2/pokemon')
    .then((data) => {
        console.log(data.data.results)
    })
