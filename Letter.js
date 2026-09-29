const requiredKeys = ["visited_flower", "visited_cake", "visited_music", "visited_memories"];
const allVisited = requiredKeys.every(key => localStorage.getItem(key) === "true");

const lockedScreen = document.getElementById("lockedScreen");
const letterWrap = document.getElementById("letterWrap");

if (!allVisited) {
    lockedScreen.classList.remove("hidden");
} else {
    letterWrap.classList.remove("hidden");
    initLetter();
}

function initLetter() {

    const pages = [
        
        `<p class="page-tag">01 — the beginning</p>
         <p class="opener">Aloooooow sayaaaang nyaaa akuhhhh 🥹💞</p>
         <p>wiii, setelaaaah hampir tiiiaaappp hari ulun ucapinnn "pagi" ke sayaaaang, akhirnyaaa udaah tanggal 30 ajaaaa 😭</p>
         <p>happy birthdayyy sayaaaaangkuuu, selamaaatt ulang tahuuunnn 🥳💞<br>resmiiii yaaaa jadi 18 tahunnn, wii wiiiiii 😭🫵🏻</p>
         <p>tapiii kali iniii ulun nga mauuu banyaaak ngomongin doa atau wishes buat sayaaaang, karenaaa nanti ada tempatnyaaa sendiriii heheee.</p>
         <p>di sini ulun cuma mauuu bilang makasiiiihhh.</p>`,

        `<p class="page-tag">02 — 188 days</p>
         <div class="days-block">
             <span class="days-number">188</span>
             <span class="days-label">D A Y S</span>
         </div>
         <p>makasiiiihhh yaaa sayaaaanggg, buat 188 hariii yang udaah kitaaa lewatii barenggg. 188 hariii mungkin cuma angkaaa, tapiii buat ulun, di dalam angkaaa itu ada banyaaaakkk ceritaaa, banyaaaakkk ketawaaa, banyaaaakkk obrolaaann, banyaaaakkk momen kecil yang mungkin keliatannya sederhanaaa, tapiii tetap ulun ingattt.</p>
         <p>makasiiiihhh karenaaa pernah hadirrr di hari-hari ulunn, pernah jadiii orang yang ulun cariinn, orang yang ulun tungguu, orang yang bikin hari biasaaa terasa jaaauuuhhh lebih seruuu.</p>
         <p>makasiiiihhh buat semuaaa hal kecil yang mungkin sayaaaang sendiri nga sadarrr sudah berarti banyaaakkk buat ulun.</p>`,

        `<p class="page-tag">03 — thank you & sorry</p>
         <p>dan kalau selama 188 hariii ini ada hal dari ulun yang pernah bikin sayaaaang capeee, kecewaa, sediiihhh, atau ngerasa nga cukup disayanggg, ulun juga minta maaaaf yaaa sayaaaanggg 🫂</p>
         <p>ulun nga mauuu bilang 188 hariii ini selalu sempurnaaa, karenaaa kitaaa juga sama-sama manusiaaa, pasti ada hari yang enakkk dan ada hari yang nga enakkk. tapiii justru dari semuaaa ituuu, ulun bersyukurr pernah menjalaniii bagian perjalanan iniii sama sayaaaang.</p>`,

        `<p class="page-tag">04 — the last words</p>
         <p>jadiii, kalau suatu hari nanti sayaaaang buka lagi hidden note iniii, ulun harap <p style="text-align: center;">sayaaaang bisa ingattt...</p></p>
         <p class="big-line">pernah ada seseorang yang dengan caranya sendiri, sayanggg banget sama sayaaaanggg. 🥹💞</p>
         <p><p style = "text-align : center;">makasiiiihhh yaaa sayaaaangkuuu, untuk 188 hariii iniii.</p></p>
         <p class="signoff">happy 18th,<br>my favorite person. 🫶</p>
         <p class="handwritten">lopyuuuuuuu banyaaaaakkk banyaaaaakkkk,<br>lebih banyaaaakkk dariii yang bisaaa ulun tulisss di siniiii.</p>
         <p class="handwritten">luvvvv luvvvvvv sayaaaangkuuuuu 💞💕</p>
         <div class="ending-block">
             <p class="ending-divider">────────────────────</p>
             <p class="ending-text">that's all...<br>for now. ♡</p>
             <p class="ending-divider">────────────────────</p>
             <p class="keep-safe">keep this letter somewhere safe.</p>
         </div>`
    ];

    let currentPage = 0;

    const stageEnvelope = document.getElementById("stageEnvelope");
    const stageDate = document.getElementById("stageDate");
    const stageLetter = document.getElementById("stageLetter");
    const stageClosed = document.getElementById("stageClosed");

    const openEnvelopeBtn = document.getElementById("openEnvelopeBtn");
    const envelopeImg = document.getElementById("envelopeImg");
    const dateRevealBtn = document.getElementById("dateRevealBtn");
    const continueBtn = document.getElementById("continueBtn");
    const scrollHint = document.getElementById("scrollHint");
    const letterPageContent = document.getElementById("letterPageContent");
    const letterPaper = document.querySelector(".letter-paper");

    function showStage(stage) {
        [stageEnvelope, stageDate, stageLetter, stageClosed].forEach(s => s.classList.add("hidden"));
        stage.classList.remove("hidden");
    }

    function renderPage(index) {
        letterPageContent.innerHTML = pages[index];
        letterPaper.scrollTop = 0;

        if (index === pages.length - 1) {
            continueBtn.textContent = "♡ close letter";
            scrollHint.classList.add("hidden");
        } else {
            continueBtn.textContent = "continue ♡";
            scrollHint.classList.remove("hidden");
        }
    }

    openEnvelopeBtn.addEventListener("click", () => {
        envelopeImg.classList.add("opening");
        setTimeout(() => {
            showStage(stageDate);
        }, 400);
    });

    dateRevealBtn.addEventListener("click", () => {
        currentPage = 0;
        renderPage(currentPage);
        showStage(stageLetter);
    });

    continueBtn.addEventListener("click", () => {
        if (currentPage < pages.length - 1) {
            currentPage++;
            renderPage(currentPage);
        } else {
            showStage(stageClosed);
        }
    });
}