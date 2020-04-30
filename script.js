
const gameBoard = (() => {
  let gameState = ["", "", "", "", "", "", "", "", ""]
  return { gameState }
})();

const displayController = (() => {
  const selection = () => {
      selectText = document.querySelector('.game-status')
      selectText.innerHTML = 'Player 1 Turn.'
      const squares = document.querySelectorAll('.square')
      const selectPlayer = player();
      document.addEventListener('click', (e) => {
        if (event.target.matches('.square')) {  //ensures that event handler is only activated when needed
          for(let i = 0; i < squares.length; i++) { //for loop to see which squares need update
            if ( event.target.matches(`.square${i}`)) { //finds the specific square using template literals
              if (!selectPlayer.winner() && !event.target.value) { //checks to see that game is not over yet and the square is not already taken
                let newSelect
                if (selectPlayer.playerTurn() === 'pX') {
                  newSelect = 'X'
                  selectText.innerHTML = 'Player 2 Turn'
                }
                if (selectPlayer.playerTurn() === 'pO') {
                  newSelect = 'O'
                  selectText.innerHTML = 'Player 1 Turn'
                }
                gameBoard.gameState.splice(i, 1, newSelect) //splices the gateState array to put corresponding mark
                render()
              }
              if (selectPlayer.winner()) {
                selectText.innerHTML = selectPlayer.winner()
              }
            }
          }
        }
      })
      reset(selectText) //calls reset function to activate the reset button
      selectText.innerHTML = "Player 1 Turn"
  }
  function reset() {
    const restartBtn = document.querySelector('.restart')
    const squares = document.querySelectorAll('.square')
    restartBtn.addEventListener('click', () => {
      gameBoard.gameState = ["", "", "", "", "", "", "", "", ""]
      for(let i = 0; i < squares.length; i++) { //loop to update all square values to undefined - could have used an empty string as well
        squares[i].value = undefined
      }
      selectText.innerHTML = "Player 1 Turn"
      render()
    })
  }
  function render() {
    const squares = document.querySelectorAll('.square')
    for(let i = 0; i < squares.length; i++) { //for loop to update the innerHTML and value to reflect gameState
      squares[i].innerHTML = gameBoard.gameState[i]
      squares[i].value = gameBoard.gameState[i]
    }
  }
  return { selection } //returns only selection, others need to be manually called. render() is called within selection()
})()

const player = () => {
  const playerTurn = () => {
    const numX = countSelection().X; //returns only X count
    const numO = countSelection().O; //returns only O count
    return (numX < numO || numX === numO) ? 'pX' : 'pO' //X is always first
  }

  const winner = () => {
    const winningCondition = [ //all the possible winning possibilites
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    if(countSelection().X < 3) { //can't win unless 3 marks are on the board
      return false
    }
    const indicesOfX = getAllIndices(gameBoard.gameState, "X") //array of all the "X" indices on the board
    const indicesOfO = getAllIndices(gameBoard.gameState, "O")

    for (let x = 0; x < winningCondition.length; x++) {
      let numMatchedO = 0
      let numMatchedX = 0
      for (let i = 0; i < indicesOfX.length; i++) { //loop for possible winning combos length
        for (let j = 0; j < winningCondition[x].length; j++) { //number of marks needed in the winning possiblity
          if (indicesOfX[i] === winningCondition[x][j]) { //check to see if "X" won
            numMatchedX += 1
            if (numMatchedX === 3) {
              return "Player 1 Wins!"
            }
          }
          if (indicesOfO[i] === winningCondition[x][j]) {
            numMatchedO += 1
            if (numMatchedO === 3) {
              return "Player 2 Wins!"
            }
          }
        }
      }
    }
    if (countSelection().X === 5 && countSelection().O === 4) { //X is always first, 9 places, 5 X and 4 O is maximum placement
        return "Tie!"
    }
    return false
  }

  function getAllIndices(arr, val) { //creates array of all the indexes of value argument
    let indexes = []
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        indexes.push(i)
      }
    }
    return indexes
  }

  function countSelection() { //counts how many X's and O's are on the game board
    let numX = 0
    let numO = 0
    for (let i = 0; i < gameBoard.gameState.length; i++) {
      if (gameBoard.gameState[i] === 'X') {
        numX += 1
      }else if (gameBoard.gameState[i] === 'O') {
        numO += 1
      }
    }
    return { X: numX, O: numO }
  }
  return { playerTurn, winner}
}

displayController.selection()
