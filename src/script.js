// class to store data, perform functions etc.
class Calculator {
    constructor(firstOperandTextElement, secondOperandTextElement) {
        this.firstOperandTextElement = firstOperandTextElement
        this.secondOperandTextElement = secondOperandTextElement
        this.clear()
    }
    clear() {
        // AC button click
        this.firstOperand = ''
        this.secondOperand = ''
        this.operation = undefined
    }
    delete() {
        // delete button click
        this.secondOperand = this.secondOperand.toString().slice(0, -1)
    }
    appendNumber(number) {
        // numbers added as string in output panel when any number is clicked
        if(number === '.' && this.secondOperand.includes('.')) return // to be able to add only single .
        this.secondOperand = this.secondOperand.toString() + number.toString()
    }
    chooseOperation(operation) {
        // when user clicks on any operation button
        if(this.secondOperand === '') return // to avoid clearing out of 1st op when operator is clicked
        if(this.firstOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.firstOperand = this.secondOperand
        this.secondOperand = ''
    }
    compute() {
        // calculate the output on operation
        let computation
        const first = parseFloat(this.firstOperand)
        const second = parseFloat(this.secondOperand)
        if(isNaN(first) || isNaN(second)) return
        switch(this.operation) {
            case '+':
                computation = first + second
                break
            case '-':
                computation = first - second
                break
            case '*':
                computation = first * second
                break
            case '÷':
                computation = first / second
                break
            default:
                return
        }
        this.secondOperand = computation
        this.operation = undefined
        this.firstOperand = ''
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en-IN', {maximumFractionDigits: 0})
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }
        else {
            return integerDisplay
        }
    }
    updateDisplay() {
        // updates values inside the output panel
        this.secondOperandTextElement.innerText = this.getDisplayNumber(this.secondOperand)
        if(this.operation != null) {
            this.firstOperandTextElement.innerText = `${this.firstOperand} ${this.operation}`
        }
        else {
            this.firstOperandTextElement.innerText = ''
        }
    }
}
// all buttons used as variables
const numberButtons = document.querySelectorAll('[data-number')
const operationButtons = document.querySelectorAll('[data-operation')
const equalsButton = document.querySelector('[data-equals')
const deleteButton = document.querySelector('[data-delete')
const allClearButton = document.querySelector('[data-all-clear')
const firstOperandTextElement = document.querySelector('[data-first-operand')
const secondOperandTextElement = document.querySelector('[data-second-operand')
// create calculator and modify functionalities of buttons
const calculator = new Calculator(firstOperandTextElement, secondOperandTextElement)
// event listeners
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})