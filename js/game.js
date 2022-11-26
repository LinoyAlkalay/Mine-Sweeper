'use strict'

// global variables
var gStartTime
var gIntervalTimer
var gFirstClick = true

// DONE: Called when a cell (td) is clicked
function cellClicked(elCell, i, j) {
    const cell = gBoard[i][j]

    // if(isHint) {
    //     const cellsHints = revaleNeighborHint(i, j)
    //     const hintSetTime = setTimeout(() => {
    //         unRevaleNeighborHint(cellsHints)
    //     }, 1000)
    // }

    if (gFirstClick) {
        addMines(gBoard, gLevel, i, j)
        setMinesNegsCount(gBoard)
        gFirstClick = false
        startTimer()
    }

    if (!cell.isMarked) {
        if (cell.isMine) {
            if (gLivesCount === 0) revaleMine(cell, elCell, i, j)
            else liveDecrease()
        } else {
            if (cell.minesAroundCount) {
                gGame.shownCount++
                revaleCell(cell, elCell, i, j)
            } else expandShown(i, j)
        }
        checkGameOver(cell)
    }
}

function expandShown(i, j) {
    if (i < 0 || i >= gBoard.length || j < 0 || j >= gBoard[0].length) return

    if (gBoard[i][j].minesAroundCount === 0 && !gBoard[i][j].isShown) {
        gGame.shownCount++
        neighborLoopOpenNum(i, j)
        const elCell = document.querySelector(`.cell-${i}-${j}`)
        gBoard[i][j].isShown = true
        elCell.classList.add('shown')
        renderCell({ i, j }, '')

        expandShown(i - 1, j)
        expandShown(i + 1, j)
        expandShown(i, j - 1)
        expandShown(i, j + 1)
    }
}

function neighborLoopOpenNum(cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[i].length) continue
            const cell = gBoard[i][j]
            if (cell.minesAroundCount > 0 && !cell.isCounted) {
                const elCell = document.querySelector(`.cell-${i}-${j}`)
                revaleCell(cell, elCell, i, j)
                cell.isCounted = true
                gGame.shownCount++
            }
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
    if (!cell.isMarked) {
        renderCell({ i, j }, FLAG_IMG)
        if(cell.isMine) gGame.markedCount++
    } else {
        renderCell({ i, j }, '')
        if(cell.isMine) gGame.markedCount--
    }
    cell.isMarked = !cell.isMarked
}

// DONE: Game ends when all mines are marked, and all the other cells are shown
function checkGameOver(cell) {
    const numOfNoMinde = ((gLevel.size) ** 2) - gLevel.mines
    const elEmojiBtn = document.querySelector('.emojiBtn')

    if (cell.isMine && cell.isShown) lose(elEmojiBtn)
    else if (gGame.shownCount === numOfNoMinde || gGame.markedCount === gLevel.mines) victory(elEmojiBtn)
}

function victory(elEmojiBtn) {
    elEmojiBtn.innerText = '😎'
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]
            if (cell.isMine && !cell.isShown) {
                cell.isMarked = true
                renderCell({ i, j }, FLAG_IMG)
            } else if(!cell.isMine && !cell.isShown) {
                const elCell = document.querySelector(`.cell-${i}-${j}`)
                revaleCell(cell, elCell, i, j)
            }
        }
    }
    onOpenModal(true)
}

function lose(elEmojiBtn) {
    elEmojiBtn.innerText = '🤯'
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]
            if (cell.isMine && !cell.isShown) {
                const elCell = document.querySelector(`.cell-${i}-${j}`)
                revaleMine(cell, elCell, i, j)
            }
        }
    }
    onOpenModal(false)
}

