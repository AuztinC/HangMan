
// document.addEventListener("DOMContentLoaded", () =>  { // ON LOAD


let bodyParts = [`url("/img/1.jpg")`,`url("/img/2.jpg")`,`url("/img/3.jpg")`,`url("/img/4.jpg")`,`url("/img/5.jpg")`,`url("/img/6.jpg")`,`url("/img/7.jpg")`,`url("/img/8.jpg")`,`url("/img/9.jpg")`,`url("/img/10.jpg")`];
let f = 0;
let ranWord = "";
let gameBoard = document.getElementById('gameBoard');
// ACCESS RANDOM WORD API
async function getNewWord(){
    let something = new XMLHttpRequest();
    something.open("GET", "https://random-word-api.vercel.app/api?words=1&length=9");

    
    something.onload = function(){
        ranWord = something.responseText.slice(2, something.response.length - 2);
        // console.log(ranWord);
    }
    something.send();
}
// getNewWord(function(w){console.log(w)})

function setWord(rWord) {
    for (i = 0; i < inputBlock.length; i++) {
        inputBlock[i].innerHTML = rWord[i].toUpperCase();
        inputBlock[i].style.visibility='visible'
        // key[i].className = "activeKey";
    }
}
getNewWord() 
// })// END ON LOAD

let inputBlock = Array.from(document.querySelectorAll('.inputBlock'));
// let container = document.getElementById('container');
// let keyRow = document.getElementsByClassName('keyRow');
let isKey = false;

function letterCheck(key) { // PRESS ANY KEY
    
    let starBlock = document.createElement('div');
    // console.log(key.offsetTop)
    key.className = "inactiveKey";
    key.disabled = true;
    
    for (i = 0; i < inputBlock.length; i++) {
        if (key.id[3] == ranWord[i].toUpperCase()) {    
            inputBlock[i].innerHTML = ranWord[i].toUpperCase();
            key.className = "correctKey";
            key.appendChild(starBlock);
            starBlock.className = "starBlock"; 
            // starBlock.style.top = key.offsetTop;
            // starBlock.style.left = key.offetLeft;
            starBlock.innerHTML += " &bigstar;";
            isKey = true;
        }
    }
    if (isKey != true){
        f++;
        gameBoard.style.backgroundImage = bodyParts[f]
    } 
    isKey = false;
}