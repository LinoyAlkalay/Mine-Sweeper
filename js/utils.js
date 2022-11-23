'use strict'
// !
function getRandomEmptyCell(gBoard) {
    const emptysCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (!gBoard[i][j].isMine) {
                emptysCells.push({ i, j })
            }
        }
    }
    var locationEmptyCell = drawNum(emptysCells)
    return locationEmptyCell
}

// Convert a location object {i, j} to a selector and render a value in that element
// !
function renderCell(location, value) {
    const cellSelector = '.' + getClassName(location) // cell-i-j
    const elCell = document.querySelector(cellSelector)
    elCell.innerHTML = value
}

// !
function onOpenModal(boolean) {
    resetTime()
    const elModal = document.querySelector('.modal')
    const elH2Modal = elModal.querySelector('h2')
    if (boolean) elH2Modal.innerText = 'You Won!'
    elModal.style.display = 'block'
}

// !
function onCloseModal() {
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
    onInit()
}

// !
function startTimer() {
    gStartTime = Date.now()
    gIntervalTimer = setInterval(() => {
        const seconds = (Date.now() - gStartTime) / 1000
        var elH2Span = document.querySelector('span')
        elH2Span.innerText = seconds.toFixed(3)
    }, 1)
}

// !
function resetTime() {
    clearInterval(gIntervalTimer)
    var elH2Span = document.querySelector('span')
    elH2Span.innerText = '0.000'
}

// !
function drawNum(nums) {
    var randIdx = getRandomInt(0, nums.length)
    var num = nums[randIdx]
    nums.splice(randIdx, 1)
    return num
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

function createNums(length) {
    const nums = []
    for (var i = 1; i <= length; i++) {
        nums.push(i)
    }
    return nums
}

function hideElement(selector) {
    const el = document.querySelector(selector)
    el.classList.add('hidden')
}

function showElement(selector) {
    const el = document.querySelector(selector)
    el.classList.remove('hidden')
}

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