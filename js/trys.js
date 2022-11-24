'use strict'



// function isNeedToStop(cell, cellI, cellJ) {
//     if (cell[cellI - 1] === cell.minesAroundCount &&
//         cell[cellI + 1] === cell.minesAroundCount &&
//         cell[cellJ - 1] === cell.minesAroundCount &&
//         cell[cellJ + 1] === cell.minesAroundCount) return true
// }


// function checkLive(elCell, i, j) {
//     const cell = gBoard[i][j]
//     var elLifeA = document.querySelector('.life a')
//     gMineToEnd--
//     if (gMineToEnd = 2) elLifeA.innerText = '💛💛'
//     else if (gMineToEnd = 1) elLifeA.innerText = '💛'
//     else if (gMineToEnd = 0) {
//         const elEmojiBtn = document.querySelector('.emojiBtn')
//         elEmojiBtn.innerText = '🤯'
//         endGame(false)
//         onOpenModal(false)
//         elLifeA.innerText = '0'
//     }

//     if (cell.isMine && gMineToEnd > 0) {
//         setTimeout(() => {
//             elCell.classList.add('shown')
//             elCell.classList.add('mine')
//             var value = MINE_IMG
//             renderCell({ i, j }, value)
//         }, 500)
//         setTimeout(() => {
//             elCell.classList.remove('shown')
//             elCell.classList.remove('mine')
//             var value = ''
//             renderCell({ i, j }, value)
//         }, 500)
//     }
// }




// function victory(gBoard, elEmojiBtn) {
//     elEmojiBtn.innerText = '😎'

//     for (var i = 0; i < gBoard.length; i++) {
//         for (var j = 0; gBoard[0].length; j++) {
//             const cell = gBoard[i][j]
//             console.log('cell:', cell)
//             if(cell.isMine && !cell.isShown) {
//                 cell.isMarked = true
//                 renderCell({ i, j }, FLAG_IMG)
//             } 
//         }
//     }

//     onOpenModal(true)
// }

// function isNeedToStop(cell, cellI, cellJ) {
//     if (cell[cellI - 1] === cell.minesAroundCount &&
//         cell[cellI + 1] === cell.minesAroundCount &&
//         cell[cellJ - 1] === cell.minesAroundCount &&
//         cell[cellJ + 1] === cell.minesAroundCount) return true
// }


function loss(gBoard, elEmojiBtn) {
    elEmojiBtn.innerText = '🤯'
    
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; gBoard[0].length; j++) {
            const cell = gBoard[i][j]
            if(cell.isMine && !cell.isShown) {
                const elCell = document.querySelector(`.cell-${i}-${j}`)
                cell.isShown = true
                elCell.classList.remove('shown')
                elCell.classList.add('mine')
                renderCell({ i, j }, MINE_IMG)
            }
        }
    }

    onOpenModal(false)
}