'use strict'

var gStartTime
var gIntervalTimer

function startTimer() {
    gStartTime = Date.now() 
    gIntervalTimer = setInterval(() => {
        const seconds = (Date.now() - gStartTime) / 1000
        var elH2Span = document.querySelector('span')
        elH2Span.innerText = seconds.toFixed(3)
    }, 1)
}

function resetTime() {
    var elH2Span = document.querySelector('span')
    elH2Span.innerText = '0.000'
}

// DONE: Called when a cell (td) is clicked
function cellClicked(elCell, i, j) {
    startTimer()
    console.log('{i, j}:', { i, j })
    const targetCell = gBoard[i][j]
    targetCell.isMarked = true

    elCell.style.backgroundColor = '#BFBEBA'
    var value = null
    if (targetCell.isMine) {
        value = MINE_IMG
        elCell.style.backgroundColor = '#BF9788'
    } else {
        value = targetCell.minesAroundCount
    }

    renderCell({ i, j }, value)
}

// TODO: Called on right click to mark a cell (suspected to be a mine) 
// TODO: Search the web (and implement) how to hide the context menu on right click
function cellMarked(elCell) {

}

// TODO: Game ends when all mines are marked, and all the other cells are shown
function checkGameOver() {

}

// TODO: When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors.
// TODO NOTE: start with a basic implementation that only opens the non-mine 1st degree neighbors
// TODO BONUS: if you have the time later, try to work more like the real algorithm (see description at the Bonuses section below)
function expandShown(board, elCell, i, j) {

}