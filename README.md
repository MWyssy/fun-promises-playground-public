# fun-promises-playground

To get used to using promises, we have put together some challenges below for you to complete. Use Node to run your code for each challenge, e.g.

```bash
node ./challenges/1-read-and-log.js
```

## Challenges

### 1. use `fs/promises` to read a file

In the file `1-read-and-log.js` require in `fs/promises` (Note: this is a module that is built into Node JS, so does **not** need to be installed separately).

Use the `fs/promises` `readFile` method to read the contents of `secret-message.txt` and log the result to the terminal.

_**Hint:** If you are getting a 'no such file' error with your readFile path, think about which directory you are inside in your terminal (i.e. where you are running the file from)._

### 2. use inquirer to ask for a name and log a greeting

You will need to install the [inquirer](https://github.com/SBoudrias/Inquirer.js#installation) npm package (`npm install inquirer`). Once installed require `inquirer` into the `2-greet.js` file.

Use `inquirer` to ask for your name when you run the file with `node`, and then log `"Hello <name>!"` to the console.

### 3. use axios to request a list of pokemon

You will need to install the [axios](https://github.com/axios/axios#example) package and require it into the `3-get-pokemon.js` file.

Use the `axios` `.get` method to make an http GET request to the `https://pokeapi.co/api/v2/pokemon` api and log the list of pokemon results from the response object.

### 4. use inquirer and axios to get a single pokemon

In `4-get-single-pokemon.js`, use `inquirer` to ask the user for a number that will represent the pokemon id, and then use axios to make a GET request to `https://pokeapi.co/api/v2/pokemon/:id` to get info about the pokemon with that id.

- log the name of the pokemon with that id
- use a single `catch` method to handle if the axios request gives back a 404 - in this case, log a user friendly error saying that the pokemon does not exist.

_**Hint**: There are currently no pokemon in the database with IDs between 899 and 10000 so you can use a number between these to test out of your catch works._

### 5. Compare & combine files

In the `5-compare-combine.js` file use the `fs/promises` `readFile` method to read the contents of `secret-message.txt` and `super-secret-message.txt` and:

- log the name of the file that contains the most characters of text and how many more characters it contains.
- combine the contents of the two files into a single new file `mega-secret-message.txt` using `fs/promises` `writeFile` method.

_**Hint:** [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) will be useful here!_

### 6. Delete VIP

In the `6-delete-vip.js` file use the `fs/promises` `readFile` method to read the contents of `vip-list.txt` and:

- use `inquirer` to ask the user which VIP they want to remove from the list
- update the file so that it no longer contains the VIP the user wanted to delete
- print to the console to tell the user which VIP was successfully deleted

_**Hint:** [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) will be useful here!_

### 7. Save song lyrics

Now we can use what we have practised so far with promises and using different libraries. Within `7-save-song-lyrics.js`:

- Use `inquirer` to ask for an artist and a song.
- Use the artist and song title to request the song lyrics using `axios` to make an http GET request to this song lyrics api (`https://api.lyrics.ovh/v1/:artist/:song`) _**Warning:** this server might take a little while to respond!_
- Save the lyrics to a `lyrics.txt` file using `fs/promises`
- Update your code to save the lyrics to a file that includes the artist name and song title, i.e. `<artist>-<songTitle>.txt`. _**Hint:** [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) will be useful here!_
- Add the option to choose between exiting or getting another song with `inquirer`. _**Hint:** You will need to consider how to make your code re-usable_

If you have got up to here... CONGRATULATIONS! Time to take a break and make a brew :).

## Extra Challenges

1. Refactor challenges 1, 2 and 3 into flexible/reusable functions.

2. Head over to the `extra-challenges/promisification.js`. There you will see a classic async callback function `readSecretFile`. Without changing this original function, you should re-use it to make a new function, `promisifiedReadSecretFile`. `promisifiedReadSecretFile` should perform the same task but instead of using the callback pattern, returns the results in a `Promise`.

Keep track of your progress by running `npm test`!

3. Update task 5 to use [a loading spinner package](https://github.com/sindresorhus/ora) to log what is happening during the execution of the code.
