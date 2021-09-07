const boardEl = document.querySelectorAll(".board-pos");
const newGameBtnEl = document.querySelector(".new-game-btn");
const messageEl = document.querySelector(".message");
const players = ["X", "O"];
let currentPlayer, disabledButtons, board;

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

const setPosition = function (posEl, posX, posY) {
    const isBlankPos = board[posX][posY] === "";
    if (isBlankPos) {
        const newVal = currentPlayer ? 0 : 1;
        board[posX][posY] = players[currentPlayer];
        posEl.textContent = players[currentPlayer];
        currentPlayer = newVal;
        setMessage(`It is Player ${players[newVal]}'s Turn`);
        return;
    }
    setMessage("This position is occupied!");
};

const newGame = function () {
    currentPlayer = 0;
    disabledButtons = false;
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
