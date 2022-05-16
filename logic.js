// construct current word with the keys that are being pressed down
// if key is Backspace then remove last letter from current word

// to submit word check that all 5 letters are in the word
// then check if the word is in the dictionary, VALID
  // if INVALID then display error message
  // if VALID then check if the word is a MATCH 
    // if NOT MATCH then move to next row & color tiles that match a letter in the winning word -> check for ocurrence and position
      // iterate inside the wininning word
        // match against the letters in the current word
        // if we get a match then save character and position/index matching
          // check if position matches current word and winning word
        // use that saved object to color the tiles
          // yellow if only a letter is matched
          // green if both letter and position are matched
    // if NOT MATCH && no more ROWS then display losing message*
    //* if MATCH then display winning message

// find active row -> active = true
// find active tile -> the first tile that has no letter -> letter =""
// change tile's letter atribute key value

const dictionary = [
  "animo",
  "botas",
  "caras",
  "daras",
  "deuda",
  "dulce",
  "anime"
]

const winningWord = "daras" // randomize, might be useful to create a list of valid winning words

let currentWord = "";

let attemptNumber = 1; // current attempt, number of attempts is number of rows


document.addEventListener('keydown', (event) => { // add check for keys that are not being used so nothing gets triggered
  let activeRow = document.querySelector("[active]") 
  const activeTile = activeRow.querySelector("[letter='']")
  const prevTile = activeTile?.previousElementSibling; 
  
  // console.log("event ==>", event.key)
  // console.log("activeRow ==>", activeRow)
  // console.log("activeTile ==>", activeTile)
  // console.log("prevTile ==>", prevTile)
  // console.log("currentWord ==>", currentWord);
  // console.log("attemptNumber ==>", attemptNumber);
  
  if(event.key === "Backspace" && prevTile) { // delete letter that are not the last letter
    prevTile.setAttribute("letter", "");
    prevTile.innerHTML = "";
    currentWord = currentWord.slice(0, -1);
  }

  if(event.key === "Backspace" && !activeTile) { // last letter in row
    const emptyLastTile = activeRow.querySelector(":nth-child(5)");
    emptyLastTile.setAttribute("letter", "");
    emptyLastTile.innerHTML = "";
    currentWord = currentWord.slice(0, -1);
  }

  if(event.key === "Enter" && !activeTile) { // submiting word
    console.log("Submiting word:", currentWord);
    
    if(dictionary.includes(currentWord)) {
      console.log("word is valid");
      
      if(currentWord === winningWord) {
        console.log("YOU WIN");
        
        activeRow.querySelectorAll("[letter]").forEach(tile => {
          tile.style.backgroundColor = "green";
        })

        activeRow.removeAttribute("active");
        
      } else {
        if(attemptNumber !== 3) { // check if there are more rows to move to next attempt
          console.log("word is not a match, moving to next row");
          
          activeRow.querySelectorAll("[letter]").forEach(tile => {
            tile.style.backgroundColor = "grey";
          })

          for (let i = 0; i < currentWord.length; i++) {
            if (winningWord.includes(currentWord[i]) && winningWord.indexOf(currentWord[i], i) === i) {
              const tileToColor = activeRow.querySelectorAll(`[letter='${currentWord[i]}']`);
              tileToColor.forEach(tile => {
                tile.style.backgroundColor = "green";
              });
            } else if (winningWord.includes(currentWord[i]) && winningWord.indexOf(currentWord[i], i) !== i) {
              const tileToColor = activeRow.querySelector(`:nth-child(${i+1})`);
              tileToColor.style.backgroundColor = "yellow";
            }
          }

          const nextRow = activeRow.nextElementSibling
          nextRow.setAttribute("active", "");
          currentWord = "";
          attemptNumber++;
          activeRow.removeAttribute("active");

        } else {
          activeRow.querySelectorAll("[letter]").forEach(tile => {
            tile.style.backgroundColor = "grey";
          })
          
          for (let i = 0; i < currentWord.length; i++) {
            if (winningWord.includes(currentWord[i]) && winningWord.indexOf(currentWord[i], i) === i) {
              const tileToColor = activeRow.querySelectorAll(`[letter='${currentWord[i]}']`);
              tileToColor.forEach(tile => {
                tile.style.backgroundColor = "green";
              });
            } else if (winningWord.includes(currentWord[i]) && winningWord.indexOf(currentWord[i], i) !== i) {
              const tileToColor = activeRow.querySelector(`:nth-child(${i+1})`);
              tileToColor.style.backgroundColor = "yellow";
            }
          }
          
          console.log("word is not a match & no rows left, YOU LOSE");

          activeRow.removeAttribute("active");
        }
      }

    } else {
      console.log("word is invalid, use a different word");
    }
  }
  
  if (activeTile) { // I need to only accept A-Z
    if(event.key.length === 1 && event.key.match(/[a-z]/ig)) {
      activeTile.setAttribute("letter", event.key.toLowerCase());
      activeTile.innerHTML = event.key.toUpperCase();
      currentWord = currentWord + event.key.toLocaleLowerCase();
    }
  }

});