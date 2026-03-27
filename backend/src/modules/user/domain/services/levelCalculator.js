function xpNeeded(level) {
    return 100 + (level - 1) * 50;
}

function calculateLevelFromXp(xp) {
    let currentLevel = 1;
    let remainingXp = xp;

    while (remainingXp >= xpNeeded(currentLevel)) {
        remainingXp -= xpNeeded(currentLevel);
        currentLevel++;
    }

    return currentLevel;
}

module.exports = {
    xpNeeded,
    calculateLevelFromXp,
};
