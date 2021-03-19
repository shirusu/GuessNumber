let button = document.querySelector('.guessSubmit')
let lastGuesses = document.querySelector('.guesses')
let lastResult = document.querySelector('.lastResult')
let lowOrHigh = document.querySelector('.lowOrHigh')
let guessField = document.querySelector('.guessField')


let guesses = 1 //sozdaem peremennuyu kotoraya otvechaet za kol-vo  popytok
let randomNumber = Math.floor(Math.random() * 100) + 1 // generiruyem sluchainoye chislo ot 1 do 100
let resetButton
console.log(randomNumber)

let checkGuess = () => {
    if(guessField.value.length > 0){
        let userGuess = Number(guessField.value)//sozdaem peremennuyu v kotoruyu zapisyvatsya znacheniye
        if (guesses === 1) {
            lastGuesses.textContent = 'Previous guesses'
        }
        lastGuesses.textContent += userGuess + " "
        if (userGuess === randomNumber) { //esli ugadali chislo
            lastResult.textContent = 'Congrats! You guessed the number!'
            lastResult.style.backgroundColor = 'green'
            lowOrHigh.textContent = ''
            setGameOver()
        } else if (guesses === 10) { //elsi kol-vo popytok bolwe 10
            lastResult.textContent = 'Game is over. The number of guessing is exceeded!'
            button.disabled = true
            setGameOver()
        } else { // elsi ne ugadali chislo
            lastResult.textContent = 'Wrong!'
            lastResult.style.backgroundColor = 'red'
            if (userGuess - randomNumber <= 5 && userGuess - randomNumber > -5) { //elsi vy blizki k zagadonnomu chislu
                lowOrHigh.textContent = 'Vy blizko'
            } else if (userGuess > 100) {// esli chislo kotoroe my vveli
                lowOrHigh.textContent = 'Vy vveli chislo bolwe 100'
            } else if (userGuess < 0) { // esli chislo kotoroe vy vveli menwe 0
                lastResult.textContent = 'Vy vveli chislo menwe 0'
            } else { //esli my ne blizki k zagadannomu chislu
                lowOrHigh.textContent = 'Holodno'
            }
        }
        guesses++ // uvelichivaen kolichestvo popytok
    }

}

let setGameOver = () => {
    guessField.disabled = true // vyklyuchaem input
    button.disabled = true // yklyuchaem button
    resetButton = document.createElement('button')//sozdaem peremennuyu v kotoroi sozdaem novuyu knopku
    resetButton.textContent = 'Start new game'//v znachenie etoi knopki zapisyvaem nachat' new game
    document.querySelector('.content').appendChild(resetButton)// pomeshaem dannuyu knopku v body cherez appenchild
    resetButton.addEventListener('click', resetGame) // naveshivaem na knopku sobytiye klika, pri kotorom vypolnyaetsya function
}

let resetGame = () => { // functiya dlya
    guesses = 1
    lastGuesses.textContent = ''
    lastResult.textContent = ''
    lowOrHigh.textContent = ''
    guessField.disabled = false
    button.disabled = false
    lastResult.style.backgroundColor = 'white'
    resetButton.parentNode.removeChild(resetButton)
}

button.addEventListener('click', () => {
    checkGuess()
    guessField.value = ''
})