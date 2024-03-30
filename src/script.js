"use strict";

const containerBoard = document.querySelector(".board");
const btnNewGame = document.querySelector(".new-game__btn");
const labelMessage = document.querySelector(".message__label");
const valueScores = [...document.querySelectorAll(".score__value")];

const playerValues = ["X", "O"];
const boardLength = 3;
const gameWinningLength = 3;
const minimumPlayCount = gameWinningLength * 2 - 1;
const drawPlayCount = boardLength ** 2;

let guiBoard, localBoard, currentPlayer, playing, playCount;
let scores = [0, 0];

const createBoard = function(length) {
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
	localBoard = [];
	guiBoard = [];

	for (let y = 0; y < length; y++) {
		localBoard.push([]);
		guiBoard.push([]);
		for (let x = 0; x < length; x++) {
			localBoard[y].push("");

			const btnHTML = `
                <button
                    type="button"
                    class="board__btn pos--x-${x} pos--y-${y}"
                    style="${style}"
                ></button>
            `;
			containerBoard.insertAdjacentHTML("beforeend", btnHTML);
		}
	}

	guiBoard = [...document.querySelectorAll(".board__btn")];
};

const toggleBoardFunctionality = function() {
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

const highlightBtns = function(coords) {
	coords.forEach(([x, y]) =>
		document
			.querySelector(`.pos--x-${x}.pos--y-${y}`)
			.classList.add("board__btn--highlight"),
	);
};

const isWinning = function(vals) {
	let highConsec = 0;
	let currConsec = 0;
	for (const val of vals) {
		if (val !== playerValues[currentPlayer]) {
			if (currConsec > highConsec) highConsec = currConsec;
			currConsec = 0;
			continue;
		}
		currConsec++;
	}
	if (currConsec > highConsec) highConsec = currConsec;
	return highConsec >= gameWinningLength;
};

const getValues = function(coordinates) {
	const values = [];
	coordinates.forEach(([x, y]) => values.push(localBoard[y][x]));
	return values;
};

const getWinningCoords = function(xCoords, yCoords) {
	const coords = [[], [], [], []];
	const [verCoords, horCoords, posDiaCoords, negDiaCoords] = coords;
	for (let i = 0; i < 3; i++) {
		verCoords.push([xCoords, i]);
		horCoords.push([i, yCoords]);
		posDiaCoords.push([i, gameWinningLength - 1 - i]);
		negDiaCoords.push([i, i]);
	}

	const vals = coords.map((cds) => getValues(cds));
	for (const [i, val] of vals.entries()) {
		const isWin = isWinning(val);
		if (isWin) return coords[i];
	}
};

const getGameStatus = function(xCoords, yCoords) {
	if (playCount >= drawPlayCount) {
		for (const btn of guiBoard) {
			btn.classList.add("board__btn--highlight");
		}
		return { msg: "Draw!", playing: false };
	}

	if (playCount >= minimumPlayCount) {
		const winningCoords = getWinningCoords(
			Number.parseInt(xCoords),
			Number.parseInt(yCoords),
		);
		if (winningCoords) {
			updateScores(currentPlayer);
			highlightBtns(winningCoords);
			return {
				msg: `${playerValues[currentPlayer]} won!`,
				playing: false,
			};
		}
	}

	return {
		msg: `it is ${playerValues[currentPlayer]}'s turn!`,
		playing: true,
	};
};

const updateMessage = (msg) => (labelMessage.textContent = msg);

const updateScores = function(player) {
	if (Number.isFinite(player)) scores[player]++;
	valueScores.forEach((score, i) => (score.textContent = scores[i]));
};

const updateBoard = function(btn, xCoords, yCoords) {
	if (localBoard[yCoords][xCoords] !== "")
		return updateMessage(`that position is occupied!`);

	const value = playerValues[currentPlayer];
	localBoard[yCoords][xCoords] = value;
	btn.textContent = value;
	playCount++;


	const gameStatus = getGameStatus(xCoords, yCoords);
	if (!gameStatus.playing) {
		playing = false;
		toggleBoardFunctionality();
	}
	updateMessage(gameStatus.msg);

	currentPlayer = currentPlayer ? 0 : 1;
};

const createGame = function() {
	playing = true;
	playCount = 0;
	currentPlayer = 0;

	createBoard(boardLength);
	updateScores();
	updateMessage("it is x's turn!");

	toggleBoardFunctionality();
};
createGame();

btnNewGame.addEventListener("click", createGame);
