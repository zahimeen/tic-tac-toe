const containerBoard = document.querySelector(".board");

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
                >X</button>
            `,
            );
        }
    }

    return {
        guiBoard: [...document.querySelectorAll(".board__btn")],
        localBoard: board,
    };
};

let { guiBoard, localBoard: board } = createBoard(3);
