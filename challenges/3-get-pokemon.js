const axios = require('axios');

function getPokemon(page) {
    const pageUrl = page * 10
    if (page < 2) {
        axios.get(`https://pokeapi.co/api/v2/pokemon`)
        .then((data) => {
            console.log(data.data.results)
        })
        .catch((err) => console.log(err))
    } else {
        axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${pageUrl}&limit=20`)
            .then((data) => {
                console.log(data.data.results)
            })
            .catch((err) => console.log(err))
    }
};

getPokemon(3)
