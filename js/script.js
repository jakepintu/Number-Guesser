/*
GAME FUNCTION
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNumber = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e) {
	if(e.target.id == 'play-again') {
		window.location.reload();
	}
});

// Listen for guess
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    // Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, '#d9534f');
    }

    // Check if wom
    else if (guess === winningNumber) {
        // Game over - wom
         gameOver(true, `${guess} is correct, YOU WIN!`);
    } else {
        // Wrong number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            // Game over - lost
            gameOver(false, `Game Over, you lost. The correct number was ${winningNumber}`);
        } else {
            // Game continues - answer wrong
            // Change background color
            guessInput.style.borderColor = '#d9534f';
            // Clear input
            guessInput.value = '';
            // Set message
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, '#d9534f');
        }
    }
})


// Game over
function gameOver(won, msg) {
	let color;
	won === true ? color = '#bde2bd' : color = '#d9534f';
    // Disable input and button
    guessInput.disabled = true;
    // Change background color
    guessInput.style.borderColor = color;
    guessInput.style.backgroundColor = color;
    // Change text Color
    message.style.color = color;
    // Set message
    setMessage(msg);

    // Play Again?
    guessBtn.value = 'Play Again';
    guessBtn.id = 'play-again';
}

// Get Winning Number
function getRandomNum(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color) {
    message.className = 'pt-3 lead';
    message.style.color = color;
    message.textContent = msg;
}