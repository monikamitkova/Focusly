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

function getXpIntoCurrentLevel(xp) {
    let currentLevel = 1;
    let remainingXp = xp;

    while (remainingXp >= xpNeeded(currentLevel)) {
        remainingXp -= xpNeeded(currentLevel);
        currentLevel++;
    }

    return remainingXp;
}

function getCurrentLevelXpRequired(xp) {
    const level = calculateLevelFromXp(xp);
    return xpNeeded(level);
}

function getLevelProgressPercent(xp) {
    const xpIntoCurrentLevel = getXpIntoCurrentLevel(xp);
    const currentLevelXpRequired = getCurrentLevelXpRequired(xp);

    if (currentLevelXpRequired === 0) {
        return 0;
    }

    return Math.min(100, Math.floor((xpIntoCurrentLevel / currentLevelXpRequired) * 100));
}

module.exports = {
    xpNeeded,
    calculateLevelFromXp,
    getXpIntoCurrentLevel,
    getCurrentLevelXpRequired,
    getLevelProgressPercent,
};
