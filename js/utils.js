'use strict'

const MINE_IMG = '<img src="img/mine.png">'
const FLAG_IMG = '<img src="img/flag.png">'

function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    var strText = ''
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            const cell = mat[i][j]
            var className = `cell cell-${i}-${j}`
            
            if(cell.isMine) className += ' mine'
            // else if(!cell.isMine) className += ' empty'
            
            if(!cell.isMine) {
                strText = cell.minesAroundCount
            } else {
                strText = ''
            }
            
            strHTML += `\t<td class="${className}">\n${strText}`

            if(cell.isMine) {
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






// getEmptyCell
function findEmptyPos() {

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]
            if (!cell) {
                return { i, j }
            }
        }
    }
}

// createBoard
function createBoard(rows, cols) {
    const Board = []
    for (var i = 0; i < rows; i++) {
        const row = []
        for (var j = 0; j < cols; j++) {
            row.push('')
        }
        Board.push(row)
    }
    return Board
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    const cellSelector = '.' + getClassName(location) // cell-i-j
    const elCell = document.querySelector(cellSelector)
    elCell.innerHTML = value
}

// Returns the class name for a specific cell
function getClassName(location) {
    const cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    const coord = {}
    const parts = strCellId.split('-')
    coord.i = +parts[1]
    coord.j = +parts[2]
    return coord
}

// countNeighbors
function neighborLoop(gBoard, rowIdx, colIdx) {
    var neighborsCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= gBoard[0].length) continue
            var currCell = gBoard[i][j]
            if (currCell === OBJECT) neighborsCount++
        }
    }
    return neighborsCount
}

// drawNum
function drawNum(nums) {
    var randIdx = getRandomInt(0, nums.length)
    var num = nums[randIdx]
    nums.splice(randIdx, 1)
    return num
}

function createNums(length) {
    const nums = []
    for (var i = 1; i <= length; i++) {
        nums.push(i)
    }
    return nums
}



// function onOpenModal() {
//     const elModal = document.querySelector('.modal')
//     elModal.style.display = 'block'
// }

// function onCloseModal() {
//     const elModal = document.querySelector('.modal')
//     elModal.style.display = 'none'
//     onInit()
// }

function hideElement(selector) {
    const el = document.querySelector(selector)
    el.classList.add('hidden')
}

function showElement(selector) {
    const el = document.querySelector(selector)
    el.classList.remove('hidden')
}

// getRandomColor
function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

// A function that returns a random number between a minimum and maximum range
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}





// // sayHello ()
// function sayHello() {
//     console.log('hello')
// }

// var timeoutID = setTimeout(sayHello, 2000)
// console.log('timeoutID:', timeoutID)
// clearTimeout(timeoutID)

// setTimeout(() => {
//     console.log('hello!');
// }, 2000)

// var intervalId = setInterval(sayHello, 2000)
// console.log('intervalId:', intervalId)
// clearInterval(intervalId)



function countInRow(mat, rowIdx, symbol) {
    var count = 0
    for (var i = 0; i < mat[0].length; i++) {
        const cell = mat[rowIdx][i]
        if (cell === symbol) count++
    }

    return count
}

function countInCol(mat, colIdx, symbol) {
    var count = 0
    for (var i = 0; i < mat[0].length; i++) {
        const cell = mat[i][colIdx]
        if (cell === symbol) count++
    }

    return count
}

function countInMainDiagonal(mat, symbol) {
    var count = 0
    for (var i = 0; i < mat.length; i++) {
        const cell = mat[i][i]
        if (cell === symbol) count++
    }

    return count
}

function countInSecondaryDiagonal(mat, symbol) {
    var count = 0
    for (var i = 0; i < mat.length; i++) {
        const cell = mat[i][mat.length - 1 - i]
        if (cell === symbol) count++
    }

    return count
}

function getTime() {
    return new Date().toString().split(' ')[4];
}