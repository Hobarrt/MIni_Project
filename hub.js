
const requiredKeys = ["visited_flower", "visited_cake", "visited_music", "visited_memories"];

function checkBonusUnlock() {
    const allVisited = requiredKeys.every(key => localStorage.getItem(key) === "true");
    const bonusSection = document.getElementById("bonusSection");

    if (allVisited && bonusSection) {
        bonusSection.classList.add("unlocked");
    }
}

checkBonusUnlock();
