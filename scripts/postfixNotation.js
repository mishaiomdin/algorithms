// Project name: algorithms
// by @mishaiomdin

// Algorithm: postfix notation
// Started on: 18.05.2025

window.onload = function () {
    showSavedInputs();
};

const savedInputs = ["expression_input", ];
function showSavedInputs() {
    for (let i = 0; i < savedInputs.length; i++) {
        let id = savedInputs[i];
        const currentElement = document.getElementById(id);
        currentElement.value = localStorage.getItem(id) || "1 2 + 3 *";
        currentElement.addEventListener('input', saveLocalDataCallback);
    }

}

function parseExpression(expression) {
    return expression.split(" ");
}

function parseNumber(value) {
    if (/^[0-9]+$/.test(value)) {
        return parseInt(value, 10);
    }
    return null;
}

const OPERATORS = {
    "+": function (a, b) {return a + b},
    "-": function (a, b) {return a - b},
    "*": function (a, b) {return a * b},
    "/": function (a, b) {return a / b}
};

function parseOperator(value) {
    return OPERATORS[value] || null;
}

const numbersStack = document.getElementById("numbersStack");

function stackPush(number) {
    // TODO: something about previous and last
    newStackNumber = createElementWithArgs(
        'code', 
        number,
        {
            "id": "lastStackNumber",
            "class": "stackElement"
        }
    );
    numbersStack.appendChild(newStackNumber);
}

function stackPop() {
    lastElement = numbersStack.lastChild;
    lastValue = parseInt(lastElement.textContent, 10);
    numbersStack.removeChild(lastElement);
    return lastValue;
}

function stackShowLast() {
    lastElement = numbersStack.lastChild;
    lastValue = parseInt(lastElement.textContent, 10);
    return lastValue;
}

async function postfixNotationEval() {
    // Unshow old
    document.getElementById("receivedExpressionWrapper").style.display = "none";
    document.getElementById("numbersStackWrapper").style.display = "none";
    document.getElementById("resultEvalWrapper").style.display = "none";

    const evaluationResultElement = document.getElementById("evaluationResult");
    const button = document.getElementById("postfixNotationEvalButton");
    button.disabled = true;
    const expressionElement = document.getElementById("expression_input");
    expressionElement.disabled = true;
    const expression = expressionElement.value;
    var parsedExpression = parseExpression(expression);
    

    // Showing result block
    evaluationResultElement.style.display = "block";

    // Received expression: ...
    const receivedExpressionWrapper = document.getElementById("receivedExpressionWrapper");
    const receivedExpressionElement = document.getElementById("receivedExpression");
    receivedExpressionElement.innerHTML = "";
    receivedExpressionElement.textContent = `${parsedExpression.join(" ")}`;
    receivedExpressionWrapper.style.display = "block";

    // Splitting expression into spans
    const words = receivedExpressionElement.textContent.split(/(\s+)/);
    receivedExpressionElement.innerHTML = words
        .map(w => 
          /\s+/.test(w)
            ? w
            : `<span>${w}</span>`
        )
        .join('');
    const spans = Array.from(receivedExpressionElement.querySelectorAll('span'));

    await sleep(1000);

    // Received expression: ...
    const numbersStackWrapper = document.getElementById("numbersStackWrapper");
    numbersStack.innerHTML = "";
    numbersStackWrapper.style.display = "block";

    await sleep(1000);

    // Parsing elements
    for (let i = 0; i < parsedExpression.length; i++) {
        spans[i].style.color = 'red';
        let value = parsedExpression[i];
        let parsedNumber = parseNumber(value);
        let parsedOperator = parseOperator(value);
        if (parsedNumber !== null) {
            // adding number to stack
            stackPush(parsedNumber);
        }
        else if (parsedOperator !== null) {
            secondOperand = stackPop();
            firstOperand = stackPop();
            stackPush(parsedOperator(firstOperand, secondOperand));
        }
        await sleep(1000);
        spans[i].style.color = 'black';
    }

    // Result: ...
    const resultEvalWrapper = document.getElementById("resultEvalWrapper");
    const resultEval = document.getElementById("resultEval");
    resultEval.innerHTML = "";
    resultEval.textContent = `${stackShowLast()}`;
    resultEvalWrapper.style.display = "block";

    // Enabling re-run
    button.disabled = false;
    expressionElement.disabled = false;
}