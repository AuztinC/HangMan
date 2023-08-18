
let bodyParts = [`url("/img/1.jpg")`,`url("/img/2.jpg")`,`url("/img/3.jpg")`,`url("/img/4.jpg")`,`url("/img/5.jpg")`,`url("/img/6.jpg")`,`url("/img/7.jpg")`,`url("/img/8.jpg")`,`url("/img/9.jpg")`,`url("/img/10.jpg")`];
let f = 0;
let ranWord = "";
let wordLength = 4;
let answerBlock = document.createElement("div")
let gameBoard = document.getElementById('gameBoard');
let keyBlock = document.getElementsByClassName('keyBlock');
let uiBtns = document.getElementsByClassName("btn")
let keyRow = $('.keyRow');
let isKey = false;
let inputBlock = Array.from(document.querySelectorAll('.inputBlock'));


// ACCESS RANDOM WORD API
async function getNewWord(length){
    let something = new XMLHttpRequest();
    something.open("GET", `https://random-word-api.vercel.app/api?words=1&length=${length}`);
    something.onload = function(){
        ranWord = something.responseText.slice(2, something.response.length - 2);
        // console.log(ranWord);
    }
    something.send();
}

function startGame(){ //        START THIS MFER UP
                //  TODOOOOS
    // reset keyboard || loop through all keys remove inactive and active classes
    // reset images
    // clear input blocks
    // append input blocks
    // console.log(keyBlock.length)
    Array.from(keyBlock).forEach(keyEl => {
        resetKeys(keyEl)
    });

    getNewWord(wordLength)
}
startGame()

function setWordLength(obj, num){  // CHANGE GAME ACCORDING TO WORD LENGTH

    for(let i = 0; i < uiBtns.length; i++){
        let btnClass = uiBtns[i].className
        if(btnClass.includes(" selected")){
            uiBtns[i].className = btnClass.replace(" selected", "");
            console.log(uiBtns[i])
        }
    }
    obj.className += " selected"
    wordLength = num;
    startGame()
}

function letterCheck(key) { // PRESS ANY KEY

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
}

function resetKeys(keyEl){
    let key = keyEl.className
    if(key.includes(" inactiveKey")){
        key = key.replace(" inactiveKey", "")
        key = key.disabled = false;
        // console.log(key)
    }
    if(key.includes(" correctKey")){
        key = key.replace(" correctKey", "");
        key = key.disabled = false;
    }
}

function anotherWord(){ // RESTART WITH CURRENT WORD LENGTH
    startGame()
}

function setWord(rWord) { // DISPLAY WINNING WORD
    for (let i = 0; i < inputBlock.length; i++) {
        inputBlock[i].innerHTML = rWord[i].toUpperCase();
        inputBlock[i].style.visibility='visible'
    }
}

function gameOver() {
    setWord(ranWord);
    for (let j = 0; j < keyBlock.length; j++){
        keyBlock.length.forEach(letterCheck(keyBlock[j].id[3]));
    }
}



