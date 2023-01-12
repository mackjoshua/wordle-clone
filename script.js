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

// const guess1 = [space1,space2,space3,space4,space5];

let theGuess = [];

// const evaluateSpace = function (array) {
//     array.forEach(space => {
//             document.onkeyup = function (e) {
//                 console.log(space + ' I am targeted here');
//                 space.textContent = e.key;
//                 // space.nextElementSibling.textContent = e.key;

//             } 
        
//     });
// }


const fillFirstRow = function () { document.onkeyup = function (e) {
    // if (space1.textContent === '') {
    //     space1.textContent = e.key;
    // } else if (space2.textContent === '') {
    //     space2.textContent = e.key
    // }  else if (space3.textContent === '') {
    //     space3.textContent = e.key
    // } else if (space4.textContent === '') {
    //     space4.textContent = e.key
    // } else if (space5.textContent === '') {
    //     space5.textContent = e.key
    // }

    // if (e.key == 'Backspace') {
    //     console.log('backspace was tapped');
    //     space5.textContent = '';
    // } 
    
    // if (e.key == 'Backspace' && space5.textContent == '') {
    //     space4.textContent = '';
    // }

    if (e.key == 'Backspace') {
        theGuess.pop();
        console.log(theGuess);
        return theGuess;
    }

    theGuess.push(e.key);

   

    console.log(e.key);
    console.log(theGuess);
    }

   

}

console.log(space1.innerText + ' here I am');

fillFirstRow();