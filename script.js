
let guess1 = [];
let guess2 = [];
let guess3 = [];
let guess4 = [];
let guess5 = [];
let guess6 = [];

const guesses = [guess1,guess2,guess3,guess4,guess5,guess6];


const row1 = document.querySelector('#row-1');
const row2 = document.querySelector('#row-2');
const row3 = document.querySelector('#row-3');
const row4 = document.querySelector('#row-4');
const row5 = document.querySelector('#row-5');
const row6 = document.querySelector('#row-6');

const space1 = row1.firstElementChild;
const space2 = space1.nextElementSibling;
const space3 = space2.nextElementSibling;
const space4 = space3.nextElementSibling;
const space5 = space4.nextElementSibling;

const space6 = row2.firstElementChild;
const space7 = space6.nextElementSibling;
const space8 = space7.nextElementSibling;
const space9 = space8.nextElementSibling;
const space10 = space9.nextElementSibling;

const space11 = row3.firstElementChild;
const space12 = space11.nextElementSibling;
const space13 = space12.nextElementSibling;
const space14 = space13.nextElementSibling;
const space15 = space14.nextElementSibling;

const space16 = row4.firstElementChild;
const space17 = space16.nextElementSibling;
const space18 = space17.nextElementSibling;
const space19 = space18.nextElementSibling;
const space20 = space19.nextElementSibling;

const space21 = row5.firstElementChild;
const space22 = space21.nextElementSibling;
const space23 = space22.nextElementSibling;
const space24 = space23.nextElementSibling;
const space25 = space24.nextElementSibling;

const space26 = row6.firstElementChild;
const space27 = space26.nextElementSibling;
const space28 = space27.nextElementSibling;
const space29 = space28.nextElementSibling;
const space30 = space29.nextElementSibling;

let spaces1 = [space1,space2,space3,space4,space5];
let spaces2 = [space6,space7,space8,space9,space10];
let spaces3 = [space11,space12,space13,space14,space15];
let spaces4 = [space16,space17,space18,space19,space20];
let spaces5 = [space21,space22,space23,space24,space25];
let spaces6 = [space26,space27,space28,space29,space30];

const rowsArray = [spaces1,spaces2,spaces3,spaces4,spaces5,spaces6];

let wordOfTheDay;
let rowsIndex = 0;
let guessIndex = 0;

const lossMessage = document.querySelector('#loss-message');
const reloadButtons = document.querySelectorAll('.play-again');
const lossAlert = document.querySelector('#lossAlert');
const winAlert = document.querySelector('#wonAlert');

// This function runs a for loop that prints the value of our array, which previously had a letter pushed to it,
// to the DOM by setting the innerText value of the element of spaces at the same index. The values are all <td> elements

// This function connects to an API to get the word of the day

async function getWordToday () {
    const promise = await fetch('https://words.dev-apis.com/word-of-the-day');
    const processedResponse = await promise.json();
    return processedResponse;
}

// This function sets the word of the day
const getTheWord = () => getWordToday().then(function (object) {
    wordOfTheDay = object.word;
    getQuantity(wordOfTheDay);
});

// This function takes an argument which is the users word as an array, joins it to a string
// then passes that string to an API endpoint which returns an object that contains a value telling us
// whether the users word is a real word or not

async function postWord(value) {
    const theString = value.join('');
    let postBody = {
        word : theString
    }
    const poster = await fetch('https://words.dev-apis.com/validate-word', {
        method: 'POST',
        body: JSON.stringify(postBody)
    });
    const processedResponse = await poster.json();
    return processedResponse.validWord;
}

// this function takes the word of the day, splits it into an array so that the filter method can be ran on it
// and then counts how many times each letter appears
function getQuantity (word) {
    let thisWord = word;
    if (typeof word === 'string') {
        thisWord = word.split('');
    }
    let theArray = [];
    for (let i = 0; i < word.length; i++) {
        const result = thisWord.filter(value => value == thisWord[i]).length;
        theArray.push(result);
    }
    let quantity = createQuantObj(thisWord, theArray);
    console.log(quantity);
    return quantity;
}



// This function creates an object that stores each letter as a key, and the 
// number of times it occurs in the keyword as the value
function createQuantObj (word, array) {
    let quants = {};
    word.forEach((key,index) => quants[key] = array[index]);
    return quants;
}


function runGameTest() {
    for(let i = 0 ; i < rowsArray[rowsIndex].length; i++) {
        rowsArray[rowsIndex][i].innerText = guesses[guessIndex][i] || '';
    }
}

// This function compares the user input against the key, and changes the color based on the result
async function evaluateWord (key, userWord) {
    const makeKeyObj = getQuantity(key);
    let userWordResult = await postWord(userWord);
    // console.log(userWordResult);

    if (userWordResult == true) {
        for (let i = 0; i < key.length ; i++) {
            if (userWord[i] === key[i]) {
                rowsArray[rowsIndex][i].style.backgroundColor = '#009f78';  
                makeKeyObj[key[i]]--;
                console.log(makeKeyObj);
            } 
        }
    
        for (let i = 0; i < key.length; i++) {
            if (key[i] === userWord[i]) {
                // return;
            } else if (key.includes(userWord[i]) && (makeKeyObj[userWord[i]] > 0)) {
                rowsArray[rowsIndex][i].style.backgroundColor = '#9c8b00';
                makeKeyObj[key[i]]--;
            } else {
                rowsArray[rowsIndex][i].style.backgroundColor = '#0071af';
            }
        }
        rowsIndex++;
        guessIndex++;
    } else if (userWordResult == false) {
        for (let i = 0; i < key.length ; i++) {
            rowsArray[rowsIndex][i].style.backgroundColor = '#FD4D00';
            // rowsArray[rowsIndex][i].innerText = '';
        }
        console.log('the user word was false, try again');
        guesses[guessIndex] = [];
        runGameTest();
    }
   console.log(guessIndex);
}

// This function ends the game by checking to see if the user's word and the keyword match
function endGame() {

   if (guesses[guessIndex].join('') == wordOfTheDay) {
    console.log('game over');
    document.removeEventListener('keyup', keyPush);
    document.removeEventListener('keyup', enterWord);
    document.removeEventListener('keyup', popLetter);
    winAlert.classList.remove('visible');
   }

   if (guessIndex == 5 && guesses[guessIndex].join('') !== wordOfTheDay) {
    lossMessage.innerText += ` ${wordOfTheDay}`;
    console.log(`You lost, the word was ${wordOfTheDay}`);
    document.removeEventListener('keyup', keyPush);
    document.removeEventListener('keyup', enterWord);
    document.removeEventListener('keyup', popLetter);
    lossAlert.classList.remove('visible');

   }
}

getTheWord();

function keyPush(e) {
    if (e.key.match(/^[a-zA-Z]$/)) {
        guesses[guessIndex].push(e.key);
        runGameTest();
    }
}

function enterWord(e) {
    if (e.key == 'Enter') {
        if (guesses[guessIndex].length !== 5) {
            return
        } else {
            evaluateWord(wordOfTheDay, guesses[guessIndex]);
            runGameTest();
            endGame();
        }
    }
}

function popLetter (e) {
    if (e.key === "Backspace") {
        guesses[guessIndex].pop()
        runGameTest();
    }
}

function reloadGame () {
    location.reload();
}

// This event listener takes user input, verifies it's a letter, and then pushes it to our array
// Also, it runs the first game function as well, so every time the event fires, the runGameTest() fires too
// which is responsible for pushing the array elements to the DOM
document.addEventListener("keyup", keyPush);


// This event listener runs the grabWord function every time the enter button is pressed
// and the evaluate word function
document.addEventListener('keyup', enterWord);

// This event listener pops the last item off of the letterArray, and runs the firstGame() function to 
// repopulate the DOM
document.addEventListener("keyup", popLetter);

reloadButtons.forEach(button => button.addEventListener('click', reloadGame));
