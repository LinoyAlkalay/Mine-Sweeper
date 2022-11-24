'use strict'

// global variables
var gBoard
var gLevel
var gGame

const MINE_IMG = '<img src="img/mine.png">'
const FLAG_IMG = '<img src="img/flag.png">'

// This is called when page loads
function onInit(level = { size: 4, mines: 2 }) {
    if (gIntervalTimer) clearInterval(gIntervalTimer)
    resetTime()
    const elEmojiBtn = document.querySelector('.emojiBtn')
    elEmojiBtn.innerText = '😃'
    gShownCellCount = 0
    // gMineClicked = 1
    gFirstClick = true
    gLevel = level
    gBoard = buildBoard(gLevel)
    renderBoard(gBoard, '.board-container')
}

// DONE: Render the board as a <table> to the page
// DONE: Builds the board 
function buildBoard(gLevel) {
    const size = gLevel.size
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = createCell()
        }
    }
    addMines(board, gLevel)
    setMinesNegsCount(board)
    return board
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j].minesAroundCount = neighborLoop(board, i, j)
        }
    }
}

function addMines(gBoard, gLevel) {
    for (var i = 0; i < gLevel.mines; i++) {
        var locationEmptyCell = getRandomEmptyCell(gBoard)
        gBoard[locationEmptyCell.i][locationEmptyCell.j].isMine = true
    }
}

// DONE: Count mines around each cell and set the cell's minesAroundCount -> neighborLoop
function neighborLoop(mat, cellI, cellJ) {
    if (mat[cellI][cellJ].isMine) return
    var neighborsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue

            if (mat[i][j].isMine) neighborsCount++
        }
    }
    return neighborsCount
}

function renderBoard(mat, selector) {
    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            const cell = mat[i][j]
            var className = `cell cell-${i}-${j}`

            strHTML += `\t<td class="${className}" onclick="cellClicked(this,${i},${j})" 
            oncontextmenu="cellMarked(${i},${j})">\n`

            if (cell.isMarked) strHTML += FLAG_IMG
            if (cell.isMine && cell.isShown) strHTML += MINE_IMG

            strHTML += '\t</td>\n'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

function createCell() {
    const cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false
    }
    return cell
}

function onChangeLevel(level) {
    if (level === 'Beginner') {
        gLevel.size = 4
        gLevel.mines = 2
        console.log('gLevel:', gLevel)
    } else if (level === 'Medium') {
        gLevel.size = 8
        gLevel.mines = 14
        console.log('gLevel:', gLevel)
    } else if (level === 'Expert') {
        gLevel.size = 12
        gLevel.mines = 32
    }
    onInit(gLevel)
}