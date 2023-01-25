# wordle-clone
This program is a clone of the Wordle game.


# What it does

This program functions like the original Wordle Game. 

Users are allowed 6 guesses to guess the correct 5 letter word. If the letter in the user's guess is in the correct spot, then it will highlight green. If the user's word contains the right letter, but it is in the wrong spot, it will highlight yellow. If it is a wrong letter entirely it will highlight blue.

If the user is able to guess correctly, a success message will appear on screen. If they can't guess correctly, then a failure message indicating the correct word will appear on screen.

# How I built it

I utilized vanilla JS for all of the logic in this project. The program utilizes event listeners, array methods, and API calls to do most of the heavy lifting of the program. The document has an event listener that allows the user to use their keyboard to enter a word that they want to guess. As each letter is pressed on the keyboard, the value of each key is populated in the DOM. 

To get the word of the day so that the program can check the user word against it, the program utilizes the Fetch() API to retrieve an object which contains the keyword. To check if the user's word is a real word, the program POSTs the word to an API endpoint which will return an object that contains a property that indicates whether the user's word is a real word or not.

If it is a real word, the indices of the user's word and checked against the indices of the keyword, to see if there are any matches. If there are, the letter is highlighted correspondingly; green for correct letter in correct position, yellow for correct letter in wrong position, and blue for wrong letter.

Each guess is saved to it's own array, at which point the program moves to the next array to populate it. Once there are no arrays left to populate, if the user guesses the wrong word, they lose the game and receive an error message.

At any point, if the user guesses the correct word the game will end and a success message will be displayed.

# Going forward

I learned a lot through this project, such as how to utilize the fetch() API to GET and POST to API endpoints, how to accept and store user input, how to manipulate arrays and objects in multiple ways.

In the future I would like to add a keyboard that allows users to select letters to input to their word array, as well as indicate which letters have been used and what the outcome was.

