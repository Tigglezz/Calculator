let screen = document.getElementById("screen");

var firstNum = null;
var secondNum = null;
var operator = null;
var operatorCheck;

//Operator function
function operate(firstNum, secondNum, operator) {
    firstNum = parseFloat(firstNum);
    secondNum = parseFloat(secondNum);

    //Decide what operation to do based on operator
    switch(operator)
    {
        case "+":
            return add(firstNum, secondNum)
        break;

        case "-":
            return subtract(firstNum, secondNum);

        break;

        case "×":
            return multiply(firstNum, secondNum);

        break;

        case "÷":
            return divide(firstNum, secondNum);
        break;

        default:
    
        break;
    }    
};

//Functions to calucate
function add(firstNum, secondNum) {
    return firstNum + secondNum;
};
function subtract(firstNum, secondNum) {
    return firstNum - secondNum;
};
function multiply(firstNum, secondNum) {
    return firstNum * secondNum;
};
function divide(firstNum, secondNum) {
    if(secondNum == 0){
        return "No";//Math error divide by zero
    }

    return firstNum / secondNum;
};

//Function to add numbers to screen and store them
function screenRefresh(input)
{    
    //Numbers
    if((/\d/.test(input) || input == ".") && (screen.innerText.length < 13))
    {    
        //Refresh if operator chosen
        if(operatorCheck == true)
        {
            operatorCheck = false;
            screen.innerText = "";
        }
        
        //Add to screen
        screen.innerText += input;
    }
    //Operators
    else if(input == "c")
    {
        //clear calculator
        clear();
    }
    else if(input == "d")
    {
        //backspace
        screen.innerText = screen.innerText.slice(0,-1);
    }
    else{
        if(firstNum == null)
        {
            firstNum = screen.innerText;
        }
        else{
            secondNum = screen.innerText;
        }
        
        //Get result
        if(input == "=")
        {   
            //When number is pressed after equals start new calculation
            firstNum = operate(firstNum,secondNum,operator);//continue operation
        }
        else{
            operator = input;//operator
            operatorCheck = true;

            if(secondNum != null)
            {
                firstNum = operate(firstNum,secondNum,operator);//continue operation
                secondNum = null;
            }
        }
        screen.innerText = firstNum;
    }

    //console.log(firstNum + "\n");
    //console.log(secondNum + "\n");


};

function clear()
{
    //clear calculator
    firstNum = null;
    secondNum = null;
    operator = null;
    screen.innerText = "";
}



/*TEST
var firstNum = prompt("First Num?");
var operator = prompt("Operator?");
var secondNum = prompt("Second Num?");
        console.log("first = " + firstNum);
        console.log("op = " + operator);
        console.log("second = " + secondNum);
        console.log("result = " + result);

console.log(operate(firstNum,secondNum,operator));
*/
