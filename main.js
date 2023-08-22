
let bodyParts = [`url("/img/1.jpg")`,`url("/img/2.jpg")`,`url("/img/3.jpg")`,`url("/img/4.jpg")`,`url("/img/5.jpg")`,`url("/img/6.jpg")`,`url("/img/7.jpg")`,`url("/img/8.jpg")`,`url("/img/9.jpg")`,`url("/img/10.jpg")`];
let f = 0;
let ranWord = "";
let wordLength = 4;
let keyRow = $('.keyRow');
const gameBoard = document.getElementById('gameBoard');
const keyBlock = document.getElementsByClassName('keyBlock');
const uiBtns = document.getElementsByClassName("btn")
const inputWord = document.getElementById("inputWord");
let isKey = false;



// ACCESS RANDOM WORD API
async function getNewWord(length){
    let something = new XMLHttpRequest();
    something.open("GET", `https://random-word-api.vercel.app/api?words=1&length=${length}`);
    something.onload = function(){
        ranWord = something.responseText.slice(2, something.response.length - 2);
    }
    something.send();
}

function startGame(){ //        START THIS MFER UP
    //  TODOOOOS
    // CHECK || reset keyboard || loop through all keys remove inactive and active classes
    Array.from(keyBlock).forEach(keyEl => { // reset keys
        resetKeys(keyEl)
    });

    // CHECK || reset images
    resetImg()

    // CHECK || clear input blocks
    resetInputBlock();

    getNewWord(wordLength)
}

startGame()

function setWordLength(obj, num){  // CHANGE GAME ACCORDING TO WORD LENGTH
    if(num != wordLength){
        for(let i = 0; i < uiBtns.length; i++){
            let btnClass = uiBtns[i].className
            if(btnClass.includes(" selected")){
                uiBtns[i].className = btnClass.replace(" selected", "");
            }
        }
        obj.className += " selected"
        wordLength = num;
        startGame()
    }
}

function letterCheck(key) { // PRESS ANY KEY
    let inputBlock = Array.from(document.querySelectorAll('.inputBlock'));

    key.className += " inactiveKey";
    key.disabled = true;
    for (let i = 0; i < wordLength; i++) {
        if (key.id[3] === ranWord[i].toUpperCase()) {
            let starBlock = document.createElement('div');
            inputBlock[i].innerHTML = ranWord[i].toUpperCase();
            key.className = key.className.replace(" inactiveKey", " correctKey");
            key.appendChild(starBlock);
            starBlock.className = "starBlock";
            starBlock.innerHTML += " &bigstar;";
            isKey = true;
        }
    }
    if (isKey != true){
        f++;
        gameBoard.style.backgroundImage = bodyParts[f]
    }
    if (f == 9) {
        gameOver();
    }
    isKey = false;
    if(didWeWin()){console.log("winner")}
}

function resetKeys(keyEl){
    const starBlock = document.querySelectorAll('.starBlock');
    if(keyEl.className.includes(" inactiveKey")){
        keyEl.className = "keyBlock"
        keyEl.disabled = false;
    }
    if(keyEl.className.includes(" correctKey")){
        keyEl.className = "keyBlock";
        keyEl.disabled = false;
    }
    starBlock.forEach(el => {
        el.remove()
    });
}
function resetImg(){
    f = 0;
    gameBoard.style.backgroundImage = `url("./img/0.jpg")`;
}
function resetInputBlock(){
    let currentInpBlx = document.querySelectorAll(".inputBlock")
    currentInpBlx.forEach(element => {
        element.remove();
    });
    for(let i = 0; i < wordLength; i++){
        const answerBlock = document.createElement("div")
        inputWord.append(answerBlock)
        answerBlock.className = "inputBlock"
    }
}

function didWeWin(){
    let win = false
    let toWin = wordLength;
    let inputBlock = document.querySelectorAll(".inputBlock")
    inputBlock.forEach(element => {
        if(element.innerHTML){
            toWin--
        }
    });
    if(toWin === 0 && gameBoard.style.backgroundImage != `url("/img/10.jpg")`){
        win = true
    } else {
        win = false
    }
    return win
}

function anotherWord(){ // RESTART WITH CURRENT WORD LENGTH
    startGame()
}

function setWord(rWord) { // DISPLAY WINNING WORD
    let inputBlock = Array.from(document.querySelectorAll('.inputBlock'));
    for (let i = 0; i < inputBlock.length; i++) {
        inputBlock[i].innerHTML = rWord[i].toUpperCase();
        inputBlock[i].style.visibility='visible'
    }
}

function gameOver() {
    setWord(ranWord);
    for (let j = 0; j < keyBlock.length; j++){
        Array.from(keyBlock).forEach(element => {
            letterCheck(keyBlock[j])
        });
    }
}



