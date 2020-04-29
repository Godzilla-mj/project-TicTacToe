
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
        if (event.target.matches('.square')) {
          for(let i = 0; i < squares.length; i++) {
            if ( event.target.matches(`.square${i}`)) {
              if (!selectPlayer.winner() && !event.target.value) {
                let newSelect
                if (selectPlayer.playerTurn() === 'pX') {
                  newSelect = 'X'
                  selectText.innerHTML = 'Player 2 Turn'
                }
                if (selectPlayer.playerTurn() === 'pO') {
                  newSelect = 'O'
                  selectText.innerHTML = 'Player 1 Turn'
                }
                gameBoard.gameState.splice(i, 1, newSelect)
                render()
              }
              if (selectPlayer.winner()) {
                selectText.innerHTML = selectPlayer.winner()
              }
            }
          }
        }
      })
      reset(selectText)
      selectText.innerHTML = "Player 1 Turn"
  }
  function reset() {
    const restartBtn = document.querySelector('.restart')
    restartBtn.addEventListener('click', () => {
      gameBoard.gameState = ["", "", "", "", "", "", "", "", ""]
      selectText.innerHTML = "Player 1 Turn"
      render()
    })
  }
  function render() {
    const squares = document.querySelectorAll('.square')
    for(let i = 0; i < squares.length; i++) {
      squares[i].innerHTML = gameBoard.gameState[i]
    }
  }

  return { selection }

})()


const player = () => {
  const playerTurn = () => {
    const numX = countSelection().X;
    const numO = countSelection().O;
    return (numX < numO || numX === numO) ? 'pX' : 'pO'
  }

  const winner = () => {
    const winningCondition = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    if(countSelection().X < 3) {
      return false
    }
    const indicesOfX = getAllIndices(gameBoard.gameState, "X")
    const indicesOfO = getAllIndices(gameBoard.gameState, "O")

    for (let x = 0; x < winningCondition.length; x++) {
      let numMatchedO = 0
      let numMatchedX = 0
      for (let i = 0; i < indicesOfX.length; i++) {
        for (let j = 0; j < winningCondition[x].length; j++) {
          if (indicesOfX[i] === winningCondition[x][j]) {
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
    if (countSelection().X === 5 && countSelection().O === 4) {
        return "Tie!"
    }
    return false
  }

  function getAllIndices(arr, val) {
    let indexes = []
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        indexes.push(i)
      }
    }
    return indexes
  }

  function countSelection() {
    let numX = 0
    let numO = 0
    for (let i = 0; i < gameBoard.gameState.length; i++) {
      if (gameBoard.gameState[i] === 'X') {
        numX += 1
      }
      if (gameBoard.gameState[i] === 'O') {
        numO += 1
      }
    }

    return { X: numX, O: numO }
  }
  return { playerTurn, winner}

}

displayController.selection()
