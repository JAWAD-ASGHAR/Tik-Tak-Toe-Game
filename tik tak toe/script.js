let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetButton");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg_container");
let newGame = document.querySelector("#newBtn")

// track winner
let winner = 0;

// inital play turn
let turnX = true;

// count the number of steps
let count = 0;

// array for winning patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

// print draw
const draw = () => {
    msg.innerText = `It's a Draw`;
    disableBoxes();
    msgContainer.classList.remove("hide");
}

//increment count and check for draw
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        count++
        console.log(count);
        if (count === 9 && winner === 0) {
            draw();
        }
    });
});

// print X or O and alternate palying turn
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX) {
            box.innerText = 'X';
            box.classList.remove("o");
            turnX = false;
        } else {
            box.innerText = 'O';
            box.classList.add("o");
            turnX = 'true';
        }

        box.disabled = true;

        checkWinner();

    });
});

// disable boxes
const disableBoxes = () => {
    for (const box of boxes) {
        box.disabled = true;
    }
}

//enable boxes
const enableBoxes = () => {
    for (const box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const resetGame = () => {
    turnX = true;
    enableBoxes();
    count = 0;
    winner = 0;
    msgContainer.classList.add("hide");
}


//check and print winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let Pos1Val = boxes[pattern[0]].innerText;
        let Pos2Val = boxes[pattern[1]].innerText;
        let Pos3Val = boxes[pattern[2]].innerText;

        if (Pos1Val != "" && Pos2Val != "" && Pos3Val != "") {
            if (Pos1Val === Pos2Val && Pos2Val === Pos3Val) {
                msg.innerText = `Winner is ${Pos1Val}`;
                winner++
                disableBoxes();
                msgContainer.classList.remove("hide");
            }
        }
    }
}

// working of reset and new game buttons
resetBtn.addEventListener('click', resetGame);
newBtn.addEventListener('click', resetGame);