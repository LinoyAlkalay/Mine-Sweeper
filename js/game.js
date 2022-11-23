'use strict'

// global variables
var gBoard
var gLevel
var gGame

// This is called when page loads
function onInit() {
    gLevel = createLevelGame()
    gBoard = buildBoard(gLevel.SIZE)
    console.log('gBoard:', gBoard)
    renderBoard(gBoard, '.board-container')
}

// DONE: Render the board as a <table> to the page
// DONE: Builds the board 
function buildBoard(size) {
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = createCell()
            board[i][j].isMine = (Math.random() < 2 / 16) ? true : false

        }
    }

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            board[i][j].minesAroundCount = setMinesNegsCount(board, i, j)
        }
    }

    // TODO: Set mines at random locations Call setMinesNegsCount() Return the created board
    // console.log('board:', board)
    return board
}

function createLevelGame() {
    const level = {
        SIZE: 4,
        MINES: 2
    }
    return level
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

// TODO: Count mines around each cell and set the cell's minesAroundCount -> neighborLoop
function setMinesNegsCount(mat, cellI, cellJ) {
    if (mat[cellI][cellJ].isMine)return

    var neighborsCount = 0
    console.log(cellI, cellJ);
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue

            if (mat[i][j].isMine) neighborsCount++
            console.log('mat[i][j]:', mat[i][j])
        }
    }
    console.log('neighborsCount:', neighborsCount)
    return neighborsCount
}

// TODO: Called when a cell (td) is clicked
function cellClicked(elCell, i, j) {

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