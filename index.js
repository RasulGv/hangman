const introContainer = document.querySelector('.intro');
const gameContainer = document.querySelector('.game');
const startButton = document.getElementById('startGame');
gameContainer.style.display = 'none';
const startAudio=document.querySelector('.startaudio')
const winAudio=document.querySelector('.winaudio')
const loseAudio=document.querySelector('.loseaudio')


startButton.addEventListener('click', () => {
    introContainer.style.display = 'none'; 
    gameContainer.style.display = 'block'; 
    startGame(); 
    startAudio.play()
});

function startGame() {




const hangmanImg=document.querySelector('.hangman img');
const display=document.querySelector('.word');
const hintGuess=document.querySelector('.hint-guess b');
const keyboard=document.querySelector('.keyboard');
const gameModal=document.querySelector('.modal');
const playAgain=document.querySelector('.play-again');
const list=[
    {
        word:'elephant',
        hint:'largest land animal.'
    },
    {
        word:'computer',
        hint:'electronic device for processing data.'
    },
    {
        word:'strawberry',
        hint:'small, red fruit with seeds on the outside'
    },
    {
     word:'sunshine', 
     hint: 'bright light from the sky during the day'

    },
    {
        word:'butterfly',
        hint:'insect with colorful wings'
    },
    {
        word:'watermelon' ,
        hint: 'large fruit with green rind and red flesh'
    },
    {
        word:'adventure',
        hint: 'exciting or daring experience'
        
    },
    {
        word:'chocolate', 
        hint: 'sweet, brown treat made from cacao beans'
    },
    {
        word:'garden',
        hint:'A place where plants are cultivated.'
    }

];
let currentWord
let correctLetters=[] 
let wrongGuessCount=0;
const maxGuesses=6;
const resetGame=()=>{
    correctLetters=[];
    wrongGuessCount=0;
    hangmanImg.src=`images/hangman-${wrongGuessCount}.svg`;
    hintGuess.innerText=`${wrongGuessCount}/${maxGuesses}`;
    // keyboard. querySelectorAll('button').forEach
    display.innerHTML=currentWord.split('').map(()=>` <li class="letter"></li>`).join('');
    gameModal.classList.remove('show');  
}
const randomWord=()=>{
    const{word, hint}= list[Math.floor(Math.random()*list.length)];
    currentWord=word;
    console.log(word);
    document.querySelector('.hint-text b').innerText= hint;
    resetGame();
}
const gameOver=(isVictory)=>{
    setTimeout(()=>{
     const modalShow=isVictory?`You found the word:`:`The correct word was:`;
     gameModal.querySelector('img').src=`images/${isVictory?'victory':'lost'}.gif`;
     gameModal.querySelector('h4').innerText=`${isVictory?'Congrats!':`Game over`}`;
     gameModal.querySelector('p').innerHTML=`${modalShow}<b>${currentWord}}</b>`
     gameModal.classList.add('show');
     winAudio.play()
     
    }, 300)
}
const initgame=(button, clickedLetter)=>{
   if(currentWord.includes(clickedLetter )){
   [...currentWord].forEach((letter,index)=>{
    if (letter===clickedLetter) {
        correctLetters.push(letter)
        display.querySelectorAll('li')[index].innerText=letter
        display.querySelectorAll('li')[index].classList.add('guessed')
    }
   })
   }else{
    wrongGuessCount++;
    hangmanImg.src=`images/hangman-${wrongGuessCount}.svg`;
   
   }
   hintGuess.innerText=`${wrongGuessCount}/${maxGuesses}`;
   if(wrongGuessCount===maxGuesses) return gameOver(false);
   if(correctLetters.length===currentWord.length) return gameOver(true);

}
for (let i = 97;  i <=122; i++){
    const button= document.createElement('button'); 
    button.innerText= String.fromCharCode(i);
    keyboard.appendChild(button);
    button.addEventListener('click', e => initgame(e.target, String.fromCharCode(i)));
}


randomWord();

playAgain.addEventListener('click',randomWord)}