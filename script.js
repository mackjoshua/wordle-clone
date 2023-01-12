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


let theGuess = [];
let spaces = [space1,space2,space3,space4,space5];
let theString = '';

// Function for making sure the value user provides is a letter
const isLetter = function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }

let i = 0;
let currentPosition = -1;

const fillFirstRow = function () { document.onkeyup = function (e) {

// If the user presses the backspace key, it will delete the last letter in the array
    if (e.key == 'Backspace') {
        // theGuess.pop();
        theGuess[currentPosition] = '';
        spaces[currentPosition].innerText = '';
        currentPosition--;
        if (currentPosition <= 0) {
            currentPosition = 0;
        }
        console.log(currentPosition);
        console.log(theGuess);
    }
// The first condition makes sure the array doesn't hold more than 5 letter
// The second condition calls our isLetter function on the value of the key the user presses
    if (theGuess.length < 5 && isLetter(e.key) == true) { 
        // currentPosition++;
        theGuess.push(e.key);


        currentPosition++;
        console.log(currentPosition);
        // if (spaces[i].innerText == '') {
        spaces[i].innerText = theGuess[currentPosition];
        i++;
        // } 
    }
    console.log(theGuess);

    if (theGuess[currentPosition] == '') {

        document.onkeyup = function (e) {
            
        }
    }

    }
}

const getString = (array) => { 
    
    document.addEventListener('keyup', (e) => {
    if (e.key == 'Enter' && array.length == 5) {
        theString = array.join('');
        console.log(theString + ' on enter it evaluates here');
        }
    });
    // console.log(theString);
    // return theString;
}

const render =  ([array]) => {
    let i = 0;
    // fillFirstRow();
    document.onkeyup = (e) => {

        if (spaces[i].innerText === '') {
            spaces[i].innerText = e.key;
        }
        i++;
    }
}

// const populateScreen = (row) => {
//     let i = 0
//     row.forEach(space => {
//         space[1].innerText = theGuess[1];
//         i++;
//     });
// }

fillFirstRow();
// render(theGuess);
// populateScreen(spaces);
console.log(getString(theGuess) + ' It evaluated here');

// console.log(getString());