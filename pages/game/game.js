
const game = document.querySelector('main')
const bowl = document.querySelector('.bowl')
// const dangerLine = document.querySelector('.danger-line')
const fruits = document.querySelector('.fruits')
const scoreDisplay = document.querySelector('#score')

let bowlLeft = parseInt(window.getComputedStyle(bowl).getPropertyValue('left'))
let bowlBottom = parseInt(window.getComputedStyle(bowl).getPropertyValue("bottom"))

let score = 0

const fruitImg = [
    '../../font/src/png/A.png',
    '../../font/src/png/B.png',
    '../../font/src/png/C.png',
    '../../font/src/png/D.png',
    '../../font/src/png/E.png',
    '../../font/src/png/F.png',
    '../../font/src/png/G.png',
    '../../font/src/png/H.png',
    '../../font/src/png/I.png',
    '../../font/src/png/J.png',
    '../../font/src/png/K.png',
    '../../font/src/png/L.png',
    '../../font/src/png/M.png',
    '../../font/src/png/N.png',
    '../../font/src/png/O.png',
    '../../font/src/png/P.png',
    '../../font/src/png/Q.png',
    '../../font/src/png/R.png',
    '../../font/src/png/S.png',
    '../../font/src/png/T.png',
    '../../font/src/png/U.png',
    '../../font/src/png/V.png',
    '../../font/src/png/W.png',
    '../../font/src/png/X.png',
    '../../font/src/png/Y.png',
    '../../font/src/png/Z.png',
]


function moveBowlLeft () {
    if (bowlLeft > 0) {
        bowlLeft -= 20
        bowl.style.left = `${bowlLeft}px`
    }
}

function moveBowlRight () {
    // document.documentElement.clientWidth  ==== 100vw of body
    // multipled to get 90% of width because bowl still going wayy out of view
    if (bowlLeft < (document.documentElement.clientWidth * 0.88)) {
        bowlLeft += 20
        bowl.style.left = `${bowlLeft}px`
    }
}

function controlBowl (e) {
    if (e.key == 'ArrowLeft') {
        moveBowlLeft()
        // console.log(e.key)
    }

    if (e.key == 'ArrowRight') {
        moveBowlRight()
        // console.log(e.key)
    }
}

document.addEventListener('keydown', controlBowl)


function generateFruits () {
    let fruit = document.createElement('div')
    fruit.classList.add('fruit')

    fruit.style.background = `url(${fruitImg[Math.floor(Math.random() * 25)]})`
    fruit.style.backgroundSize = 'contain'
    fruit.style.backgroundRepeat = 'no-repeat'

    let fruitBottom = 530
    let fruitLeft = Math.floor(Math.random() * (document.documentElement.clientWidth * 0.88))

    fruits.appendChild(fruit)
    
    // fruit.style.bottom = `${fruitBottom}px`
    // fruit.style.left = `${fruitLeft}px`

    function fallingFruit () {

        if (fruitBottom < bowlBottom + 50 && fruitBottom > bowlBottom && fruitLeft > bowlLeft - 10 && fruitLeft < bowlLeft + 100) {
            fruits.removeChild(fruit)
            clearInterval(fruitInterval)
            score++
            scoreDisplay.textContent = String(score).padStart(2, '0');
        }

        if (fruitBottom < bowlBottom) {
            gameOver()
            clearInterval(fruitInterval)
            clearTimeout(fruitTimeout)

        }

        fruitBottom -= 5

        fruit.style.bottom = `${fruitBottom}px`
        fruit.style.left = `${fruitLeft}px`
    }

    let fruitInterval = setInterval(fallingFruit, 20)
    let fruitTimeout = setTimeout(generateFruits, 3000)
}

generateFruits()

function gameOver () {
    alert(`game over! score = ${score}`)
    location.reload()
}