const boardEl = document.querySelectorAll(".board-pos");
const newGameBtnEl = document.querySelector(".new-game-btn");
const messageEl = document.querySelector(".message");
const players = ["X", "O"];
let currentPlayer, disabledButtons, turnsTaken, board;

const setMessage = (msg) => (messageEl.textContent = msg);

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

const getGameStatus = function () {
    if (turnsTaken < 5) return { msg: "", isFinished: false };
    if (turnsTaken >= 9) return { msg: "Draw!", isFinished: true };
};

const setGameStatus = function (newPlayer) {
    const gameStatus = getGameStatus();
    if (gameStatus.isFinished) {
        disableButtons();
        setMessage(gameStatus.msg);
        return;
    }
    setMessage(`It is Player ${players[newPlayer]}'s Turn`);
};

const setPosition = function (posEl, posX, posY) {
    const isBlankPos = board[posX][posY] === "";
    if (isBlankPos) {
        const newPlayer = currentPlayer ? 0 : 1;
        board[posX][posY] = players[currentPlayer];
        posEl.textContent = players[currentPlayer];
        currentPlayer = newPlayer;
        turnsTaken += 1;
        setGameStatus(newPlayer);
        return;
    }
    setMessage("This position is occupied!");
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
