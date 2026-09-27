let noClick = 0;

const messages = [
    "yakin? 🥺",
    "serius nih? 😭",
    "jangan gitu dong 😔",
    "pliss pilih yes 🥹",
    "YES AJA PLS 😭❤️"
];

function noButton() {
    const noBtn = document.querySelector(".no-btn");

    if (noClick < messages.length) {
        noBtn.innerHTML = messages[noClick];
        noClick++;
    } else {
        noBtn.innerHTML = messages[messages.length - 1];
    }
}