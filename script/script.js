console.log("Hello World!");

const gameBoard = (function () {
  // if (!new.target) {
  //   throw Error("You must use the 'new' operator to call the constructor");
  // }
  const blank = " ";

  let currentPlayer = "x";

  const board = [
    [blank, blank, blank],
    [blank, blank, blank],
    [blank, blank, blank],
  ];
  // const board = [
  //   ["x", "o", "o"],
  //   ["o", "x", "o"],
  //   ["o", "o", "x"],
  // ];
  // const board = [
  //   ["0,0", "0,1", "0,2"],
  //   ["1,0", "1,1", "1,2"],
  //   ["2,0", "2,1", "2,2"],
  // ];

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
    // let result = true;
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
      // console.log(`getPositionValue(${row}, ${col}) = '${board[row][col]}'`);
      return board[row][col];
    }
  };

  const setPositionValue = (row, col, val) => {
    if (isPositionValid(row, col)) {
      if (getPositionValue(row, col) === blank) {
        // console.log(`setPositionValue(${row}, ${col}, ${val}): Success`);
        board[row][col] = val;
        checkForWin(val);
      } else {
        // console.log(`setPositionValue(${row}, ${col}, ${val}): spot is taken`);
      }
    } else {
      console
        .log
        // `setPositionValue(${row}, ${col}, ${val}): Spot is not valid`
        ();
    }
    return true;
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
      // console.log(win);
      let result = win.reduce((accumulator, currentValue) => {
        // return accumulator + currentValue[0] + currentValue[1];
        //return accumulator + board[currentValue[0]][currentValue[1]]
        let num = board[currentValue[0]][currentValue[1]] === marker ? 1 : 0;
        // console.log(num);
        return accumulator + num;
      }, 0);

      // console.log(`result = ${result}`);
      return result;
      // console.log(result);
    });

    if (
      results.findIndex((num) => {
        return num === 3;
      }) !== -1
    ) {
      console.log(`${marker} Wins!`);
      return true;
    } else {
      // console.log(`${marker} did not win this turn`);
      return false;
    }
  };

  const createBoard = () => {
    printBoardState();
    const body = document.querySelector("body");
    const board = document.createElement("div");
    board.classList.add("board");
    body.appendChild(board);

    for (i = 0; i < 3; i++) {
      let row = document.createElement("div");
      row.classList.add("boardRow");
      board.appendChild(row);
      for (j = 0; j < 3; j++) {
        let col = createButton(i, j);
        row.appendChild(col);
      }
    }
  };

  const createButton = (row, col) => {
    let button = document.createElement("Button");
    button.textContent = " ";
    button.dataset.row = row;
    button.dataset.col = col;
    button.addEventListener("click", () => {
      console.log(`row = ${button.dataset.row}, col = ${button.dataset.col}`);
      let player = getCurrentPlayer();
      if (setPositionValue(button.dataset.row, button.dataset.col, player)) {
        button.textContent = player;
        nextPlayer();
      }
    });
    return button;
  };

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  const nextPlayer = () => {
    currentPlayer = currentPlayer === "x" ? "o" : "x";
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
// gameBoard.setPositionValue(1, 2, "x");
// gameBoard.printBoardState();
// gameBoard.setPositionValue(1, 1, "o");
// gameBoard.printBoardState();
// gameBoard.setPositionValue(2, 0, "x");
// gameBoard.printBoardState();
// gameBoard.setPositionValue(2, 1, "o");
// gameBoard.printBoardState();
// gameBoard.setPositionValue(0, 2, "x");
// gameBoard.printBoardState();
// gameBoard.setPositionValue(0, 1, "o");
// gameBoard.printBoardState();
// gameBoard.setPositionValue(1, 2, "x");
// gameBoard.printBoardState();
// gameBoard.setPositionValue(1, 2, "o");
// gameBoard.printBoardState();
// gameBoard.setPositionValue(1, 2, "x");
// gameBoard.printBoardState();

// gameBoard.getPositionValue(0, 0);

// gameBoard.setPositionValue(1, 2, "x");

// gameBoard.checkForWin("x");
