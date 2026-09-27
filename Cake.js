// tandai sudah dikunjungi (dipakai hub buat cek unlock bonus page)
localStorage.setItem("visited_cake", "true");

// ================= STATE =================
const totalCandles = 4;
let candleStatus = [false, false, false, false]; // FALSE = wish belum dibuka

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

        // sistem cek dulu apakah lilin ini sudah pernah diklik
        if (candleStatus[index] === true) {
            showToast();
            return;
        }

        // status diubah jadi aktif (TRUE)
        candleStatus[index] = true;
        candle.classList.add("found");

        // tampilkan wish card yang sesuai
        wishCards[index].classList.add("revealed");

        checkAllFound();
    });
});

// ================= MAKE A WISH SEQUENCE =================
const finalOverlay = document.getElementById("finalOverlay");
const finalText = document.getElementById("finalText");
const backFinalBtn = document.getElementById("backFinalBtn");

makeWishBtn.addEventListener("click", () => {
    // tiup lilin: marker yang tersisa ikut memudar, foto kue meredup pelan (simulasi lilin padam)
    candles.forEach(candle => candle.classList.add("blowing"));
    cakePhoto.classList.add("dimmed");

    // setelah "lilin padam", tampilkan overlay
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