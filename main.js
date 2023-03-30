
// document.addEventListener("DOMContentLoaded", () =>  { // ON LOAD


let bodyParts = [`url("/img/4.jpg")`,`url("/img/5.jpg")`,`url("/img/6.jpg")`,`url("/img/7.jpg")`,`url("/img/8.jpg")`,`url("/img/9.jpg")`,`url("/img/10.jpg")`];
let ranWord = "";
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

// console.log(inputBlock)

function setWord(rWord) {
    for (i = 0; i < inputBlock.length; i++) {
        // console.log(inputBlock[i]);
        inputBlock[i].innerHTML = rWord[i].toUpperCase();
        inputBlock[i].style.visibility='visible'
    }
}
getNewWord() 

// })// END ON LOAD

let inputBlock = Array.from(document.querySelectorAll('.inputBlock'));
// let letterId = Array.from(document.querySelectorAll(`"#key" + letter`));

// console.log(letterId)


function letterCheck(key) {
    
    
    for (i = 0; i < inputBlock.length; i++) {
        console.log(ranWord[i])
        if (key.id[3] == ranWord[i].toUpperCase()) {    
            
            inputBlock[i].innerHTML = ranWord[i].toUpperCase();
            // ranWord[i].style.visibility='visible';
        }
    }
}