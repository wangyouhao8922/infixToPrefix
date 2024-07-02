function isAlphaNumeric(str) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
};

function spitStringIntoElement(str) {
  let parenthesesCounter = 0;
  let tempElement = "";
  let firstElement = null;
  let operator = null;
  let secondElement = null;
  for (let i = 0; i < str.length; i++) {
    // if already encounter "(", store char into tempElement.
    if (0 !== parenthesesCounter) {
      // if char is ")" and parenthesesCounter is 1, store tempElement into firstElement or secondElement.
      if (1 === parenthesesCounter && ")" === str[i]) {
        if (null === firstElement) {
          firstElement = tempElement;
        } else {
          secondElement = tempElement;
          return [operator, spitStringIntoElement(firstElement), spitStringIntoElement(secondElement)].join("")
        }
        // after set firstElement, reset tempElement.
        tempElement = "";
        parenthesesCounter -= 1;
        continue;
      }
      // if char is "(", increase parenthesesCounter.
      if ("(" === str[i]) {
        tempElement += str[i];
        parenthesesCounter += 1;
        continue;
      }
      // if char is ")", decrease parenthesesCounter.
      if (")" === str[i]) {
        tempElement += str[i];
        parenthesesCounter -= 1;
        continue;
      }
      // if string is not end, store char into tempElement.
      tempElement += str[i];
      continue;
    }
    // if doesn't encounter "(" yet. Check if char is alphaNumeric or "(".
    if (null === firstElement) {
      if (isAlphaNumeric(str[i])) {
        firstElement = str[i];
        continue;
      }
      if(str[i] === "(") {
        parenthesesCounter += 1;
        continue;
      }
    } else {
      if (isAlphaNumeric(str[i])) {
        secondElement = str[i];
        return [operator, spitStringIntoElement(firstElement), spitStringIntoElement(secondElement)].join("");
      }
      if(str[i] === "(") {
        parenthesesCounter += 1;
        continue;
      }
    }
    if ("+" === str[i] || "-" === str[i] || "*" === str[i] || "/" === str[i]) {
      operator = str[i];
    }
  }
  if (firstElement.length === 1) return firstElement;
  return spitStringIntoElement(firstElement);
}

function infixToPrefix(str) {
  // check input string
  if (!str || str.length === 0) return '';
  return spitStringIntoElement(str);
}

console.log(infixToPrefix("3*(1+5)")); // *3+15