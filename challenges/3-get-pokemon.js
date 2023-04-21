const axios = require('axios');

function getSiteData(url) {
    axios.get(url)
        .then((data) => {
            console.log(data.data.results)
        })
        .catch((err) => console.log(err))
};

getSiteData('https://pokeapi.co/api/v2/pokemon')
