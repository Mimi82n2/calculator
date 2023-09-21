// Variable for performing calculations
let num1 = 0;
let num2 = 0;
let selectedOperator = "";

// Stores the strings to be displayed on the calculator screen
let calcDisplayValue = "";
let resultDisplayValue = "0";

// HTML elements for the screen display
const resultDisply = document.querySelector(".result");
const calcDisplay = document.querySelector(".calc");

// Add event listener to each number button that will update our screen
const numbers = document.querySelectorAll(".num");
numbers.forEach(number => {
    number.addEventListener("click", ()=>{
        if (number.textContent === "." && resultDisplayValue.includes(".")){
            return
        }
        if (resultDisplayValue === "0"){
            resultDisplayValue = number.textContent;
        }else{
            resultDisplayValue = resultDisplayValue + number.textContent;
        }
        resultDisply.textContent = resultDisplayValue;
    });
});

// Add event listener to each operator that will compute the results and update our screen
const operators = document.querySelectorAll(".operator");
operators.forEach(operator => {
    operator.addEventListener("click", () =>{
        if (resultDisplayValue === ""){
            return;
        }
        if (calcDisplayValue){
            num2 = Number(resultDisplayValue);
            num1 = operate(selectedOperator, num1, num2);
            num1 = Math.round(num1 * 1000000)/1000000;
            selectedOperator = operator.textContent;
            calcDisplayValue = num1.toString() + ' ' + selectedOperator;
            resultDisplayValue = "";
        }else{
            num1 = Number(resultDisplayValue);
            selectedOperator = operator.textContent;
            calcDisplayValue = resultDisplayValue + ' ' + selectedOperator
            resultDisplayValue = "0";
        }
        
        calcDisplay.textContent = calcDisplayValue;
        resultDisply.textContent = resultDisplayValue;
    });
});

// Add on click listener to our equals button to operate on our input and display the result
document.querySelector(".equal").addEventListener("click", () => {
    if (!(calcDisplayValue)){
        return
    }
    num2 = Number(resultDisplayValue);
    num1 = operate(selectedOperator, num1, num2);
    num1 = Math.round(num1 * 1000000)/1000000;
    resultDisplayValue = num1.toString();
    calcDisplayValue = "";

    calcDisplay.textContent = calcDisplayValue;
    resultDisply.textContent = resultDisplayValue;
});

// Clear button to clear all values
document.querySelector(".ac").addEventListener("click", () => {
    calcDisplayValue = "";
    resultDisplayValue = "0";
    calcDisplay.textContent = calcDisplayValue;
    resultDisply.textContent = resultDisplayValue;
});

// Deletes a single number from our input
document.querySelector(".del").addEventListener("click", () => {
    if (resultDisplayValue.length <= 1){
        resultDisplayValue = "0";
    }else{
        resultDisplayValue = resultDisplayValue.substring(0,resultDisplayValue.length-1);
    }
    resultDisply.textContent = resultDisplayValue;
});

// Given a operator and num1 and num2, return the result
function operate(operator, num1, num2){
    switch(operator){
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
        case "%":
            return num1 % num2;
        default:
            return 0;
    }
}



