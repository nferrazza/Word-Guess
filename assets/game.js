//Global Variables
//Word options array
var wordList = ["bart", "lisa", "marge", "homer", "ned flanders", "krusty the klown", "groundskeeper willy", "sideshow bob", "millhouse", "mr.burns", "patty", "selma", "apu", "moe", "mr.smithers", "edna krabappel", "barney gumble", "principal skinner", "dr.hibbert", "dr.nick", "comic book guy" ];

//Word chosen to be guessed
var chosenWord = ""; 

//Splits up the chosen word into letters and stored into array
var lettersInChosenWord = [];

//Number of letter blanks based on the chosen word letter count
var numBlanks = 0;

//Array that holds both correct letters and remaining blanks
var blanksAndCorrect = [];

//Array that holds incorrect letters
var incorrectLetters = [];

//Game stats counter
var winCount = 0;
var lossCount = 0;
var numGuesses = 9;

///////////Functions
//startGame function; how to start and restart game.
function startGame() {
    //Resets the guesses left back to original
    numGuesses = 9;

    //Solution is chosen randomly from word array
    chosenWord = wordList[Math.floor(Math.random() * wordList.length)];

    //Solution is broken into individual letters
    lettersInChosenWord = chosenWord.split("");

    //Counts the number of letters in the word
    numBlanks = lettersInChosenWord.length;

    //Print the solution in console log to test
    console.log(chosenWord);

    //The following two lines empty the arrays that held the correct guesses and blanks as well as the incorrect letters from the previous round
    blanksAndCorrect = [];

    wrongGuesses = [];

    //Fill blank and correct list with appropriate number of blanks based on the number of letters in the chosen word
    for (var i = 0; i <numBlanks; i++) {
        blanksAndCorrect.push("_");
    }

    //Prints the initial blanks into the console for testing
    console.log(blanksAndCorrect);

    //Reprints the guesses left to 9
    document.getElementById("word-blanks").innerHTML = blanksAndCorrect.join(" ");

    //Clears wrong guesses from previous round
    document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

}


//Function that checks the letters for matches
function letterCheck(letter) {
    var letterInWord = false;

    //Checks to see if a letter is in the array
    for (var i = 0; i < numBlanks; i++) {
        if (chosenWord[i] === letter){
            //After looping through each letter in the array, if the letter at i is a match to the letter, letter in word is set to true
            letterInWord = true;
        }
    }

    //If the letter in word is set to true, figure out which index the letter is in
    if (letterInWord) {

        //Loops through the word
        for (var j = 0; j < numBlanks; j++) {

            //Populates the blanksAndSuccesses with every instance of the letter
            if (chosenWord[j] === letter) {

                //When there is a letter match, the blanks and correct array at that index is replaced by the letter
                blanksAndCorrect[j] = letter;
            }
        }

        //Console log to test
        console.log(blanksAndCorrect);
    }

                //if the letter doesnt exist
                else {
                    wrongGuesses.push(letter);
                    numGuesses--;
                }
}


//Round Complete function
//Contains the code that needs to run as each guess is made
function roundComplete(){

    

    //Log initial status update with wins, losses, guesses
    console.log("Wins: " + winCount + " | Losses: " + lossCount + "| Guesses: " + numGuesses);

    //Update HTML to reflect new number of guesses, and update correct guesses
    document.getElementById("guesses-left").innerHTML = numGuesses;

    //Print the array of guesses and blanks on page
    document.getElementById("word-blanks").innerHTML = blanksAndCorrect.join(" ");
    
    //Print wrong guesses to page
    document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

    //If all of the guessed letters match the solution
    if (lettersInChosenWord.toString() === blanksAndCorrect.toString()) {

        //Adds to win counter and alerts user
        winCount++;
        alert("You Win!")

        //Update the HTML win counter and restart game
        document.getElementById("win-counter").innerHTML = winCount;
        startGame();
    }

    //If guess limit is reached
    else if (numGuesses === 0) {
        //Adds to loss counter and alerts user 
        lossCount++;
        alert("You Lose!");

        //Update the loss counter in the HTML
        document.getElementById("loss-counter").innerHTML = lossCount;

        //Resets game
        startGame();
    }
};

//////////////////////////Main process that starts the whole game

//Starts the game by running the startgame function
startGame();

//Captures key clicks
document.onkeyup = function(event) {

    //Converts to lowercase letter
    var lettersGuessed = String.fromCharCode(event.which).toLowerCase();

    //Runs the code to check for correct guess using the letters guessed as an argument to pass
    letterCheck(lettersGuessed);

    //Runs round complete at end of each round
    roundComplete();

};