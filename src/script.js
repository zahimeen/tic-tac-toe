const boardEl = document.querySelectorAll(".board-pos");
const newGameBtnEl = document.querySelector(".new-game-btn");
const messageEl = document.querySelector(".message");
const players = ["X", "O"];
let currentPlayer, disabledButtons, turnsTaken, board;

const setMessage = (msg) => (messageEl.textContent = msg);

const isThreeInARow = function (desiredValue, values) {
    for (const val of values) {
        if (val !== desiredValue) return false;
    }
    return true;
};

const isVerticalWin = function (playerVal, posX) {
    const vals = [];
    for (let posY = 0; posY < 3; posY++) {
        const val = board[posY][posX];
        vals.push(val);
    }
    return isThreeInARow(playerVal, vals);
};

const getGameStatus = function (playerVal, posX, posY) {
    if (turnsTaken < 5) return { msg: "", isFinished: false };

    if (isVerticalWin(playerVal, posX))
        return { msg: `Player ${playerVal} Wins!`, isFinished: true };

    if (turnsTaken >= 9) return { msg: "Draw!", isFinished: true };
    return { msg: "", isFinished: false };
};

const setGameStatus = function (newPlayer, posX, posY) {
    const gameStatus = getGameStatus(players[currentPlayer], posX, posY);
    if (gameStatus.isFinished) {
        disableButtons();
        setMessage(gameStatus.msg);
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
    const [strPosY, strPosX] = this.id.split(",");
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
        for (const pos of boardEl) {
            pos.addEventListener("click", positionSelected);
        }
    }
    setMessage("It is Player X's Turn");
};
newGame();

newGameBtnEl.addEventListener("click", newGame);
