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
        } else {
            if (cell.minesAroundCount) {
                value = cell.minesAroundCount
            } else {
                CascadingOpenCell(gBoard, i, j)
                value = ''
            }
        }
        renderCell({ i, j }, value)
    }

    checkGameOver(cell)
}

function CascadingOpenCell(mat, cellI, cellJ) { // TODO: improve!!!!
    var value = null
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue
            const cell = mat[i][j]
            if (cell.minesAroundCount) value = cell.minesAroundCount
            else value = ''
            if (!cell.isShown) gShownCellCount++
            cell.isShown = true
            const elCell = document.querySelector(`.cell-${i}-${j}`)
            elCell.classList.add('shown')
            renderCell({ i, j }, value)
        }
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
