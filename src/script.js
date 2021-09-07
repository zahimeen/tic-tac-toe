const boardEl = document.querySelectorAll(".board-pos");
const newGameBtnEl = document.querySelector(".new-game-btn");
const messageEl = document.querySelector(".message");
const players = ["X", "O"];

const setMessage = (msg) => (messageEl.textContent = msg);

let currentPlayer, board;
const newGame = function () {
    currentPlayer = 0;
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];
    for (const pos of boardEl) pos.textContent = "";
    setMessage("It is Player X's Turn");
};
newGame();

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

const positionSelected = function (posEl) {
    const [strPosY, strPosX] = posEl.id.split(",");
    const [posX, posY] = [Number(strPosX), Number(strPosY)];
    setPosition(posEl, posX, posY);
};

newGameBtnEl.addEventListener("click", newGame);

for (const pos of boardEl)
    pos.addEventListener("click", () => positionSelected(pos));
