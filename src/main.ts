const textScoreElement = document.getElementById('text-score')
const textOverElement = document.getElementById('text-over')
const buttonCardElement: HTMLButtonElement | null = document.getElementById('button-card') as HTMLButtonElement | null;
const buttonStopElement: HTMLButtonElement | null = document.getElementById('button-stop') as HTMLButtonElement | null;
const buttonGameOverElement: HTMLButtonElement | null = document.getElementById('button-game-over') as HTMLButtonElement | null;
const buttonClueElement: HTMLButtonElement | null = document.getElementById('button-clue') as HTMLButtonElement | null;
const cardElement: HTMLImageElement | null = document.getElementById('card') as HTMLImageElement | null;
let score = 0;
let randomNumber: number = 0
const cardUrls: { [key: number]: string } = {
    1: 'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg',
    2: 'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg',
    3: 'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg',
    4: 'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg',
    5: 'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg',
    6: 'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg',
    7: 'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg',
    10: 'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg',
    11: 'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg',
    12: 'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg',
};

const allCards: { [key: string]: string } = {
    '1': '<b>As de copas</b>',
    '2': '<b>Dos de copas</b>',
    '3': '<b>Tres de copas</b>',
    '4': '<b>Cuatro de copas</b>',
    '5': '<b>Cinco de copas</b>',
    '6': '<b>Seis de copas</b>',
    '7': '<b>Siete de copas</b>',
    '8': '<b>Ocho de copas</b>',
    '9': '<b>Nueve de copas</b>',
    '10': '<b>Sota de copas</b>',
    '11': '<b>Caballo de copas</b>',
    '12': '<b>Rey de copas</b>'
};

const checkScore = (): void => {
    if (textScoreElement !== null) {
        if(randomNumber<=7){
            score += randomNumber
        }else{
            score += 0.5
        }
        if(score>7.5 && textOverElement != null && buttonGameOverElement && buttonStopElement){
            textOverElement.textContent='Game Over';
            buttonGameOverElement.disabled = false
            buttonStopElement.disabled = true

            if(buttonCardElement){
                buttonCardElement.disabled = true
                buttonCardElement.classList.add('button-disabled')
            }
        }
        textScoreElement.textContent = score.toString();
    }
};



const showCard = (): void => {
    if (cardElement !== null && cardUrls[randomNumber]) {
        cardElement.src = cardUrls[randomNumber];
    }
};

const stopGameFuntion = (): void =>{
    if(buttonCardElement && buttonStopElement && buttonGameOverElement){
        buttonCardElement.disabled = true
        buttonStopElement.disabled = true
        buttonGameOverElement.disabled = false
    }
    if(score < 4 && textOverElement != null){
        textOverElement.textContent='Has sido muy conservador';
    }else if(score <= 5 && textOverElement != null){
        textOverElement.textContent='Te ha entrado el canguelo eh?';
    }else if(score <= 7 && textOverElement != null){
        textOverElement.textContent='Casi casi...';
    }else if(score === 7.5 && textOverElement != null){
        textOverElement.textContent='¡ Lo has clavado! ¡Enhorabuena!';
    }

    if(buttonClueElement){
        buttonClueElement.classList.remove('hide')
    }
} 


const clueFuntion = (): void =>{
    let nextRandomNumber = 0
     nextRandomNumber = Math.floor(Math.random() * 10 + 1) + (nextRandomNumber > 7 ? 2 : 0);

     if(textOverElement != null){
        const cardName = allCards[nextRandomNumber.toString()];
        textOverElement.innerHTML = `La siguiente hubiera sido la carta: <br>${cardName}`;
    }
}

const newCard = (): void =>{
    randomNumber = Math.floor(Math.random() *10 +1)
    if(randomNumber>7){
       randomNumber+=2
   }
   if(buttonStopElement){
    buttonStopElement.disabled = false
}
   showCard()
   checkScore()
   
   console.log('La puntuación es ' + score)
}

const playAgain = (): void => {
    score = 0;
    randomNumber = 0; 
    if (cardElement && buttonCardElement && textOverElement !== null && textScoreElement !==null) {
        cardElement.src = 'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg';
        buttonCardElement.disabled = false;
        buttonCardElement.classList.remove('button-disabled'); 
        textOverElement.textContent = '';
        textScoreElement.textContent = score.toString(); 
    }
    if (buttonStopElement && buttonGameOverElement && buttonClueElement) {
        buttonStopElement.disabled = true; 
        buttonGameOverElement.disabled = true; 
        buttonClueElement.classList.add('hide')
    }
}

window.addEventListener('DOMContentLoaded', checkScore)
buttonCardElement?.addEventListener('click', newCard)
buttonStopElement?.addEventListener('click', stopGameFuntion)
buttonGameOverElement?.addEventListener('click', playAgain)
buttonClueElement?.addEventListener('click', clueFuntion)