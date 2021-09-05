class Calculator {
    constructor(previousScreen, currentScreen){
        this.previousScreen = previousScreen
        this.currentScreen = currentScreen
        this.clear()
    }

    clear() {
        this.currentOperand= ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if(number == '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand == '') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case 'x':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentScreen.innerHTML = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousScreen.innerHTML =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else{
            this.previousScreen.innerHTML = ''
        }
    }
}


const numberButtons = window.document.querySelectorAll('[data-number]');
const operatorButtons = window.document.querySelectorAll('[data-operator]');
const equalsButton = window.document.querySelector('[data-button-equals]');
const clearAllButton = window.document.querySelector('[data-button-clear-all]');
const deleteButton = window.document.querySelector('[data-button-delete]');
const previousScreen = window.document.querySelector('[data-previous]');
const currentScreen = window.document.querySelector('[data-current]');

const calculator = new Calculator(previousScreen, currentScreen)

numberButtons.forEach(button => {
    button.addEventListener('click',()=> {
        calculator.appendNumber(button.innerHTML)
        calculator.updateDisplay()
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click',()=> {
        calculator.chooseOperation(button.innerHTML)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click',button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearAllButton.addEventListener('click',button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',button => {
    calculator.delete()
    calculator.updateDisplay()
})