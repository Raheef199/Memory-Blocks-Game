document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("What's your name");

  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }

  document.querySelector(".control-buttons").remove();
};

let duration = 1000;

let blocksContainer = document.querySelector(".memory-box-container");

let blocks = Array.from(blocksContainer.children);
///////////////////////////////////////////
// Create Range of Keys

let orderRange = [...Array(blocks.length).keys()];

// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);

// Another way to put elements into array
/* let orderRange = Array.from(Array(blocks.length).keys()); */

// Add Order CSS Property to game blocks
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  // Add Click Event
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});
////////////////////////////////////////////
// Flip block function
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");

  // Collect all flipped cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  // If there is 2 selected blocks
  if (allFlippedBlocks.length === 2) {
    // Stop clicking function
    stopClicking();
    // Check matched block function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

//////////////////////////////////
// Stop Clicking Function
function stopClicking() {
  // Add Class NO clicking on main container
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    // Remove Class No Clicking after the duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

////////////////////////////////////////////
// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);

    document.getElementById("fail").play();
  }
}

////////////////////////////////////////////
// Shuffle Function

function shuffle(array) {
  // Setting Vars
  let current = array.length;
  let temp;
  let random;

  while (current > 0) {
    // Get Random Element
    random = Math.floor(Math.random() * current);

    // Decrease length by 1
    current--;

    // [1] Save current element in stash
    temp = array[current];

    // [2] Current Element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element from stash
    array[random] = temp;
  }

  return array;
}

// Current Array [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

/*
  [1] Save current element in stash
  [2] Current Element = Random Element
  [3] Random Element = Get Element from stash
*/
