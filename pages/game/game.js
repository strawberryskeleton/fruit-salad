
const game = document.querySelector('main')
const bowl = document.querySelector('.bowl')
const dangerLine = document.querySelector('.danger-line')
const fruits = document.querySelector('.fruits')

let bowlLeft = parseInt(window.getComputedStyle(bowl).getPropertyValue('left'))
let bowlBottom = parseInt(window.getComputedStyle(bowl).getPropertyValue("bottom"))

let score = 0


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

function addScore () {
    alert('score ++')
}