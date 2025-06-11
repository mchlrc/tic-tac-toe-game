console.log("Hello World!");

const gameboard = (function () {
  // if (!new.target) {
  //   throw Error("You must use the 'new' operator to call the constructor");
  // }
  const board = [
    ["x", "o", "o"],
    ["o", "x", "o"],
    ["o", "o", "x"],
  ];
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
    let result = true;
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
      console.log(`getPositionValue(${row}, ${col}) = '${board[row][col]}'`);
      return board[row][col];
    }
  };

  const setPositionValue = (row, col, val) => {
    if (isPositionValid(row, col)) {
      if (getPositionValue(row, col) === "") {
        console.log(`setPositionValue(${row}, ${col}, ${val}): Success`);
      } else {
        console.log(`setPositionValue(${row}, ${col}, ${val}): spot is taken`);
      }
    } else {
      console.log(
        `setPositionValue(${row}, ${col}, ${val}): Spot is not valid`
      );
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

    possibleWins.map((win) => {
      console.log(win);
      let result = win.reduce((accumulator, currentValue) => {
        // return accumulator + currentValue[0] + currentValue[1];
        //return accumulator + board[currentValue[0]][currentValue[1]]
        let num = board[currentValue[0]][currentValue[1]] === marker ? 1 : 0;
        console.log(num);
        return accumulator + num;
      }, 0);
      console.log(`result = ${result}`);
      // console.log(result);
    });
  };

  return { printBoardState, getPositionValue, setPositionValue, checkForWin };
})();

gameboard.printBoardState();

// gameboard.getPositionValue(0, 0);

// gameboard.setPositionValue(1, 2, "x");

gameboard.checkForWin("x");
