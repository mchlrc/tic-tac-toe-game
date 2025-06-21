const gameBoard = (function () {
  const blank = " ";

  let currentPlayer = "X";
  let winner = "";
  let turn = 0;

  const board = [
    [blank, blank, blank],
    [blank, blank, blank],
    [blank, blank, blank],
  ];

  const printBoardState = () => {
    console.group("printBoardState()");
    let rowText = "";
    board.forEach((row) => {
      row.forEach((col) => {
        rowText = rowText + " " + col;
      });
      rowText = rowText + "\n";
      console.log(rowText);
      rowText = "";
    });
    console.groupEnd();
  };

  const isPositionValid = (row, col) => {
    if (row < 0 || row > board.length) {
      console.log(`Row '${row}' is invalid`);
      return false;
    }

    if (col < 0 || col > board[row].length) {
      console.log(`Col '${col}' is invalid`);
      return false;
    }
    return true;
  };

  const getPositionValue = (row, col) => {
    if (isPositionValid(row, col)) {
      return board[row][col];
    }
  };

  const setPositionValue = (row, col, val) => {
    let result = false;
    if (isPositionValid(row, col)) {
      if (
        (getPositionValue(row, col) === blank && winner === "") ||
        val === blank
      ) {
        // console.log(`setPositionValue(${row}, ${col}, ${val}): Success`);
        board[row][col] = val;

        if (val !== blank) {
          turn++;
          if (!checkForWin(val) && turn >= 9) {
            console.log(`It's a draw!`);
            showResetButton();
          }
        }
        result = true;
      } else {
        // console.log(`setPositionValue(${row}, ${col}, ${val}): spot is taken`);
      }
    } else {
      // console.log(
      //   `setPositionValue(${row}, ${col}, ${val}): Spot is not valid`
      // );
    }
    return result;
  };

  const checkForWin = (marker) => {
    possibleWins = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [2, 0],
        [1, 1],
        [0, 2],
      ],
    ];

    let results = possibleWins.map((win) => {
      let result = win.reduce((accumulator, currentValue) => {
        let num = board[currentValue[0]][currentValue[1]] === marker ? 1 : 0;
        return accumulator + num;
      }, 0);
      return result;
    });

    if (
      results.findIndex((num) => {
        return num === 3;
      }) !== -1
    ) {
      console.log(`${marker} Wins!`);
      winner = marker;
      showResetButton();
      return true;
    } else {
      // console.log(`${marker} did not win this turn`);
      return false;
    }
  };

  const createBoard = () => {
    // printBoardState();
    const board = document.querySelector("div + .board");

    for (i = 0; i < 3; i++) {
      let row = document.createElement("div");
      row.classList.add("board-row");
      board.appendChild(row);
      for (j = 0; j < 3; j++) {
        let col = createButton(i, j);
        row.appendChild(col);
      }
    }
  };

  const resetBoard = () => {
    // console.group("resetBoard()");
    spaces = document.querySelectorAll(".board-space");
    next = nextPlayer();

    spaces.forEach((button) => {
      currentPlayer = blank;
      // console.log("currentPlayer = " + currentPlayer);
      button.click();
    });
    currentPlayer = next;
    // console.groupEnd();
    winner = "";
    turn = 0;
  };

  const createButton = (row, col) => {
    let button = document.createElement("Button");
    button.dataset.row = row;
    button.dataset.col = col;
    button.classList.add("board-space");
    button.addEventListener("click", () => {
      let player = getCurrentPlayer();
      if (setPositionValue(button.dataset.row, button.dataset.col, player)) {
        button.textContent = player;
        nextPlayer();
      }
    });
    return button;
  };

  const showResetButton = () => {
    const output = document.querySelector("div + .output");
    resetButton = document.createElement("button");
    resetButton.textContent = "Play Again";
    resetButton.addEventListener("click", () => {
      resetBoard();
      resetButton.remove();
    });
    output.appendChild(resetButton);
  };

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  const nextPlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    return currentPlayer;
  };

  return {
    printBoardState,
    getPositionValue,
    setPositionValue,
    checkForWin,
    createBoard,
  };
})();

gameBoard.createBoard();
