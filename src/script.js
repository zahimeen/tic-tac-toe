const containerBoard = document.querySelector(".board");
const btnNewGame = document.querySelector(".new-game__btn");
const labelMessage = document.querySelector(".message__label");
const valueScores = [...document.querySelectorAll(".score__value")];

const playerValues = ["X", "O"];
const boardLength = 3;
const gameWinningLength = 3;

let guiBoard, localBoard, currentPlayer, scores, playing;

const createBoard = function (length = 3) {
    containerBoard.replaceChildren();

    const style = `
        max-height: calc(var(--board-max-length) / ${length});
        min-height: calc(var(--board-min-length) / ${length});
        max-width: calc(var(--board-max-length) / ${length});
        min-width: calc(var(--board-min-length) / ${length});
        height: calc(var(--board-length) / ${length});
        width: calc(var(--board-length) / ${length});
        font-size: calc(var(--board-min-length) / ${length + 0.5});
    `;
    const board = [];

    for (let y = 0; y < length; y++) {
        board.push([]);
        for (let x = 0; x < length; x++) {
            board[y].push("");

            containerBoard.insertAdjacentHTML(
                "beforeend",
                `
                <button 
                    type="button" 
                    class="board__btn pos--x-${x} pos--y-${y}"
                    style="${style}" 
                ></button>
                `,
            );
        }
    }

    localBoard = board;
    guiBoard = [...document.querySelectorAll(".board__btn")];
};

const updateMessage = (msg) => (labelMessage.textContent = msg);

const updateScores = function (player) {
    if (Number.isFinite(player)) scores[player]++;
    valueScores.forEach((score, i) => (score.textContent = scores[i]));
};

const updateBoard = function (btn, xCoords, yCoords) {
    if (localBoard[yCoords][xCoords] === "") {
        const value = playerValues[currentPlayer];
        localBoard[yCoords][xCoords] = value;
        btn.textContent = value;

        currentPlayer = currentPlayer ? 0 : 1;
        updateMessage(`it is ${playerValues[currentPlayer]}'s turn!`);
        return;
    }
    updateMessage(`that position is occupied!`);
};

const toggleBoardFunctionality = function () {
    if (playing) {
        guiBoard.forEach((btn) => {
            const [, xCoords, yCoords] = [...btn.classList].map((coordClass) =>
                coordClass.slice(coordClass.lastIndexOf("-") + 1),
            );
            btn.addEventListener(
                "click",
                updateBoard.bind(btn, btn, xCoords, yCoords),
            );
        });
        return;
    }
    guiBoard.forEach((btn) => (btn.disabled = true));
};

const createGame = function () {
    playing = true;
    currentPlayer = 0;
    scores = [0, 0];

    createBoard(boardLength);
    updateScores();
    updateMessage("it is x's turn!");

    toggleBoardFunctionality();
};
createGame();

btnNewGame.addEventListener("click", createGame);
