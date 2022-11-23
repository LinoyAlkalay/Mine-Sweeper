'use strict'

var gStartTime
var gIntervalTimer
var gShownCell = 0
var gFirstClick = 0

// DONE: Called when a cell (td) is clicked
function cellClicked(elCell, i, j) {
    if (gFirstClick === 0) {
        gFirstClick++
        startTimer()
    }

    const targetCell = gBoard[i][j]

    if (!targetCell.isMarked) {
        if (!targetCell.isShown) gShownCell++
        targetCell.isShown = true
        elCell.classList.add('shown')
        // elCell.style.backgroundColor = '#BFBEBA'
        var value = null
        if (targetCell.isMine) {
            value = MINE_IMG
            elCell.classList.remove('shown')
            elCell.classList.add('mine')
            // elCell.style.backgroundColor = '#BF9788'
        } else {
            if (targetCell.minesAroundCount) {
                value = targetCell.minesAroundCount
            } else {
                // CascadingOpenCell(gBoard, i, j)
                value = ''
            }
        }
        renderCell({ i, j }, value)
    }

    checkGameOver(targetCell, elCell)
}

function CascadingOpenCell(mat, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue
            const cell = mat[i][j]
            // // if (!cell.minesAroundCount) {
            //     cell.isShown = true
            //     const elCell = document.querySelector(`.cell-${i}-${j}`)
            //     elCell.classList.add('shown')
            // // }
        }
    }
}

// DONE: Called on right click to mark a cell (suspected to be a mine) 
// DONE: Search the web (and implement) how to hide the context menu on right click
function cellMarked(elCell, i, j) {
    if (gFirstClick === 0) {
        gFirstClick++
        startTimer()
    }
    const targetCell = gBoard[i][j]
    if (!targetCell.isMarked) renderCell({ i, j }, FLAG_IMG)
    else renderCell({ i, j }, '')
    targetCell.isMarked = !targetCell.isMarked
}

// TODO: Game ends when all mines are marked, and all the other cells are shown
function checkGameOver(cell, elCell) {
    if (cell.isMine && cell.isShown) {
        endGame(false)
        onOpenModal(false)
    }

    const numOfNoMinde = ((gLevel.size) ** 2) - gLevel.mines
    if (gShownCell === numOfNoMinde) {
        endGame(true)
        onOpenModal(true)
    }
}

function endGame(boolean) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]
            if (cell.isMine && !cell.isShown && !boolean) {
                const elCell = document.querySelector(`.cell-${i}-${j}`)
                elCell.classList.remove('shown')
                elCell.classList.add('mine')
                cell.isShown = true
                renderCell({ i, j }, MINE_IMG)
            } else if (cell.isMine && !cell.isShown && boolean) {
                cell.isMarked = true
                renderCell({ i, j }, FLAG_IMG)
            }
        }
    }
}

// TODO: When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors.
// TODO NOTE: start with a basic implementation that only opens the non-mine 1st degree neighbors
// TODO BONUS: if you have the time later, try to work more like the real algorithm (see description at the Bonuses section below)
function expandShown(board, elCell, i, j) {

}


