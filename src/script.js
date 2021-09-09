const boardEl = document.querySelectorAll(".board-pos");
const newGameBtnEl = document.querySelector(".new-game-btn");
const messageEl = document.querySelector(".message");
const players = ["X", "O"];
const scores = [0, 0];
const scoresEl = document.querySelectorAll(".score");
let currentPlayer, disabledButtons, turnsTaken, board;

const setMessage = (msg) => (messageEl.textContent = msg);

const isThreeInARow = function (desiredValue, values) {
    for (const val of values) {
        if (val !== desiredValue) return false;
    }
    return true;
};

const highlightPositions = function (coords) {
    for (const coord of coords) {
        const posEl = document.querySelector(`#c${coord[0]}${coord[1]}`);
        posEl.classList.add("winning-move");
    }
    return true;
};

const isWinningMove = function (playerVal, thisPosX, thisPosY) {
    const ver = { coords: [], vals: [] };
    const hor = { coords: [], vals: [] };
    const posDia = { coords: [], vals: [] };
    const negDia = { coords: [], vals: [] };
    for (let i = 0; i < 3; i++) {
        hor.vals.push(board[i][thisPosX]);
        ver.vals.push(board[thisPosY][i]);
        posDia.vals.push(board[2 - i][i]);
        negDia.vals.push(board[2 - i][2 - i]);
        hor.coords.push([i, thisPosX]);
        ver.coords.push([thisPosY, i]);
        posDia.coords.push([2 - i, 2 - i]);
        negDia.coords.push([2 - i, i]);
    }
    return (
        (isThreeInARow(playerVal, hor.vals) &&
            highlightPositions(hor.coords)) ||
        (isThreeInARow(playerVal, ver.vals) &&
            highlightPositions(ver.coords)) ||
        (isThreeInARow(playerVal, posDia.vals) &&
            highlightPositions(negDia.coords)) ||
        (isThreeInARow(playerVal, negDia.vals) &&
            highlightPositions(posDia.coords))
    );
};

const getGameStatus = function (playerVal, posX, posY) {
    if (turnsTaken < 5) return { msg: "", isFinished: false };

    if (isWinningMove(playerVal, posX, posY))
        return { msg: `Player ${playerVal} Wins!`, isFinished: true };

    if (turnsTaken >= 9) {
        for (const pos of boardEl) {
            pos.classList.add("draw");
        }
        return { msg: "Draw!", isFinished: true };
    }
    return { msg: "", isFinished: false };
};

const setGameStatus = function (newPlayer, posX, posY) {
    const gameStatus = getGameStatus(players[currentPlayer], posX, posY);
    if (gameStatus.isFinished) {
        disableButtons();
        setMessage(gameStatus.msg);
        scores[currentPlayer] += 1;
        scoresEl[currentPlayer].textContent = `Player ${currentPlayer + 1}: ${
            scores[currentPlayer]
        }`;
        return;
    }
    setMessage(`It is Player ${players[newPlayer]}'s Turn`);
};

const setPosition = function (posEl, posX, posY) {
    const isBlankPos = board[posY][posX] === "";
    if (isBlankPos) {
        const newPlayer = currentPlayer ? 0 : 1;
        board[posY][posX] = players[currentPlayer];
        posEl.textContent = players[currentPlayer];
        turnsTaken += 1;
        setGameStatus(newPlayer, posX, posY);
        currentPlayer = newPlayer;
        return;
    }
    setMessage("This position is occupied!");
};

const positionSelected = function () {
    const [strPosY, strPosX] = [this.id[1], this.id[2]];
    const [posX, posY] = [Number(strPosX), Number(strPosY)];
    setPosition(this, posX, posY);
};

const disableButtons = function () {
    for (const pos of boardEl) {
        pos.removeEventListener("click", positionSelected);
    }
    disabledButtons = true;
};

const newGame = function () {
    currentPlayer = 0;
    disabledButtons = false;
    turnsTaken = 0;
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];
    for (const pos of boardEl) pos.textContent = "";
    if (!disabledButtons) {
        for (const posEl of boardEl) {
            posEl.addEventListener("click", positionSelected);
            posEl.classList.remove("winning-move");
            posEl.classList.remove("draw");
        }
    }
    setMessage("It is Player X's Turn");
};
newGame();

newGameBtnEl.addEventListener("click", newGame);
