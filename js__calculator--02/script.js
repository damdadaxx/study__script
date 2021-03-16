
class Calculator {
    constructor(displayElement) {
        this.displayElement = displayElement;
        // this.displayContent = '';
        this.operatorCheck = true; // 연산자 선택 여부 저장 (false -> true)
        this.equalsCheck = false; // = 버튼 클릭 여부 관리
        this.clear();
    }

    appendNumber(number) {
        if (this.equalsCheck) {
            this.displayContent = number; // 새로운 식 입력
            this.equalsCheck = false; // 숫자 입력 시 false
        } else {
            this.displayContent += number; // 기존 식에 추가
        }
        this.operatorCheck = false;
    }

    appendOperator(operator) {
        if (this.operatorCheck) return false // operatorCheck 값이 true 이면 함수 빠져나감
        if (this.equalsCheck) this.equalsCheck = false;
        this.displayContent += operator;
        return this.operatorCheck = true; // 연산자 입력 시 true
    }

    updateDisplay() {
        this.displayElement.value = this.displayContent;
    }

    clear() {
        this.displayContent = '';
        this.displayElement.value = 0;
        this.operatorCheck = true;
    }

    compute() {
        if (this.operatorCheck) return // 연산자가 마지막으로 입력된 상태 -> evla() 함수 작동 중지
        this.displayContent = eval(
            this.displayContent
                .replace('\u00D7', '*')
                .replace('\u00F7', '/')
        )
        this.equalsCheck = true;
    }
}

const BUTTONS = document.querySelectorAll("button");
const displayElement = document.querySelector("input");

const calculator = new Calculator(displayElement);

BUTTONS.forEach(button => {
    button.addEventListener("click", () => {
        switch (button.dataset.type) {
            case 'operator':
                // console.log('operator');
                if (calculator.appendOperator(button.innerText)) {
                    calculator.updateDisplay();
                }
                break;
            case 'ac':
                // console.log('ac');
                calculator.clear();
                break;
            case 'equals':
                // console.log('equals');
                calculator.compute();
                calculator.updateDisplay();
                break;
            default:
                // console.log('number');
                calculator.appendNumber(button.innerText);
                calculator.updateDisplay();
                break;
        }
    })
})