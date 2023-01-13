let letterArray = [];

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


// This event listener takes user input, verifies it's a letter, and then pushes it to our array
// Also, it runs the first game function as well, so every time the event fires, the firstGame() fires too
// which is responsible for pushing the array elements to the DOM

document.addEventListener("keyup", function(event) {
  if (event.key.match(/^[a-zA-Z]$/)) {
        letterArray.push(event.key);
        firstGame();
        console.log(letterArray);
    }
});


// This function runs a for loop that prints the value of our array, which previously had a letter pushed to it,
// to the DOM by setting the innerText value of the element of spaces at the same index. The values are all <td> elements

function firstGame() {
    for(let i = 0 ; i < spaces.length; i++) {
        spaces[i].innerText = letterArray[i] || '';
    }
}

function evaluateWord () {

}

function moveRow () {
    letterArray = [];
}


// This function joins our letter array to a string so that it can be evaluated against the word of the day
function grabWord () {
    const word = letterArray.join('');
    console.log(word);
    return word;
}

// This event listener runs the grabWord function every time the enter button is pressed
document.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        if (letterArray.length !== 5) {
            return
        } else {
            grabWord();
            moveRow();
            console.log(letterArray);
        }
    }
});

// This event listener pops the last item off of the letterArray, and runs the firstGame() function to 
// repopulate the DOM
let currentIndex = 0;
document.addEventListener("keyup", function(event) {
    if (event.key === "Backspace") {
        // letterArray.splice(currentIndex - 1, 1);
        letterArray.pop()
        // currentIndex--;
        firstGame();
        console.log(letterArray);
    }
});

console.log(letterArray);

