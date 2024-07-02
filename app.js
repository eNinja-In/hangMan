let hangMan = document.querySelector(".hangMan");
let keys = document.querySelectorAll(".keyboardkeys");
let guessAlphabets = document.querySelectorAll(".guessList");
let hint = document.querySelector(".boardHint");
let score = document.querySelector(".boardScore");
let result = document.querySelector(".notice");
let playAgain = document.querySelector(".playAgain");
let image = document.querySelector(".noticeImage");
let answer = document.querySelector(".noticeAnswer");

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const words = [
  "Elephant",
  "Pancakes",
  "Backpack",
  "Notebook",
  "Computer",
  "Broccoli",
  "Icecream",
  "Handsome"
];
const clues = [
  "The largest land animal in the world.",
  "A breakfast food made from batter, cooked.",
  "A bag for carrying items on your back.",
  "A book with blank pages for taking notes.",
  "An electronic device for processing data.",
  "A green vegetable resembling a small tree.",
  "A frozen dessert made from cream and sugar.",
  "Describes a man who is good-looking."
];

let index = 0;
let incorrect = 0;
let random = Math.floor(Math.random() * words.length);
let randomWord = words[random].toUpperCase();
console.log(randomWord);

hangMan.innerHTML = `<img src="resource/hangman-${incorrect}.svg" alt="hangman"><h2>HangMan</h2>`;
hint.innerHTML = `<p><h>Hint: </h>${clues[random]}</p>`;
score.innerHTML = `<p><h>Incorrect: </h>${incorrect} / 6</p>`;

let keyboardkeys = (key, i) => {
  key.innerHTML = `${alphabet[i]}`;
};

let updateInterface = () => {
  if (incorrect == 6) {
    result.style = "display:flex;";
    image.innerHTML = `<img src="resource/result0.gif" alt="lost">`;
    answer.innerHTML = `The Answer : ${randomWord}`;
    for (let i = 0; i < randomWord.length; i++) { guessAlphabets[i].innerHTML = " "; }
  }
  hangMan.innerHTML = `<img src="resource/hangman-${incorrect}.svg" alt="hangman"><h2>HangMan</h2>`;
  score.innerHTML = `<p><h>Incorrect: </h>${incorrect} / 6</p>`;
};

let restartGame = () => {
  result.style = "display:none;";
  index = 0;
  incorrect = 0;
  random = Math.floor(Math.random() * words.length);
  randomWord = words[random].toUpperCase();
  hint.innerHTML = `<p><h>Hint: </h>${clues[random]}</p>`;
  for (let i = 0; i < guessAlphabets.length; i++) { guessAlphabets[i].innerHTML = " "; }
  updateInterface();
};

let checkIfGuessed = () => {
  let guessedWord = '';
  guessAlphabets.forEach(letter => {
    guessedWord += letter.innerHTML;
  });
  if (guessedWord === randomWord) {
    result.style = "display:flex;";
    image.innerHTML = `<img src="resource/result1.gif" alt="won">`;
    answer.innerHTML = `Congratulations! You guessed the word: ${randomWord}`;
  }
};

let checkScore = (key) => {
  updateInterface();
  let correctGuess = false;
  for (let i = 0; i < randomWord.length; i++) {
    if (key.innerHTML === randomWord[i]) {
      guessAlphabets[i].innerHTML = `${key.innerHTML}`;
      correctGuess = true;
    }
  }
  if (!correctGuess) {
    incorrect++;
  }
  checkIfGuessed();
};

keys.forEach((key, i) => {
  keyboardkeys(key, i);
  key.onclick = () => { checkScore(key); };
});

playAgain.onclick = () => { restartGame(); };
