
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
        console.log(ranWord)
    }
    if(ranWord.includes("-")){
        getNewWord(length)
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
    endAnimation(false)
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
            inputBlock[i].innerHTML = ranWord[i].toUpperCase();
            key.className = key.className.replace(" inactiveKey", " correctKey");
            isKey = true;
            appendStar(key)
            didWeWin()
        }
    }
    if (isKey !== true){
        f++;
        gameBoard.style.backgroundImage = bodyParts[f]
    }
    if (f === 9) {
        // let win = false
        gameOver(false);
    } else {lose = false}
    isKey = false;
}

let starBlockCont = document.querySelectorAll(".starBlockCont")

function appendStar(key){
    let starBlock = document.createElement('div');
    key.children[0].append(starBlock);
    starBlockCont.className = "starBlockCont";
    starBlock.className = "starBlock";
    starBlock.innerHTML += " &bigstar;";
    if(key.children[0].children.length > 2){
        for(let i = 0; i < key.children[0].children.length; i++){
            key.children[0].children[i].style.fontSize = "6pt";
        }
    }
}

function didWeWin(){
    let win = false
    let toWin = wordLength;
    let inputBlock = document.querySelectorAll(".inputBlock")
    inputBlock.forEach(element => {
        if(element.innerHTML){ toWin-- }
    });
    if(toWin === 0 && gameBoard.style.backgroundImage !== `url("/img/10.jpg")`){
        // win = true
        gameOver(true)
    } else {
        win = false
    }
}

function resetKeys(keyEl){
    const starBlock = document.querySelectorAll('.starBlock');
    if(keyEl.className.includes(" inactiveKey") || keyEl.className.includes(" correctKey")){
        keyEl.className = "keyBlock"
    }
    Array.from(keyBlock).forEach(el => {
        el.disabled = false;
    })
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


function anotherWord(){ // RESTART WITH CURRENT WORD LENGTH
    startGame()
}

function setWord(rWord) { // DISPLAY WINNING WORD
    const inputBlock = Array.from(document.querySelectorAll('.inputBlock'));
    for (let i = 0; i < inputBlock.length; i++) {
        inputBlock[i].innerHTML = rWord[i].toUpperCase();
        inputBlock[i].style.visibility='visible'
    }
}


//          Create timer for correct keys to bounce
//          Input blocks bounce through letters with timer



function gameOver(answer) { // DID WE WIN OR LOSE
    const inputBlock = Array.from(document.querySelectorAll('.inputBlock'));
    if(answer === false){ // LOSE
        setWord(ranWord);
        Array.from(keyBlock).forEach(element => {
            if(!element.className.includes("correctKey")) {
                letterCheck(element)
            }
        })
    }
    if(answer === true){ // WIN
        endAnimation(true)
        let count = 0
        if(count === 0){
            // gameBoard.style.backgroundImage = endAnimation[0];
            Array.from(keyBlock).forEach(element => {
                element.disabled = true
            })
            count++
        }
    }
}


function endAnimation(go){
    const inputBlock = Array.from(document.querySelectorAll('.inputBlock'));
    let endFrame = [`url("/img/end-1.png")`,`url("/img/end-2.png")`,`url("/img/end-3.png")`,`url("/img/end-4.png")`];
    let frame = 0;
    let tempPos = 0;
    if(go === true){
    inputBlock[tempPos].className += " jumpLetter"
    let keyBounce = setInterval(() => {
            for(let i = 0; i < inputBlock.length; i++){
                if(inputBlock[i].className.includes("jumpLetter")){
                    inputBlock[i].className = inputBlock[i].className.replace(" jumpLetter", "")
                    // console.log(inputBlock[i].className)
                    tempPos = i + 1
                    if(tempPos === inputBlock.length){
                        tempPos = 0;
                    }
                }
            }
            if(frame === endFrame.length){
                frame = 0;
            }
            gameBoard.style.backgroundImage = endFrame[frame]
            inputBlock[tempPos].className += " jumpLetter"
            frame++
            tempPos++
            console.log(gameBoard.style.backgroundImage)
        }, 500)
    }

        // clearInterval(keyBounce)

}

