'use strict'

// global variables
var gBoard
var gLevel
var gGame
const MINE_IMG = '<img src="img/mine.png">'

// This is called when page loads
function onInit() {
    if(gIntervalTimer) clearInterval(gIntervalTimer)
    resetTime()
    gLevel = createLevelGame()
    gBoard = buildBoard(gLevel)
    console.log('gBoard:', gBoard)
    renderBoard(gBoard, '.board-container')
}

// DONE: Render the board as a <table> to the page
// DONE: Builds the board 
function buildBoard(gLevel) {
    const size = gLevel.SIZE
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
    for (var i = 0; i < gLevel.MINES; i++) {
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
    var strText = ''
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            const cell = mat[i][j]
            var className = `cell cell-${i}-${j}`
            
            if(!cell.isMine && cell.isShown) strText = cell.minesAroundCount
            else strText = ''
            
            strHTML += `\t<td class="${className}" onclick="cellClicked(this,${i},${j})">\n${strText}`

            if(cell.isMine && cell.isShown) {
                strHTML += MINE_IMG
            } 

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
        isMarked: true
    }
    return cell
}

function createLevelGame() {
    const level = {
        SIZE: 4,
        MINES: 2
    }
    return level
}
