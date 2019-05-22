/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var nScores, nRoundScore, nActivePlayer, bGamePlaying, nPreviousRoll, nWinningScore;

init();

function onRollDiceClicked(){
    let nDice = Math.floor(Math.random() * 6) + 1;
    console.log(nDice);

    querySelector(".dice").style.display = "block";
    querySelector(".dice").src = "dice-" + nDice + ".png";

    if (nDice !== 1){
        if (nDice === 6 && nPreviousRoll === 6) {
            resetScoresToZero();
            nextPlayer();
        } else {
            addRoundScore(nDice);
            nPreviousRoll = nDice;
        }
    } else {
        nextPlayer();
    }
}

function addRoundScore(nScore){
    nRoundScore += nScore;
    getElementById("current-" + nActivePlayer).textContent = nRoundScore;
}

function onHoldClicked() {
    nScores[nActivePlayer] += nRoundScore;
    getElementById("score-" + nActivePlayer).textContent = nScores[nActivePlayer];

    let input = querySelector(".final-score").value;
    if (input) {
        nWinningScore = input;
    } else {
        nWinningScore = 100;
    }
    console.log(nWinningScore);
    ifPlayerWin();
}

function nextPlayer() {
    getElementById("current-" + nActivePlayer).textContent = "0";
    nActivePlayer === 0 ? nActivePlayer = 1 : nActivePlayer = 0;
    nRoundScore = 0;

    querySelector(".player-0-panel").classList.toggle("active");
    querySelector(".player-1-panel").classList.toggle("active");

    querySelector(".dice").style.display = "none";
}

function ifPlayerWin() {
    if (nScores[nActivePlayer] >= nWinningScore) {
        bGamePlaying = false;
        getElementById("name-" + nActivePlayer).textContent = "Winner!";
        querySelector(".dice").style.display = "none";
        querySelector(".player-" + nActivePlayer + "-panel").classList.add("winner");
        querySelector(".player-" + nActivePlayer + "-panel").classList.remove("active");
        disableButtons();
    } else {
        nextPlayer();
    }
}

function resetScoresToZero() {
    nScores[nActivePlayer] = 0;
    getElementById("score-" + nActivePlayer).textContent = "0";
}

function init(){
    initVariables();
    hideDice();
    initTexts();
    initStartingState();
    enableButtons();
}

function hideDice(){
    querySelector(".dice").style.display = "none";
}

function enableButtons(){
    querySelector(".btn-roll").disabled = false;
    querySelector(".btn-hold").disabled = false;
}

function disableButtons(){
    querySelector(".btn-roll").disabled = true;
    querySelector(".btn-hold").disabled = true;
}

function getElementById(id){
    return document.getElementById(id);
}

function querySelector(arg){
    return document.querySelector(arg);
}

function initVariables(){
    bGamePlaying = true;
    nScores = [0,0];
    nActivePlayer = 0;
    nRoundScore = 0;
    nPreviousRoll = 0;
}

function initTexts() {
    getElementById("score-0").textContent = "0";
    getElementById("current-0").textContent = "0";
    getElementById("score-1").textContent = "0";
    getElementById("current-1").textContent = "0";

    getElementById("name-0").textContent = "Player 1";
    getElementById("name-1").textContent = "Player 2";
}

function initStartingState() {
    querySelector(".player-0-panel").classList.remove("winner");
    querySelector(".player-1-panel").classList.remove("winner");

    querySelector(".player-0-panel").classList.remove("active");
    querySelector(".player-1-panel").classList.remove("active");

    querySelector(".player-0-panel").classList.add("active");
}