const alphabet = "abcdefghijklmnopqrstuvwxyz";
const alphabetCaps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphaNums = 26; // added this instead of alphabet.length since ther are two alphabet const ie alphabetCaps


//This function will encrypt one letter at a time. Which we can use to build our message 
function eLetter(letter, shiftValue) {

// both if statements are meant to check for lower case and Upper Case letters. 
//I did it this way to ensure the message remains the same.    
  if (alphabet.includes(letter)) {
    const i = alphabet.indexOf(letter);
    const newI = (i + shiftValue) % alphaNums;
    return alphabet[newI];
  } else if (alphabetCaps.includes(letter)) {
    const i = alphabetCaps.indexOf(letter);
    const newI = (i + shiftValue) % alphaNums;
    return alphabetCaps[newI];
  }
}
function dLetter(letter, shiftValue) {
/*I had an issue with using the shiftValues greater than 42, this would cause 
there to be a negative shiftValue with is out of bounds of the alphabet string returning undefined. 
Therefore I made this while loop to ensure the value will always hold true for my newI calculation*/ 
 
  while (shiftValue >= 26) {
    shiftValue -= 26;
  }
// both if statements are meant to check for lower case and Upper Case letters. 
//I did it this way to ensure the message remains the same.  
  if (alphabet.includes(letter)) {
    const i = alphabet.indexOf(letter);
    const newI = (i - shiftValue + alphaNums) % alphaNums;
    return alphabet[Math.abs(newI)];
  } else if (alphabetCaps.includes(letter)) {
    const i = alphabetCaps.indexOf(letter);
    const newI = (i - shiftValue + alphaNums) % alphaNums;
    return alphabetCaps[newI];
  }
}

//returns a random letter
function randomLetter() {
  return alphabet[Math.floor(Math.random() * 26)];
}

// used to remove the random lettered added from the encryption
function rebuildString(ogStr) {
  let newStr = "";
  let count = 0;

  //remove every thrid character we are also checking if its a space or punctuation marks

  for (let i = 0; i < ogStr.length; i++) {
    if (
      alphabet.includes(ogStr[i]) ||
      alphabetCaps.includes(ogStr[i]) ||
      ogStr === " "
    ) {
      count++;

      if (count % 3 !== 0) {//every third character it wont be added to the string, thus removing the random letter adde after every 2 two letters

        newStr += ogStr[i];
      }
    } else { //if the string contains any else that isn't a letter its added back to the string.
      newStr += ogStr[i];
      count++;
    }
  }

  return newStr;
}
//takes in a message and returns an encrpyted message. Used a similar idea from the previous lessons, with some added checks to ensure the encryption works

function encrypt(message, shiftValue) {
  // Your encryption code here
  // start buidling an empty string
  let encryptedMessage = "";
  let rnd = 0;

  // loop through the input string characters
  for (let i = 0; i < message.length; i++) {
    const characters = message[i];

    //Check the string for characters
    if (
      alphabet.indexOf(characters) === -1 &&
      alphabetCaps.indexOf(characters) === -1
    ) {
      encryptedMessage += characters;
      rnd++; //increase count
    } else {
      encryptLetter = eLetter(characters, shiftValue); // calls function to encrpyt the current letter in the message
      encryptedMessage += encryptLetter; //adds the letter to a string for the message.
      rnd++; //increases count
    }
    // console.log(rnd);
    //adds a random letter into the message when the counter hits 2
    if (rnd === 2) {
      encryptedMessage += randomLetter();
      rnd = 0;
    }
  }
  return encryptedMessage; //returns encrypted Message
}
//The function here will decrypt the message properly  it is essenitally the same function as encrypt but can reverse it.
function decrypt(encryptedMessage, shiftValue) {
  let decryptedMessage = "";
  let newEncryptedMessage = rebuildString(encryptedMessage);
  //console.log(newEncryptedMessage);
  for (let index = 0; index < newEncryptedMessage.length; index++) {
    let characters = newEncryptedMessage[index];
// checking both the lower case and Upper Case letters here.
    if (
      alphabet.indexOf(characters) === -1 &&
      alphabetCaps.indexOf(characters) === -1
    ) {
      decryptedMessage += characters;
    } else {
      //characters;
      // encrpyt the letter
      decryptLetter = dLetter(characters, shiftValue);
      decryptedMessage += decryptLetter;
    }
  }
  return decryptedMessage;
}

//basically we are using smaller functions that encrpyt a letter and we build a message returning the encryption
//we have checks and ways to account for spaces and other non-letter characters
//added a function that add random letters
//we are able to remove the random letters.


let message = encrypt("I Love Yasmin So much and I pray that she'll remain by my side for my entire life. There isnt a woman in the world more understanding and loyal as my girlfriend. Who I need to stop hurting and build a life with and a strong foundation of love and trust.", 12)
console.log(message)
console.log(decrypt(message,12))