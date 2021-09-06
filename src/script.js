const boardEl = document.querySelectorAll(".board-pos");
const newGameBtnEl = document.querySelector(".new-game-btn");
const players = ["X", "O"];
let currentPlayer, board;

const newGame = function () {
    currentPlayer = 0;
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];
    for (const pos of boardEl) pos.textContent = "";
};
newGame();

const setPosition = function (posEl, posX, posY) {
    const newVal = currentPlayer ? 0 : 1;
    board[posX][posY] = players[currentPlayer];
    posEl.textContent = players[currentPlayer];
    currentPlayer = newVal;
};

const positionSelected = function (posEl) {
    const [strPosY, strPosX] = posEl.id.split(",");
    const [posX, posY] = [Number(strPosX), Number(strPosY)];
    setPosition(posEl, posX, posY);
};

newGameBtnEl.addEventListener("click", newGame);

for (const pos of boardEl)
    pos.addEventListener("click", () => positionSelected(pos));
