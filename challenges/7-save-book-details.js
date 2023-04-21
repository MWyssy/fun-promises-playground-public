const fsPromise = require('fs/promises');
const inquirer = require('inquirer');
const axios = require('axios');


const questions = [
    {
        type: 'input',
        name: 'authorName',
        message: 'Name an author',
    },
    {
        type: 'input',
        name: 'bookName',
        message: 'Name a book',
    },
];

const moreBooks = [
    {
        type: 'list',
        name: 'preference',
        message: 'Would you like to look for more books?',
        choices: ['Yes', 'No'],
    },
]





function getBookDetails() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            const book = answers.bookName.replaceAll(' ', '%20').toLowerCase()
            const author = answers.authorName.replaceAll(' ', '%20').toLowerCase()
            const bookFileName = answers.bookName.replaceAll(' ', '-')
            const authorFileName = answers.authorName.replaceAll(' ', '-')
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}+inauthor:${author}`)
                .then((data) => {
                    const bookData = data.data
                    fsPromise.writeFile(`./${authorFileName}-${bookFileName}.txt`, JSON.stringify(bookData))
                })
                .catch((err) => {
                    console.log(err)
                });
            inquirer
                .prompt(moreBooks)
                .then((moreRequested) => {
                    if (moreRequested.preference === 'Yes') {
                        getBookDetails()
                    };
                });
        });
};


getBookDetails()