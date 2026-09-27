// tandai sudah dikunjungi (dipakai hub buat cek unlock bonus page)
localStorage.setItem("visited_memories", "true");

// ================= DATA MEMORY =================
// Teks di bawah ini ditranskrip dari fotomu — silakan koreksi kalau ada yang meleset

const judulMemory = [
    "where it all started",
    "the \u201cconsumption\u201d mission",
    "\u201csayang, tenang dulu...\u201d",
    "finally, us \u2661"
];

const isiMemory = [
`Pertama kali kita interaksi saat kumpul organisasi buat nyiapin hadiah lomba.

Ngobrolnya masih tipis-tipis, belum sedekat sekarang.

Tapi kalau dipikir-pikir lagi... lucu juga yaa, ternyata dari obrolan kecil itu bakal ada cerita sejauh ini. ♡`,

`or... my very obvious excuse to see you ♡

Masih inget nggak waktu kelas 12 ini? Aku mau nyolong konsumsi 😳 Terus kamu datang... dan gagal deh.

Kamu bawa bayinya ibu kan waktu itu? Terus akhirnya kita malah main berdua sama bayinya.

Kalau dipikir-pikir sekarang... aku cuma modus aja deh mwehehhehe, mau main sama bayinya, padahal mau ketemu sama yang bawa bayinya. ♡`,

`Terus ada lagi momen pas wawancara itu. Kamu duduk di depan ulun, trus ulun tenangin kamu, sayang.

Abis itu kita fotbar kann... tapi fotonya sekarang mana yaa? 🥲

Sedih sih kalau dipikir-pikir, tapi untungnya momennya masih inget.

Kita juga sempat jailin Jaki kann waktu itu, terus habis dari sini... akhirnya ulun mulai caper sama kamu di IG. mweheehhe ♡`,

`Dari yang awalnya cuma ngobrol tipis-tipis, sampai akhirnya kita punya foto bareng sebagai kita.

Foto setelah wisuda ini mungkin cuma satu foto, tapi rasanya kayak penutup dari banyak cerita kecil sebelumnya.

Dan sekarang... ulun malah kangen ketemu kamu lagi. ♡`
];

// ================= ELEMENT =================
const hotspots = document.querySelectorAll(".memory-hotspot");
const modalOverlay = document.getElementById("memoryModalOverlay");
const modalNumber = document.getElementById("modalNumber");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalClose = document.getElementById("modalClose");
const modalCloseBtn = document.getElementById("modalCloseBtn");

function bukaMemory(index) {
    modalNumber.textContent = String(index + 1).padStart(2, "0");
    modalTitle.textContent = judulMemory[index];
    modalText.textContent = isiMemory[index];
    modalOverlay.classList.remove("hidden");
}

function tutupMemory() {
    modalOverlay.classList.add("hidden");
}

hotspots.forEach(btn => {
    btn.addEventListener("click", () => {
        const index = parseInt(btn.dataset.index, 10);
        bukaMemory(index);
    });
});

modalClose.addEventListener("click", tutupMemory);
modalCloseBtn.addEventListener("click", tutupMemory);

// klik area gelap di luar kartu juga menutup modal
modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) tutupMemory();
});