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

// This function runs a for loop that prints the value of our array, which previously had a letter pushed to it,
// to the DOM by setting the innerText value of the element of spaces at the same index. The values are all <td> elements

// This function connects to an API to get the word of the day

async function getWordToday () {
    const promise = await fetch('https://words.dev-apis.com/word-of-the-day');
    const processedResponse = await promise.json();
    console.log(typeof processedResponse);
    return processedResponse;
}

// This function sets the word of the day
const getTheWord = () => getWordToday().then(function (object) {
    wordOfTheDay = object.word;
    // wordOfTheDay.split('');
    console.log(object.word + ' this is the word of the day');
    getQuantity(wordOfTheDay);
});

// word.forEach((key,index) => obj[key] = theArray[index]);
// You're going to need that later to map the arrays to an object to count the quantity of each letter



// this function takes the word of the day, splits it into an array so that the filter method can be ran on it
// and then counts how many times each letter appears
function getQuantity (word) {
    let thisWord = word;
    console.log(word);
    if (typeof word === 'string') {
        thisWord = word.split('');
    }
    // splitWord = word.split('');
    let theArray = [];
    for (let i = 0; i < word.length; i++) {
        const result = thisWord.filter(value => value == thisWord[i]).length;
        theArray.push(result);
        // console.log(theArray);
    }
    console.log(theArray);
    let quantity = createQuantObj(thisWord, theArray);
    return quantity;
}



// This function creates an object that stores each letter as a key, and the 
// number of times it occurs in the keyword as the value
function createQuantObj (word, array) {
    let quants = {};
    word.forEach((key,index) => quants[key] = array[index]);
    // console.log(quants);
    // console.log(quants.s);
    return quants;
}


function runGameTest() {
    for(let i = 0 ; i < rowsArray[rowsIndex].length; i++) {
        rowsArray[rowsIndex][i].innerText = guesses[guessIndex][i] || '';
    }
}


// This function compares the user input against the key, and changes the color based on the result
function evaluateWord (key, userWord) {
    const makeKeyObj = getQuantity(key);
    console.log(makeKeyObj);

    for (let i = 0; i < key.length ; i++) {
        rowsArray[rowsIndex][i].style.backgroundColor = 'white';
        if (key[i] === userWord[i]) {
            console.log(i + ' this is i');
            rowsArray[rowsIndex][i].style.backgroundColor = 'green';  
            makeKeyObj[key[i]]--;
            console.log(makeKeyObj);
        } 
    }

    for (let i = 0; i < key.length; i++) {
        if (key[i] === userWord[i]) {
            return;
        } else if (key.includes(userWord[i]) && makeKeyObj[key[i]] > 0) {
            makeKeyObj[key[i]]--;
            rowsArray[rowsIndex][i].style.backgroundColor = 'yellow';
        } else {
            rowsArray[rowsIndex][i].style.backgroundColor = 'grey';

        }
    }
}

// This event listener takes user input, verifies it's a letter, and then pushes it to our array
// Also, it runs the first game function as well, so every time the event fires, the runGameTest() fires too
// which is responsible for pushing the array elements to the DOM

document.addEventListener("keyup", function(event) {
    if (event.key.match(/^[a-zA-Z]$/)) {
          guesses[guessIndex].push(event.key);
        //   firstGame();
          runGameTest();
        //   console.log(letterArray);
      }
  });


// This event listener runs the grabWord function every time the enter button is pressed
// and the evaluate word function
document.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        if (guesses[guessIndex].length !== 5) {
            return
        } else {
            evaluateWord(wordOfTheDay, guesses[guessIndex]);
            // moveRow();
            // console.log(letterArray);
            // letterArray = [];
            runGameTest();
            rowsIndex++;
            guessIndex++;
        }
    }
});

// This event listener pops the last item off of the letterArray, and runs the firstGame() function to 
// repopulate the DOM
document.addEventListener("keyup", function(event) {
    if (event.key === "Backspace") {
        guesses[guessIndex].pop()
        runGameTest();
        // console.log(letterArray);
    }
});


// console.log(letterArray);

// getWordToday();
// getQuantity(wordOfTheDay);


getTheWord();
