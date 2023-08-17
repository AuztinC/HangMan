
// document.addEventListener("DOMContentLoaded", () =>  { // ON LOAD


let bodyParts = [`url("/img/1.jpg")`,`url("/img/2.jpg")`,`url("/img/3.jpg")`,`url("/img/4.jpg")`,`url("/img/5.jpg")`,`url("/img/6.jpg")`,`url("/img/7.jpg")`,`url("/img/8.jpg")`,`url("/img/9.jpg")`,`url("/img/10.jpg")`];
let f = 0;
let ranWord = "";
let wordLength = 4;
let answerBlock = document.createElement("div")
let gameBoard = document.getElementById('gameBoard');
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
// getNewWord(function(w){console.log(w)})
getNewWord(wordLength)

function setWord(rWord) { // DISPLAY WINNING WORD
    for (i = 0; i < inputBlock.length; i++) {
        inputBlock[i].innerHTML = rWord[i].toUpperCase();
        inputBlock[i].style.visibility='visible'
    }
}
// })// END ON LOAD

let inputBlock = Array.from(document.querySelectorAll('.inputBlock'));
// let container = document.getElementById('container');
// let keyRow = document.getElementsByClassName('keyRow');
let keyBlock = document.getElementsByClassName('keyBlock');
let keyRow = $('.keyRow');

let isKey = false;
function letterCheck(key) { // PRESS ANY KEY

    // console.log(key.offsetTop)
    key.className = "inactiveKey";
    key.disabled = true;

    for (i = 0; i < inputBlock.length; i++) {
        if (key.id[3] == ranWord[i].toUpperCase()) {
            let starBlock = document.createElement('div');
            inputBlock[i].innerHTML = ranWord[i].toUpperCase();
            key.className = "correctKey";
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
    if (f == wordLength) {
        gameOver();
    }
    // console.log(f)
    isKey = false;
}

function anotherWord(){
    location.reload();
}

function gameOver() {
    setWord(ranWord);
    // console.log(keyBlock.length)
    for (j = 0; j < keyBlock.length; j++){
        // console.log()
        keyBlock.length.forEach(letterCheck(keyBlock[j].id[3]));
    }
}



