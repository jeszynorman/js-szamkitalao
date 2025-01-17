let guessListContainer = document.querySelector(".js-guess-container");
let currentGuessField = document.querySelector(".js-guess-field");
let newGameButton = document.querySelector(".js-new-game-button");
let guessSubmitButton = document.querySelector(".js-guess-submit-button");

let target;
let gameOver = false;
let guessList = [];

const guessReuslts = {
  // JSben a const a felsoroltípus
  KISSEBB: "kisebb",
  NAGYOBB: "nagyobb",
  HELYES: "talált",
};

function generateTarget() {
  return Math.floor(Math.random() * 100) + 1; // a math.randommal generáljuk a véletlen számot(float) 0 és 1 között, a Math.floor-ral pedig vesszülk az egész részét vagy a Number.parseInttel is egésszé konvertálhatjuk. És mivel 100ig keresünk így hozzáadunk + 1et
}

function resetGame() {
  // korábbi tippek törlése
  guessList = [];
  renderGuessList();
  // input mező tartalmának törlése
  currentGuessField.value = "";
  // engedünk tippelni, azzal hogy nincs vége a játéknak
  gameOver = false;
}

function startGame() {
  resetGame();
  target = generateTarget();
}

function addGuess(guessValue, result) {
  guessList.unshift({ guessValue, result });
}

function compareGuessToTarget(guess) {
  if (guess < target) {
    //arr    ->   listához elem adása1
    //arr.unshift(elem)
    //arr = (elem, ...arr)
    addGuess(guess, guessReuslts.NAGYOBB);
  } else if (guess > target) {
    addGuess(guess, guessReuslts.KISSEBB);
  } else {
    addGuess(guess, guessReuslts.HELYES);
    gameOver = true;
  }
  renderGuessList();
}

function submitGuess(event) {
  event.preventDefault();
  if (!gameOver) {
    let guessValue = Number.parseInt(currentGuessField.value);
    if (validateGuess()) {
      compareGuessToTarget(guessValue);
    }
  }
}

function addGuessValidation() {
  currentGuessField.classList.add("is-invalid");
}

function removeGuessValidation() {
  currentGuessField.classList.remove("is-invalid");
}

function validateGuess() {
  let guessValue = Number.parseInt(currentGuessField.value);
  currentGuessField.value = guessValue;
  if (Number.isNaN(guessValue) || guessValue < 1 || guessValue > 100) {
    currentGuessField.classList.add("is-invalid");
    return false;
  }
  removeGuessValidation();
  return true;
}

function renderGuessList() {
  let html = "";
  let guessType;

  for (let { guessValue, result } of guessList) {
    // let alertTypes = {
    // [guessTypes.KISSEBB]: "success",     //JSben ha a kulcsokat vmilyen változótól akarom függővé tenni akkor []
    // [guessTypes.NAGYOBB]: "warning",
    // [guessTypes.HELYES]: "info",
    if (result === guessReuslts.KISSEBB) {
      guessType = "warning";
      guessText = "a keresett szám kissebb.";
    } else if (result === guessReuslts.NAGYOBB) {
      guessType = "primary";
      guessText = "a keresett szám nagyobb.";
    } else {
      guessType = "success";
      guessText = `gratulálok, eltaláltad! Tippek száma: ${guessList.length}`;
    }
    html += `
          <div class="row">
            <div class="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 alert alert-${guessType}"
                  role="alert">
              ${guessValue} - ${guessText}
            </div>
          </div>
       `;
  }
  guessListContainer.innerHTML = html;
}

startGame();
newGameButton.addEventListener("click", startGame);
guessSubmitButton.addEventListener("click", submitGuess);
currentGuessField.addEventListener("focus", removeGuessValidation);
currentGuessField.addEventListener("change", validateGuess);
