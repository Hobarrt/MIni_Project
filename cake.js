localStorage.setItem("visited_cake", "true");

const totalCandles = 4;
let candleStatus = [false, false, false, false]; 

const candles = document.querySelectorAll(".candle-marker");
const wishCards = document.querySelectorAll(".wish-card");
const cakeInstruction = document.getElementById("cakeInstruction");
const makeWishBtn = document.getElementById("makeWishBtn");
const foundToast = document.getElementById("foundToast");
const cakePhoto = document.querySelector(".cake-photo");

let toastTimer = null;

function showToast() {
    foundToast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => foundToast.classList.remove("show"), 1600);
}

function checkAllFound() {
    const allFound = candleStatus.every(status => status === true);
    if (allFound) {
        cakeInstruction.textContent = "you found them all ♡";
        makeWishBtn.classList.remove("hidden");
    }
}

candles.forEach(candle => {
    candle.addEventListener("click", () => {
        const index = parseInt(candle.dataset.index, 10);

       
        if (candleStatus[index] === true) {
            showToast();
            return;
        }

       
        candleStatus[index] = true;
        candle.classList.add("found");

        
        wishCards[index].classList.add("revealed");

        checkAllFound();
    });
});


const finalOverlay = document.getElementById("finalOverlay");
const finalText = document.getElementById("finalText");
const backFinalBtn = document.getElementById("backFinalBtn");

makeWishBtn.addEventListener("click", () => {
    
    candles.forEach(candle => candle.classList.add("blowing"));
    cakePhoto.classList.add("dimmed");

    
    setTimeout(() => {
        finalOverlay.classList.remove("hidden");
        finalText.textContent = "make a wish, sayang... ♡";

        setTimeout(() => {
            finalText.textContent = "I hope your wish comes true.";
        }, 2600);

        setTimeout(() => {
            finalText.textContent = "Happy 18th, my favorite person. 🫶";
        }, 5200);

        setTimeout(() => {
            backFinalBtn.classList.remove("hidden");
        }, 6800);

    }, 900);
});
