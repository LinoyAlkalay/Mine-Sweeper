'use strict'

// global variables
var gStartTime
var gIntervalTimer
var gShownCellCount = 0
var gFirstClick = true

// DONE: Called when a cell (td) is clicked
function cellClicked(elCell, i, j) {
    const cell = gBoard[i][j]

    if (gFirstClick) {
        gFirstClick = false
        startTimer()
    }

    if (!cell.isMarked) {
        if (!cell.isShown) gShownCellCount++
        cell.isShown = true
        elCell.classList.add('shown')
        var value = null
        if (cell.isMine) {
            value = MINE_IMG
            elCell.classList.remove('shown')
            elCell.classList.add('mine')
            renderCell({ i, j }, value)
        } else {
            expandShown(gBoard, elCell, i, j)
        }
    }

    checkGameOver(cell)
}

function expandShown(board, elCell, i, j) {
    if (i < 0 || i > board.length || j < 0 || j > board[0].length) return
    const cell = board[i][j]
    if (cell.minesAroundCount) {
        console.log('cell:', cell)
        cell.isShown = true
        elCell.classList.add('shown')
        renderCell({ i, j }, cell.minesAroundCount)
        return
    } 
    // if (cell.minesAroundCount === 0 && !cell.isShown) {
    if (cell.minesAroundCount === 0) {
        console.log('cell:', cell)
        cell.isShown = true
        elCell.classList.add('shown')
        renderCell({ i, j }, '')
        expandShown(board, i + 1, j)
        expandShown(board, i - 1, j)
        expandShown(board, i, j + 1)
        expandShown(board, i, j - 1)
    }
}

// DONE: Called on right click to mark a cell (suspected to be a mine) 
// DONE: Search the web (and implement) how to hide the context menu on right click
function cellMarked(i, j) {
    const cell = gBoard[i][j]
    if (gFirstClick) {
        gFirstClick = false
        startTimer()
    }
    if (!cell.isMarked) renderCell({ i, j }, FLAG_IMG)
    else renderCell({ i, j }, '')
    cell.isMarked = !cell.isMarked
}

// DONE: Game ends when all mines are marked, and all the other cells are shown
function checkGameOver(cell) {
    const numOfNoMinde = ((gLevel.size) ** 2) - gLevel.mines
    const elEmojiBtn = document.querySelector('.emojiBtn')
    if (cell.isMine && cell.isShown) {
        elEmojiBtn.innerText = '🤯'
        endGame(false)
        onOpenModal(false)
    }
    if (gShownCellCount === numOfNoMinde) {
        elEmojiBtn.innerText = '😎'
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

function CascadingOpenCell(mat, cellI, cellJ) { // TODO: improve!!!!
    var value = null
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue
            const cell = mat[i][j]
            if (cell.minesAroundCount) value = cell.minesAroundCount // V
            else value = '' // V
            if (!cell.isShown) gShownCellCount++
            cell.isShown = true // V
            const elCell = document.querySelector(`.cell-${i}-${j}`) // V
            elCell.classList.add('shown') // V
            renderCell({ i, j }, value) // V
        }
    }
}

