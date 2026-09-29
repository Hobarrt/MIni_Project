// tandai sudah dikunjungi (dipakai hub buat cek unlock bonus page)
localStorage.setItem("visited_music", "true");

// ================= DATA LAGU =================
const jumlahLagu = 2;

const judulLagu = ["Sempurna", "1000x"];
const penyanyi = ["Andra and The Backbone", "Dhea Indrawati"];
// NOTE: nama file huruf kecil semua (server/hosting biasanya case-sensitive)
const fileLagu = ["mp3/sempurna.mp3", "mp3/1000x.mp3"];
// gambar latar tiap lagu. Isi img/song-bg-1000x.jpg kalau tampilan 1000x sudah jadi
const bgLagu = ["img/song-bg.jpg", "img/song-bg-1000x.png"];


const alasanLagu = [
    " Sempurnaaaa iyaaaa sempurnaaa, laguuu ini nge gambaarin kamuu bangeeet tauu, \n \n sempurna mungkin jadi satu kata yang bakal ulun pilih kalau suatu saat ada yang minta ulun jelasin kamu dalam satu kataa \n\n karnaa menurut ulunn sayaang emang sesempurnaa ituu, sayaaangg ituu baik, perasaaa, dan pekaa teradaap sekitar kamuu, kamuu ituu baik bangeet tauuu hatii kamu jugaa lembuut bangeet. \n\n terusss sayaaanag tuu jugaaaa manissss bangeeet tauuu. senyuman kamuuu ituuu... behhhh, manisss bangeeet. kadang ulun tuu sampai mikir, kok bisa sih ada orang yang senyumnya semanis ituuu? 🥰🥰 \n\n makanyaaa pas denger lagu iniii, langsung keingaat sayaaaangg. rasanya kayak setiap bagian dari lagu ini tuh emaaangg cocok banget buat ngegambarin betapaa indahnyaa sayaaangg di mata ulun dehhh \n\n sampaaai ulunn mikirr... \n hmmmm kayaaa nyaa lagu ini emaang diciptainnn buaat sayaaangg dehhh 🥰🥰  ♡",
    "Sayaaaangg first timee ulun tau lagu ini dari kamuu tau,sayaaang masih ingaat kann, moment kamu ngirimin clip nya di tiktok kalaa ituu, awal nya feel sad tauuu, kayaa akuu nga bisa treat kamu sesuaai yang kamu mauu yaa :(( \n \n baruu di lirik laluuu akuu memandang muu dan tersadaar betapaa beruntung nyaaa, adaaa cintaa seperti cintaaamuuu kepadaakuuuu, nahhh di sanaa ulun nge freezz, terdiaaam baru kayaa feel so deeply in loveeee, kayaaa di sayaaaaangg bangeett, sampaaai sekaraaang ulun masih ingaata feel pertamaa kali dengeer ituuu, lagu in masuk salaah satu spesiaaal song yang ulun dapaat dari kamuuu, \n \n mungkinn kamu ngerasaa lagu ini ya udah ajaa, kayaa lagu romance padaa umum nyaaa, tapi ketikaa sayaang kirim ituu ke ulunn trust mee inipunyaa kenangaan nya sendirii, i reallyy falling in lovee with youu, i really sad because youu, bukaan sedi dalam arti buruk yaa sayaangg, lebih ke araah udaaah jadi yang sayaang mau belum yaa? but at the and i hopee i can treat like you want\n \n gituuu dehh sayaaanggg why i choose this sound \n I loveeee youuuu sayaangkuu. ♡"
];

let statusLagu = [false, false];
let laguSedangDiputar = -1;

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
const songBg = document.getElementById("songBg");
const detailBackBtn = document.getElementById("detailBackBtn");
const vinylLabel = document.getElementById("vinylLabel");
const progressBar = document.getElementById("progressBar");
const progressFill = document.getElementById("progressFill");
const progressKnob = document.getElementById("progressKnob");
const timeCurrent = document.getElementById("timeCurrent");
const timeDuration = document.getElementById("timeDuration");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const heartMark = document.getElementById("heartMark");
const whyBtn = document.getElementById("whyBtn");
const whyCard = document.getElementById("whyCard");
const whyText = document.getElementById("whyText");
const whyClose = document.getElementById("whyClose");
const whyCloseBtn = document.getElementById("whyCloseBtn");
const audioPlayer = document.getElementById("audioPlayer");

// format 01:26 (sama seperti di gambar)
function formatTime(sec) {
    if (!isFinite(sec) || sec < 0) sec = 0;
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// ================= PROGRESS (durasi betulan gerak) =================
function setProgress(ratio) {
    ratio = Math.min(Math.max(ratio, 0), 1);
    const pct = ratio * 100 + "%";
    progressFill.style.width = pct;
    progressKnob.style.left = pct;
}

function updateProgress() {
    timeCurrent.textContent = formatTime(audioPlayer.currentTime);
    if (audioPlayer.duration) {
        setProgress(audioPlayer.currentTime / audioPlayer.duration);
    }
}

// ================= UI PLAY / PAUSE (ikut status audio yang asli) =================
function updatePlayingUI() {
    const playing = !audioPlayer.paused && !audioPlayer.ended;
    playBtn.classList.toggle("is-playing", playing);
    playBtn.setAttribute("aria-label", playing ? "pause" : "play");
    vinylLabel.classList.toggle("spinning", playing);
    heartMark.classList.toggle("beat", playing);
}

audioPlayer.addEventListener("play", updatePlayingUI);
audioPlayer.addEventListener("pause", updatePlayingUI);
audioPlayer.addEventListener("ended", () => {
    audioPlayer.currentTime = 0;
    updateProgress();
    updatePlayingUI();
});
audioPlayer.addEventListener("loadedmetadata", () => {
    timeDuration.textContent = formatTime(audioPlayer.duration);
});
audioPlayer.addEventListener("durationchange", () => {
    timeDuration.textContent = formatTime(audioPlayer.duration);
});
audioPlayer.addEventListener("timeupdate", updateProgress);

playBtn.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play().catch(() => {});
    } else {
        audioPlayer.pause();
    }
});

// ================= SEEK: klik / geser di progress bar =================
let seeking = false;

function seekFromEvent(e) {
    if (!audioPlayer.duration) return;
    const rect = progressBar.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    audioPlayer.currentTime = ratio * audioPlayer.duration;
    updateProgress();
}

progressBar.addEventListener("pointerdown", (e) => {
    seeking = true;
    progressBar.setPointerCapture(e.pointerId);
    seekFromEvent(e);
});
progressBar.addEventListener("pointermove", (e) => { if (seeking) seekFromEvent(e); });
progressBar.addEventListener("pointerup", () => { seeking = false; });
progressBar.addEventListener("pointercancel", () => { seeking = false; });

// ================= BUKA SONG DETAIL =================
function bukaLagu(index) {
    // lagu sebelumnya (kalau pindah lewat prev/next) dianggap sudah dibuka
    if (laguSedangDiputar >= 0) statusLagu[laguSedangDiputar] = true;

    laguSedangDiputar = index;

    if (bgLagu[index]) {
        songBg.src = bgLagu[index];
        vinylLabel.style.backgroundImage = `url("${bgLagu[index]}")`;
    }

    audioPlayer.pause();
    audioPlayer.src = fileLagu[index];
    audioPlayer.currentTime = 0;
    setProgress(0);
    timeCurrent.textContent = "00:00";
    timeDuration.textContent = "00:00";
    updatePlayingUI();

    whyCard.classList.add("hidden");
    musicHome.classList.add("hidden");
    songDetail.classList.remove("hidden");
}

hotspotSempurna.addEventListener("click", () => bukaLagu(0));
hotspot1000x.addEventListener("click", () => bukaLagu(1));

// pindah lagu; kalau tampilan lagu lain belum ada, lagu diulang dari awal
function pindahLagu(index) {
    if (bgLagu[index]) {
        bukaLagu(index);
    } else {
        audioPlayer.currentTime = 0;
        updateProgress();
    }
}
prevBtn.addEventListener("click", () => pindahLagu((laguSedangDiputar - 1 + jumlahLagu) % jumlahLagu));
nextBtn.addEventListener("click", () => pindahLagu((laguSedangDiputar + 1) % jumlahLagu));

// ================= WHY THIS SONG? =================
whyBtn.addEventListener("click", () => {
    whyText.textContent = alasanLagu[laguSedangDiputar];
    whyCard.classList.remove("hidden");
});
function tutupWhyCard() { whyCard.classList.add("hidden"); }
whyClose.addEventListener("click", tutupWhyCard);
whyCloseBtn.addEventListener("click", tutupWhyCard);

// ================= BACK DARI SONG DETAIL =================
detailBackBtn.addEventListener("click", () => {
    audioPlayer.pause();
    statusLagu[laguSedangDiputar] = true;

    songDetail.classList.add("hidden");
    musicHome.classList.remove("hidden");

    if (statusLagu[0]) foundMarkSempurna.classList.remove("hidden");
    if (statusLagu[1]) foundMark1000x.classList.remove("hidden");

    if (statusLagu.every(s => s === true)) {
        setTimeout(mulaiFinalMusicState, 700);
    }
});

// ================= FINAL MUSIC STATE =================
function fadeSwapText(el, text, holdMs, callback) {
    el.classList.remove("show");
    setTimeout(() => {
        el.textContent = text;
        el.classList.add("show");
        setTimeout(() => { if (callback) callback(); }, holdMs);
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
            fadeSwapText(finalText1, seq1[i], 600, () => {
                finalBtn.classList.remove("hidden");
                // beri 1 frame supaya transisi opacity jalan
                requestAnimationFrame(() => finalBtn.classList.add("show"));
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
            fadeSwapText(finalText1, seq2[j].text, seq2[j].hold, () => { j++; nextLine2(); });
        } else {
            backHubBtn.classList.remove("hidden");
            requestAnimationFrame(() => backHubBtn.classList.add("show"));
        }
    }
    nextLine2();
});