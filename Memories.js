localStorage.setItem("visited_memories", "true");


const judulMemory = [
    "where it all started",
    "the \u201cconsumption\u201d mission",
    "wawancaraa kalaaa ituuu",
    "finally, us \u2661"
];

const halamanMemory = [
    null,
    null,
    null,
    null
];

const isiMemory = [
`Sayaaaaaangg masi ingaaat pertemuaaan pertama kitaa kalaa ituuu? hmm mungkin bukan pertemuan pertama sii lebih ke arah interaksi pertama kitaa hihi

inii tuu lucuu tauu buaat di ingaat, moment nyaa terjadi tanpaa rencana sebetul nyaa, kebetulaan bangeet, kitaa lagi ngumpul buaat nge packing hadiaah kann nahh di sanaa kitaa adaa ngobroll tipiss tipiss, ingaat kadaa pas ulun duduk truss minggirin hadiaah yang di atas mejaa, modus banget ya hihi, truss kalau sayaaang ingaat jugaa disana kamuu ada nnaya packingaan nya baguss ngaa, truss di bulli mudii, baruu kamu nanyaa ke ulunn, truss ulun jawaab dehh baguss kokk, rapii wii good job truss syaaang jawaaab tuukan emang cuma ka rasyid yang baikk, jujuur di sana adaa bangeet malu sama tersanjung nyaa, gimanaa tidaa ratu nya bidadari bersabdaa sayaaang hihi

lucu yaa kalaau di ingaat, ternyata dari obrolan kecil itu bakal ada cerita sejauh ini. ♡`,

`or... my very obvious excuse to see you ♡

hmmm sayaaang ingaaat kejadiaaan di gorr kalaa ituu sayaaangg, hihiii salaah satu moment yang bikin kitaa dekaat sebetunyaa
kejadiaaan nya ngaa nyampe 10 menit tapi punyaa ceritaa nya sendirii \n\n 
moment nyaaa pass ulunn mau ngambill konsumsii, mompong pembinaa masuk semuaaa kann lagi prosesi jablurr nahh ulun keluaar dehh mau ambil konsumm 
ehh pas mau ngambil di bawaah mejaa kamuuu dataaaanggg, ketauaan dehh, ketahuaaan samaa si maniss ini sambil bawaa bayii \n\n 
kamuu lagi bawa bayii kann pass ituu nahh habis ituu ulunn datangin kann, awaal nyaa tu supayaa kamuu nda curigaa ajaa ngapaian ulun sendiriaan di depan mwhehehe, baru dehh 
kitaaa main sama bayii nyaaa,jujuuu mau ngobrol samaaa yang bawaa bayi nyaa sii, bukaan ke bayi nya mwhwhwhw \n\n 
truss habiss ituu pas dah asik berduaa ehh di samperin ustadzz, ustadz ibnuu tuu tibaa tibaa bilaang 'yang diiaatin bayi nyaa bukan yang bawaa nyaa'
hihiii gemeees deh kalaau di ingaat ingaat lagii bisaa bikin senyum senyum sendirii mwehehehe ♡`,

`satu lagi momeent yang bikin kitaaa dekaat, hmm ulun sii yang dekeetin mwhehehe 
kamuuu ingaaat momeent wawancaraaa kalaaa ituuu sayaaangg, yang kamuu di samping nurii trus ulun maam mie gelas di belakaaang kamuuu mwehhehehe\n\n
di moment ini ulun jadi penenang kamuu yaaa, supayaa kadaa meledaaak bangeet, jadi air di antaraa apii\n\n
truuss truss ingaaatt kann ingaat kann moment kitaa jailinn jakii, kitaa connect bangeet yaa di sanaa jadi kompor wkwkw 
kitaaa bikin nuri ngambeek ke jakii truss jaki nya panic bangeeet, padahaal yang ngomporin kitaa mwheheheh, astaghfirullahh sayaangg ishh ishh wkwkwkw \n\n 
truss habiss wawancaraa sambil nunggu breifing kitaa adaa forbaar kann lucuu dehh ituuu, ulun nyalaain tv baru kamu ngajaakin ftoo, jadi dehh kitaa ftoo mau nya si berduaa yaa
ulun sama kamuu ajaa, ehh ada satu yang ikutaaan nyempill wkwkwk yasudaaah lahhh, tapii dimanaaa ya fotoo ituu sekranaag?`,

`seteeelaah berbagaaai hal kitaa lewatii akhirnyaa sampaai lahh waktu dimanaaa ulun nyataain perasaaan ulunn ke sayaanag yaaa
27-03-2026 dann seteelaaah ituu kitaa keteemu lagi untuk terkahir kali nyaa ulun sebagaai siswaa, moment wisudaaa purnaa siswaaa \n\n

di snaaa terciptaaa lahh momeent kitaa keteeemuu setelaaah rencanaa panjaaang yaa, dari awal chataan ktaa dah ada rencanaa mau fotbar samaa kamuu pas wisudaaa
akhirnyaaa tewujud jugaaa yaaa, fotbaar kitaaa pass bangeet meraah smaa creaaam, kayaa temaa websitee kalii inii\n\n 

mungkin bagi oraaang lain fotbaar sama pasangaan adalaah hal yang biasaaa bangeet nga ada special special nya samaa sekalii, tapii tidaak bagii ulunnn, 
fotbaar samaa kamuu ituu memorablee bangeet, dan yaahh sampaai saat ini ftoo kitaa di figuraa ituu selalu terpajaang, bagii orang lain mungkin ini ftoo biasaaa
tapi bagii ulun yang nda pernaaah fotbaar samaa cwee kecuali kaka kaka ulunn yaaa, inii hal baruu, hal yang begituu speciaaal, dann yapp sorry to sayy bahasaa tubuh nga bohong kann
nervous nyaa ada bangeet, tiaraa sibaal sii di noticee gemeter tremornya keliataan bangeet yaaa, my first timeee, you takee it all\n\n 
akhir kataaa i loveeee youuu sayaaaangg, i loveee youu as alwaysss

yaaahh jadi kangeeen kamuu dehhh ♡`
];

const hotspots = document.querySelectorAll(".memory-hotspot");
const modalOverlay = document.getElementById("memoryModalOverlay");
const modalNumber = document.getElementById("modalNumber");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalClose = document.getElementById("modalClose");
const modalCloseBtn = document.getElementById("modalCloseBtn");

function bukaMemory(index) {
    if (halamanMemory[index]) {
        window.location.href = halamanMemory[index];
        return;
    }

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

modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) tutupMemory();
});

const openParam = parseInt(new URLSearchParams(window.location.search).get("open"), 10);
if (openParam >= 1 && openParam <= judulMemory.length) {
    bukaMemory(openParam - 1);
}