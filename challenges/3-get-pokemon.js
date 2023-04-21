const axios = require('axios');

function getPokemon(page) {
    const pageUrl = (page - 1) * 20;
        axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${pageUrl}&limit=20`)
            .then((data) => {
                console.log(data.data.results)
            })
            .catch((err) => console.log(err))
};

getPokemon(1)
