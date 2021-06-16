let screen = document.getElementById("screen");
var firstNum = null;
var secondNum = null;
var operator = null;
var operatorCheck;
var result;

//Operator function
function operate(firstNum, secondNum, operator) {
  firstNum = parseFloat(firstNum);
  secondNum = parseFloat(secondNum);

  //Decide what operation to do based on operator
  switch (operator) {
    case "+":
      return add(firstNum, secondNum);
    case "-":
      return subtract(firstNum, secondNum);
    case "×":
      return multiply(firstNum, secondNum);
    case "÷":
      return divide(firstNum, secondNum);
  }
}

//Functions to calculate
function add(firstNum, secondNum) {
  return firstNum + secondNum;
}
function subtract(firstNum, secondNum) {
  return firstNum - secondNum;
}
function multiply(firstNum, secondNum) {
  return (firstNum * secondNum).toFixed(2);//2 decimal place
}
function divide(firstNum, secondNum) {
  if (secondNum == 0) {
    return "No"; //Math error divide by zero
  }

  return (firstNum / secondNum).toFixed(2);//2 decimal place
}

//Function to add numbers to screen and store them
function screenRefresh(input) {
  //Numbers
  if ((/\d/.test(input) || input == ".") && screen.innerText.length < 11) {
    //Add to screen
    if (result != null) {
      screen.innerText = input;
      result = null;
    } else if (operatorCheck == true) {
      screen.innerText = input;
      operatorCheck = false;
    } else {
      screen.innerText += input;
    }
  }
  //Operators
  else if (input == "c") {
    //clear calculator
    clear();
  } else if (input == "d" || input == "Backspace") {
    //backspace -- reset number
    if (secondNum == null) {
      firstNum = null;
      operatorCheck = false;
    }
    screen.innerText = screen.innerText.slice(0, -1);
  } else if (/\D/.test(input)) {
    if (operatorCheck != true) {
      //Store number
      getNumber();

      if (firstNum != null && secondNum != null) {
        if (operator != "=") {
          firstNum = operate(firstNum, secondNum, operator);
          screen.innerText = firstNum;
        } else {
          result = operate(firstNum, secondNum, operator);
          firstNum = null;
          secondNum = null;
          getNumber();
        }

        secondNum = null;
      }

      operatorCheck = true;
      operator = input; //operator
    } else if (input != operator) {
      operator = input;
    }
  }
}

function clear() {
  //clear calculator
  firstNum = null;
  secondNum = null;
  operator = null;
  operatorCheck = false;
  screen.innerText = "";
}

function getNumber() {
  if (firstNum == null) {
    firstNum = screen.innerText;
  } else if (secondNum == null) {
    secondNum = screen.innerText;
  }
}

document.addEventListener("keydown", function (event) {
  // The parameter event is of the type KeyboardEvent
  var key = event.key;
  if (key == "Enter") {
    key = "=";
  }
  screenRefresh(event.key);
});
