function Gameboard() {
    const rows = 6;
    const columns = 7;
    const board = [];
  
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(Cell());
      }
    }
  
    const getBoard = () => board;
  
    const dropToken = (column, player) => {
      const availableCells = board.filter((row) => row[column].getValue() === 0).map(row => row[column]);
  
      if (!availableCells.length) return;
  
      const lowestRow = availableCells.length - 1;
      board[lowestRow][column].addToken(player);
    };
  
    const printBoard = () => {
      const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
      console.log(boardWithCellValues);
    };
  
    return { getBoard, dropToken, printBoard };
  }
  
  function Cell() {
    let value = 0;
  
    const addToken = (player) => {
      value = player;
    };
  
    const getValue = () => value;
  
    return {
      addToken,
      getValue
    };
  }
  
  
  
  
  
  
  function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
  ) {
    const board = Gameboard();
  
    const players = [
      {
        name: playerOneName,
        token: 1
      },
      {
        name: playerTwoName,
        token: 2
      }
    ];
  
    let activePlayer = players[0];
    let winner = null;
  
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;
    const getWinner = () => winner;
  
    const checkForWinner = (board, row, col, token) => {
      // Check horizontally
      let count = 0;
      for (let i = 0; i < board[row].length; i++) {
        if (board[row][i].getValue() === token) {
          count++;
          if (count === 4) return true;
        } else {
          count = 0;
        }
      }
  
      // Check vertically
      count = 0;
      for (let i = 0; i < board.length; i++) {
        if (board[i][col].getValue() === token) {
          count++;
          if (count === 4) return true;
        } else {
          count = 0;
        }
      }
  
      // Add diagonal checks here if needed
  
  
  
  
  
  
      
      // ...
  
      return false;
    };
  
    const printNewRound = () => {
      board.printBoard();
      if (winner) {
        document.title = `${winner.name} wins! - Connect Four`;
      } else {
        document.title = `${getActivePlayer().name}'s turn - Connect Four`;
      }
    };
  
    const playRound = (column) => {
      if (winner) return;
      console.log(
        `Dropping ${getActivePlayer().name}'s token into column ${column}...`
      );
      board.dropToken(column, getActivePlayer().token);
  
      const updatedBoard = board.getBoard();
      const lastMove = updatedBoard.find(row => row[column].getValue() !== 0);
      const row = updatedBoard.indexOf(lastMove);
      const col = column;
  
      if (checkForWinner(updatedBoard, row, col, getActivePlayer().token)) {
        winner = getActivePlayer();
      } else {
        switchPlayerTurn();
      }
      printNewRound();
    };
  
    printNewRound();
  
    return {
      playRound,
      getActivePlayer,
      getBoard: board.getBoard,
      getWinner
    };
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const title = document.querySelector('h1');
  
    const updateScreen = () => {
  
      boardDiv.textContent = "";
  
      const board = game.getBoard();
      const activePlayer = game.getActivePlayer();
      const winner = game.getWinner();
  
  
      if (winner) {
        title.textContent = `${winner.name} wins!`;
      } else {
        title.textContent = `${activePlayer.name}'s turn`;
      }
  
      board.forEach(row => {
        row.forEach((cell, index) => {
  
          const cellButton = document.createElement("button");
          cellButton.classList.add("cell");
  
          cellButton.dataset.column = index
          cellButton.textContent = cell.getValue();
          boardDiv.appendChild(cellButton);
        })
      })
    }
  
  
    function clickHandlerBoard(e) {
      const selectedColumn = e.target.dataset.column;
  
      if (!selectedColumn) return;
      
      game.playRound(selectedColumn);
      updateScreen();
    }
    boardDiv.addEventListener("click", clickHandlerBoard);
  
  
    updateScreen();
  
  }
  
  ScreenController();
  