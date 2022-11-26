'use strict'

// global variables
var gLivesCount = 3
var gHintCount = 3
var gNightNode = false
var isHint = false

function liveDecrease() {
    gLivesCount--
    const elH4Spans = document.querySelectorAll('h4 span')
    if (gLivesCount === 2) elH4Spans[0].innerText = '💛 💛'
    else if (gLivesCount === 1) elH4Spans[0].innerText = '💛'
    else if (gLivesCount === 0) elH4Spans[0].innerText = ''
}


function onSwitchMode() {
    const elLink = document.querySelector('link')
    if (!gNightNode) elLink.href = 'css/dark.css'
    else elLink.href = 'css/main.css'
    gNightNode = !gNightNode
}

function onHint() {
    isHint = true
    gHintCount--
    const elH4Spans = document.querySelectorAll('h4 span')
    if (gHintCount === 2) elH4Spans[1].innerText = '💡 💡'
    else if (gHintCount === 1) elH4Spans[1].innerText = '💡'
    else if (gHintCount === 0) elH4Spans[1].innerText = ''
}

function revaleNeighborHint(cellI, cellJ) {
    const cellsHints = []
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue
            const cell = gBoard[i][j]
            const elCell = document.querySelector(`.cell-${i}-${j}`)
            cellsHints.push({i, j})
            if (cell.isMine) revaleMine(cell, elCell, i, j)
            else if(cell.minesAroundCount) revaleCell(cell, elCell, i, j)
            else {
                cell.isShown = true
                elCell.classList.add('shown')
                renderCell({ i, j }, '')
            }
        }
    }
    isHint = false
    return cellsHints
}

function unRevaleNeighborHint(cellsHints) {
    for(var i = 0; i <cellsHints.length; i++) {
        const cell = gBoard[cellsHints[i].i][cellsHints[i].j]
        const elCell = document.querySelector(`.cell-${cellsHints[i].i}-${cellsHints[i].j}`)
        const location = cellsHints[i]
        if(cell.isMine) {
            cell.isShown = false
            elCell.classList.remove('mine')
            renderCell(location, '')
        } else {
            cell.isShown = false
            elCell.classList.remove('shown')
            renderCell(location, '')
        }
    }
}