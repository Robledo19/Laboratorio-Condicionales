const textScoreElement = document.getElementById("text-score");
const textOverElement = document.getElementById("text-over");
const buttonCardElement = document.getElementById("button-card");
const buttonStopElement = document.getElementById("button-stop") 
const buttonGameOverElement = document.getElementById("button-game-over");
const buttonClueElement = document.getElementById("button-clue");
const cardElement = document.getElementById("card");
let score = 0;
let randomNumber: number = 0;
const cardUrls: { [key: number]: string } = {
  1: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg",
  2: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg",
  3: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg",
  4: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg",
  5: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg",
  6: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg",
  7: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg",
  10: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg",
  11: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg",
  12: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg",
};
const allCards: { [key: string]: string } = {
  "1": "<b>As de copas</b>",
  "2": "<b>Dos de copas</b>",
  "3": "<b>Tres de copas</b>",
  "4": "<b>Cuatro de copas</b>",
  "5": "<b>Cinco de copas</b>",
  "6": "<b>Seis de copas</b>",
  "7": "<b>Siete de copas</b>",
  "8": "<b>Ocho de copas</b>",
  "9": "<b>Nueve de copas</b>",
  "10": "<b>Sota de copas</b>",
  "11": "<b>Caballo de copas</b>",
  "12": "<b>Rey de copas</b>",
};

const printUrlCard = (card: number) => {
  const cardElement = document.getElementById("card");
  if (
    cardElement !== null &&
    cardElement !== undefined &&
    cardElement instanceof HTMLImageElement
  ) {
    cardElement.src = cardUrls[card];
  }
};

const checkButton = () => {
  if (buttonCardElement instanceof HTMLButtonElement && buttonCardElement.disabled) {
    buttonCardElement.classList.add("button-disabled");
  } else {
    buttonCardElement?.classList.remove("button-disabled");
  }

  if (buttonStopElement instanceof HTMLButtonElement && buttonStopElement.disabled) {
    buttonStopElement.classList.add("button-disabled");
  } else {
    buttonStopElement?.classList.remove("button-disabled");
  }

  if (buttonClueElement instanceof HTMLButtonElement && buttonClueElement.disabled) {
    buttonClueElement.classList.add("button-disabled");
  } else {
    buttonClueElement?.classList.remove("button-disabled");
  }

  if (buttonGameOverElement instanceof HTMLButtonElement && buttonGameOverElement.disabled) {
    buttonGameOverElement.classList.add("button-disabled");
  } else {
    buttonGameOverElement?.classList.remove("button-disabled");
  }
};


const activeButtonStop = () => {
  if (buttonStopElement instanceof HTMLButtonElement) {
    buttonStopElement.disabled = false;
  }
};

const getCardPoints = (card: number) => {
  return card > 7 ? 0.5 : card;
};

const sumPoints = (points: number) => {
  return score + points;
};

const setScore = (newScore: number) => {
  score = newScore;
};

const winGame = () => {
  if (
    textOverElement != null &&
    buttonCardElement instanceof HTMLButtonElement &&
    buttonStopElement instanceof HTMLButtonElement &&
    buttonGameOverElement instanceof HTMLButtonElement
  ) {
    textOverElement.textContent = "¡ Lo has clavado! ¡Enhorabuena!";
    buttonCardElement.disabled = true;
    buttonStopElement.disabled = true;
    buttonGameOverElement.disabled = false;
  }
};

const lostGame = () => {
  if (
    textOverElement != null &&
    buttonGameOverElement instanceof HTMLButtonElement &&
    buttonStopElement instanceof HTMLButtonElement &&
    buttonCardElement instanceof HTMLButtonElement
  ) {
    textOverElement.textContent = "Te has pasado";
    buttonGameOverElement.disabled = false;
    buttonStopElement.disabled = true;
    buttonCardElement.disabled = true;
  }
};

const reviewGame = () => {
  if (score === 7.5) {
    winGame();
  }
  if (score > 7.5) {
    lostGame();
  }
};

const printScore = (score: number) => {
  if (textScoreElement && textScoreElement instanceof HTMLSpanElement) {
    textScoreElement.textContent = score.toString();
  }
};

const checkScore = (): void => {
  if (textScoreElement !== null && textScoreElement instanceof HTMLSpanElement) {
    if (randomNumber <= 7) {
      score += randomNumber;
    } else {
      score += 0.5;
    }
    textScoreElement.textContent = score.toString();
  }
  checkButton();
};

const showCard = (cart: number): void => {
  if (cardElement !== null && cardUrls[cart] && cardElement instanceof HTMLImageElement) {
    cardElement.src = cardUrls[cart];
  }
};

const restartGame = (): void => {
  if (cardElement instanceof HTMLImageElement && textOverElement instanceof HTMLSpanElement && textScoreElement instanceof HTMLSpanElement) {
    cardElement.src =
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
    textOverElement.textContent = "";
    textScoreElement.textContent = score.toString();
  }
};

const restartButton = (): void => {
  if (
    buttonCardElement instanceof HTMLButtonElement &&
    buttonStopElement instanceof HTMLButtonElement &&
    buttonGameOverElement instanceof HTMLButtonElement &&
    buttonClueElement instanceof HTMLButtonElement
  ) {
    buttonCardElement.disabled = false;
    buttonStopElement.disabled = true;
    buttonGameOverElement.disabled = true;
    buttonClueElement.classList.add("hide");
  }
};

const mostrarMensajeCuandoParoLaPartida = (mensaje: string) => {
  const textOverElement = document.getElementById("");
  if (textOverElement) {
    textOverElement.textContent = mensaje;
  }
};

const printTextStopGame = ():string =>{
  if (score < 4 && textOverElement) {
    return "Has sido muy conservador";
  } else if (score <= 5 && textOverElement != null) {
    return "Te ha entrado el canguelo eh?";
  } else if (score <= 7 && textOverElement != null) {
    return "Casi casi...";
  } else if (score === 7.5 && textOverElement != null) {
    return "¡ Lo has clavado! ¡Enhorabuena!";
  }
  return "";
}

const stopGameFuntion = (): void => {
  if (buttonCardElement instanceof HTMLButtonElement && buttonStopElement instanceof HTMLButtonElement && buttonGameOverElement instanceof HTMLButtonElement) {
    buttonCardElement.disabled = true;
    buttonStopElement.disabled = true;
    buttonGameOverElement.disabled = false;
  }
  if (buttonClueElement) {
    buttonClueElement.classList.remove("hide");
  }
  const message = printTextStopGame()
  if (textOverElement) {
    textOverElement.textContent = message; 
  }
  checkButton();
};

const clueFuntion = (): void => {
  let nextRandomNumber = 0;
  nextRandomNumber =
    Math.floor(Math.random() * 10 + 1) + (nextRandomNumber > 7 ? 2 : 0);
  if (textOverElement != null && textOverElement instanceof HTMLSpanElement) {
    const cardName = allCards[nextRandomNumber.toString()];
    textOverElement.innerHTML = `La siguiente hubiera sido la carta: <br>${cardName}`;
  }
};

const getRandomNumber = () => {
  return Math.floor(Math.random() * 10 + 1);
};

const getCartNumber = (randomNumber: number) => {
  return randomNumber > 7 ? randomNumber + 2 : randomNumber;
};

const newCard = (): void => {
  const randomNumber = getRandomNumber();
  const card = getCartNumber(randomNumber);
  printUrlCard(card);
  const points = getCardPoints(card);
  const pointsSum = sumPoints(points);
  setScore(pointsSum);
  printScore(score);
  activeButtonStop();
  reviewGame();
  checkButton();
};

const playAgain = (): void => {
  score = 0;
  randomNumber = 0;
  restartGame();
  restartButton();
  checkButton();
};


window.addEventListener("DOMContentLoaded", checkScore);
if (
  buttonCardElement !== null &&
  buttonCardElement !== undefined &&
  buttonCardElement instanceof HTMLButtonElement
) {
  buttonCardElement.addEventListener("click", newCard);
}
if (
  buttonStopElement !== null &&
  buttonStopElement !== undefined &&
  buttonStopElement instanceof HTMLButtonElement
) {
  buttonStopElement.addEventListener("click", stopGameFuntion);
}
if (
  buttonGameOverElement !== null &&
  buttonGameOverElement !== undefined &&
  buttonGameOverElement instanceof HTMLButtonElement
) {
  buttonGameOverElement.addEventListener("click", playAgain);
}
if (
  buttonClueElement !== null &&
  buttonClueElement !== undefined &&
  buttonClueElement instanceof HTMLButtonElement
) {
  buttonClueElement.addEventListener("click", clueFuntion);
}
