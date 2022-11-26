'use strict'

// global variables
var gBoard
var gLevel
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

const MINE_IMG = '<img src="img/mine.png">'
const FLAG_IMG = '<img src="img/flag.png">'

// This is called when page loads
function onInit(level = { size: 4, mines: 2 }) {
    if (gIntervalTimer) clearInterval(gIntervalTimer)
    resetTime()
    const elEmojiBtn = document.querySelector('.emojiBtn')
    const elH4Spans = document.querySelectorAll('h4 span')
    elH4Spans[0].innerText = '💛 💛 💛'
    // const elH4A = document.querySelector('h4 a')
    // elH4A.innerText = '💛 💛 💛'
    elEmojiBtn.innerText = '😃'
    gLivesCount = 3
    gHintCount = 3
    gFirstClick = true
    gGame.shownCount = 0
    gGame.markedCount = 0
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
    // addMines(board, gLevel)
    // setMinesNegsCount(board)
    return board
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            if (cell.isMine) neighborLoop(board, i, j)
        }
    }
}

function addMines(gBoard, gLevel, firstI, firstJ) {
    var i = 0
    while (i < gLevel.mines) {
        var locationEmptyCell = getRandomEmptyCell(gBoard)
        if (locationEmptyCell.i === firstI && locationEmptyCell.j === firstJ) continue
        gBoard[locationEmptyCell.i][locationEmptyCell.j].isMine = true
        i++
    }
}

// DONE: Count mines around each cell and set the cell's minesAroundCount -> neighborLoop
function neighborLoop(mat, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue
            mat[i][j].minesAroundCount++
        }
    }
}

function renderBoard(mat, selector) {
    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            var className = `cell cell-${i}-${j}`

            strHTML += `\t<td class="${className}" onclick="cellClicked(this,${i},${j})" 
            oncontextmenu="cellMarked(${i},${j})">\n`

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
        isMarked: false,
        isCounted: false
    }
    return cell
}

function onChangeLevel(level) {
    if (level === 'Beginner') {
        gLevel.size = 4
        gLevel.mines = 2
    } else if (level === 'Medium') {
        gLevel.size = 8
        gLevel.mines = 14
    } else if (level === 'Expert') {
        gLevel.size = 12
        gLevel.mines = 32
    }
    onInit(gLevel)
}