// tandai sudah dikunjungi (dipakai hub buat cek unlock bonus page)
localStorage.setItem("visited_music", "true");

// ================= DATA LAGU =================
const jumlahLagu = 2;

const judulLagu = ["Sempurna", "1000x"];
const penyanyi = ["Andra and The Backbone", /* Ganti nama penyanyi 1000x */ "Dhea Indrawati"];
const fileLagu = ["Audio/sempurna.mp3", "Audio/1000x.mp3"];
const quoteLagu = ["a song for you ♡", "another song that somehow feels like you"];

const alasanLagu = [
    // Ganti dengan alasan personal kamu untuk tiap lagu
    "Ada beberapa lagu yang entah kenapa kalau didengar selalu bikin ulun ingat sama sayang. Setiap kali lagu ini terdengar, rasanya seperti ada sesuatu yang mengingatkan ulun sama hari-hari yang pernah kita lewati.\n\nMaybe that's why this song belongs here. ♡",
    "Lagu ini selalu ngingetin aku sama kamu, karena setiap kali dengerin, rasanya kayak ada 1000 alasan buat terus sayang sama kamu.\n\nKayak lagu ini, kamu juga selalu jadi alasan aku buat jadi versi terbaik dari diri aku sendiri. ♡"
];

// status TRUE kalau lagu itu sudah pernah dibuka/didengarkan
let statusLagu = [false, false];
let laguSedangDiputar = -1;
let musikBerjalan = false;

// ================= ELEMENT: HOME =================
const musicHome = document.getElementById("musicHome");
const homeDimOverlay = document.getElementById("homeDimOverlay");
const sceneBg = document.querySelector(".scene-bg");
const hotspotSempurna = document.getElementById("hotspotSempurna");
const hotspot1000x = document.getElementById("hotspot1000x");
const foundMarkSempurna = document.getElementById("foundMarkSempurna");
const foundMark1000x = document.getElementById("foundMark1000x");
const finalLayer = document.getElementById("finalLayer");
const finalText1 = document.getElementById("finalText1");
const finalBtn = document.getElementById("finalBtn");
const backHubBtn = document.getElementById("backHubBtn");

// ================= ELEMENT: DETAIL =================
const songDetail = document.getElementById("songDetail");
const detailBackBtn = document.getElementById("detailBackBtn");
const detailCounter = document.getElementById("detailCounter");
const songTitleMain = document.getElementById("songTitleMain");
const songArtistMain = document.getElementById("songArtistMain");
const cardSongTitle = document.getElementById("cardSongTitle");
const cardSongArtist = document.getElementById("cardSongArtist");
const cardQuote = document.getElementById("cardQuote");
const vinyl = document.getElementById("vinyl");
const tonearm = document.getElementById("tonearm");
const trackStatus = document.getElementById("trackStatus");
const progressBar = document.getElementById("progressBar");
const progressFill = document.getElementById("progressFill");
const timeCurrent = document.getElementById("timeCurrent");
const timeDuration = document.getElementById("timeDuration");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const whyBtn = document.getElementById("whyBtn");
const whyCard = document.getElementById("whyCard");
const whyText = document.getElementById("whyText");
const whyClose = document.getElementById("whyClose");
const whyCloseBtn = document.getElementById("whyCloseBtn");
const audioPlayer = document.getElementById("audioPlayer");

function formatTime(sec) {
    if (!isFinite(sec) || sec < 0) sec = 0;
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

// ================= BUKA SONG DETAIL =================
function bukaLagu(index) {
    laguSedangDiputar = index;

    songTitleMain.textContent = judulLagu[index];
    songArtistMain.textContent = penyanyi[index];
    cardSongTitle.textContent = "♪ " + judulLagu[index];
    cardSongArtist.textContent = penyanyi[index];
    cardQuote.textContent = `"${quoteLagu[index]}"`;
    detailCounter.textContent = `${index + 1} / ${jumlahLagu}`;

    audioPlayer.pause();
    audioPlayer.src = fileLagu[index];
    audioPlayer.currentTime = 0;
    progressFill.style.width = "0%";
    timeCurrent.textContent = "00:00";
    timeDuration.textContent = "00:00";
    musikBerjalan = false;
    updatePlayingUI();

    whyCard.classList.add("hidden");

    musicHome.classList.add("hidden");
    songDetail.classList.remove("hidden");
}

hotspotSempurna.addEventListener("click", () => bukaLagu(0));
hotspot1000x.addEventListener("click", () => bukaLagu(1));

prevBtn.addEventListener("click", () => {
    const newIndex = (laguSedangDiputar - 1 + jumlahLagu) % jumlahLagu;
    bukaLagu(newIndex);
});

nextBtn.addEventListener("click", () => {
    const newIndex = (laguSedangDiputar + 1) % jumlahLagu;
    bukaLagu(newIndex);
});

// ================= PLAY / PAUSE =================
function updatePlayingUI() {
    if (musikBerjalan) {
        tonearm.classList.add("playing");
        playBtn.textContent = "⏸";
        trackStatus.textContent = "▶ playing...";
    } else {
        tonearm.classList.remove("playing");
        playBtn.textContent = "▶";
        trackStatus.textContent = laguSedangDiputar === -1 ? "" : "⏸ paused";
    }
}

playBtn.addEventListener("click", () => {
    if (musikBerjalan) {
        audioPlayer.pause();
        musikBerjalan = false;
    } else {
        audioPlayer.play().catch(() => {});
        musikBerjalan = true;
    }
    updatePlayingUI();
});

audioPlayer.addEventListener("loadedmetadata", () => {
    timeDuration.textContent = formatTime(audioPlayer.duration);
});

audioPlayer.addEventListener("timeupdate", () => {
    timeCurrent.textContent = formatTime(audioPlayer.currentTime);
    if (audioPlayer.duration) {
        progressFill.style.width = (audioPlayer.currentTime / audioPlayer.duration) * 100 + "%";
    }
});

audioPlayer.addEventListener("ended", () => {
    musikBerjalan = false;
    updatePlayingUI();
    progressFill.style.width = "0%";
});

progressBar.addEventListener("click", (e) => {
    if (!audioPlayer.duration) return;
    const rect = progressBar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audioPlayer.currentTime = ratio * audioPlayer.duration;
});

// ================= WHY THIS SONG? =================
whyBtn.addEventListener("click", () => {
    whyText.textContent = alasanLagu[laguSedangDiputar];
    whyCard.classList.remove("hidden");
});

function tutupWhyCard() {
    whyCard.classList.add("hidden");
}
whyClose.addEventListener("click", tutupWhyCard);
whyCloseBtn.addEventListener("click", tutupWhyCard);

// ================= BACK DARI SONG DETAIL =================
detailBackBtn.addEventListener("click", () => {
    audioPlayer.pause();
    musikBerjalan = false;

    // simpan status: lagu ini sudah pernah dibuka
    statusLagu[laguSedangDiputar] = true;

    songDetail.classList.add("hidden");
    musicHome.classList.remove("hidden");

    if (statusLagu[0]) foundMarkSempurna.classList.remove("hidden");
    if (statusLagu[1]) foundMark1000x.classList.remove("hidden");

    // cek: apakah KEDUA lagu sudah pernah dibuka?
    const semuaLaguDilihat = statusLagu.every(s => s === true);
    if (semuaLaguDilihat) {
        setTimeout(mulaiFinalMusicState, 700);
    }
});

// ================= FINAL MUSIC STATE =================
function fadeSwapText(el, text, holdMs, callback) {
    el.classList.remove("show");
    setTimeout(() => {
        el.textContent = text;
        el.classList.add("show");
        setTimeout(() => {
            if (callback) callback();
        }, holdMs);
    }, 500);
}

function mulaiFinalMusicState() {
    sceneBg.classList.add("dimmed");
    homeDimOverlay.classList.add("active");
    finalLayer.classList.remove("hidden");

    const seq1 = [
        "you heard both songs, baby...",
        "but maybe...",
        "there's one more thing."
    ];

    let i = 0;
    function nextLine() {
        if (i < seq1.length - 1) {
            fadeSwapText(finalText1, seq1[i], 1800, () => { i++; nextLine(); });
        } else {
            // baris terakhir tetap tampil, lalu tombol muncul
            fadeSwapText(finalText1, seq1[i], 600, () => {
                // FIX: harus dilepas dulu "hidden"-nya (display:none !important)
                // sebelum class "show" (opacity/transform) bisa terlihat efeknya.
                finalBtn.classList.remove("hidden");
                finalBtn.classList.add("show");
            });
        }
    }
    nextLine();
}

finalBtn.addEventListener("click", () => {
    finalBtn.classList.remove("show");

    const seq2 = [
        { text: "sometimes, a song can say what words can't.", hold: 2200 },
        { text: "thank you for being part of my favorite memories. ♡", hold: 2600 }
    ];

    let j = 0;
    function nextLine2() {
        if (j < seq2.length) {
            fadeSwapText(finalText1, seq2[j].text, seq2[j].hold, () => {
                j++;
                nextLine2();
            });
        } else {
            // FIX: sama seperti finalBtn, "hidden" harus dilepas dulu
            
            backHubBtn.classList.remove("hidden");
            backHubBtn.classList.add("show");
        }
    }
    nextLine2();
});