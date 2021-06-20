const seting = document.querySelector('.seting')
const card = document.querySelector('.card')
const back = document.querySelector('.back')
const budget = document.querySelector('.budget')
const wrap = document.querySelector('.wrap')

const addOperation = document.querySelector('footer .fa-plus-circle')
const cardBudget = document.querySelector('.cardBudget')
const cardOperation = document.querySelector('.cardOperation')
//cardoperation---------------------------------------------------
const radio = document.querySelectorAll('input[type="radio"]')
const date = document.querySelector('#date')
const number = document.querySelector('#number')
const add = document.querySelector('#add')
//---------------------------------------------------------------
const btn = document.querySelector('.btn')
const input = document.querySelector('.cardBudget input')
let totalBudget = []
sumBudget = []


const addBudget = () => {
    totalBudget.splice(0, 1, Number(input.value))
    budget.innerHTML = `My budget <span>${totalBudget[0]}</span>$`
}
const openSeting = () => {
    cardBudget.style.left = `8px`
    addBudget()
}
const offSeting = () => {
    cardBudget.style.left = `500px`
    cardOperation.style.left = `-500px`
}
const showForm = () => {
    cardOperation.style.left = `8px`
}

const showOperation = () => {
   
    const operation = document.createElement('div')
    operation.classList.add('operation')
    operation.innerHTML = `${changeArrow()}
<h4>${date.value}</h4>
<span><h4>$</h4></span>
<span id="amount"><h4>${number.value}</h4></span>
<span class="delte"><i class="far fa-times-circle"></i></span>`

    wrap.appendChild(operation)
    del()
    sumOperation()
    btn.removeEventListener('click', addBudget)
    // number.value=''

}
const changeArrow = () => {

    for (i = 0; i < radio.length; i++) {
        if (radio[i].id === 'income' && radio[i].checked === true) {
            return `<i class="fas fa-arrow-up"></i>`
        }
        if (radio[i].id === 'expense' && radio[i].checked === true) {
            return `<i class="fas fa-arrow-down"></i>`
        }
    }
}
const del = () => {
    const iFar = document.querySelectorAll('.operation .delte')
    let itemDelArr = []

    iFar.forEach((dl) => {
        dl.addEventListener('click', (e) => {
            let itemDel = e.path[2].childNodes[6].innerText;

            if (dl.parentNode.firstElementChild.classList.contains('fa-arrow-down')) {
                itemDelArr.unshift(Number(itemDel))
                let sumBudget2 = sumBudget.concat(itemDelArr)
                let sumBudget3 = sumBudget2.reduce((acu, value) => (acu + value))
                budget.innerHTML = `My budget <span>${sumBudget3}</span>$`
            }
            if (dl.parentNode.firstElementChild.classList.contains('fa-arrow-up')) {
                itemDelArr.unshift(Number(-itemDel))
                let sumBudget2 = sumBudget.concat(itemDelArr)
                let sumBudget3 = sumBudget2.reduce((acu, value) => (acu + value))
                budget.innerHTML = `My budget <span>${sumBudget3}</span>$`
            }

            e.path[2].remove(e)
        })
    })
}

const sumOperation = () => {
    var arr = []
    const totals = document.querySelectorAll('#amount')

    totals.forEach(el => {
        if (el.parentNode.firstElementChild.classList.contains('fa-arrow-up')) {
            arr.push(Number(el.innerText))
        }
        if (el.parentNode.firstElementChild.classList.contains('fa-arrow-down')) {
            arr.push(-Number(el.innerText))
        }
    })

    let sum = arr.reduce((acu, value) => (acu + value))
    sumBudget = totalBudget.concat(sum)
    let sumBudget1 = sumBudget.reduce((acu, value) => (acu + value))
    budget.innerHTML = `My budget <span>${sumBudget1}</span>$`
}

btn.addEventListener('click', addBudget)
seting.addEventListener('click', openSeting)
back.addEventListener('click', offSeting)
addOperation.addEventListener('click', showForm)
add.addEventListener('click', showOperation)