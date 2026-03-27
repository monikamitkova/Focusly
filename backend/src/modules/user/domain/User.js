class User {
    constructor(
        id,
        name,
        xp = 0,
        level = 0,
        streak = 0,
        lastActiveDate,
        totalMinutes = 0,
    ) {
        if (!name) {
            console.error("Missing name");
            throw new Error(
                "Name is required",
            );
        }


        this.id = id;
        this.name = name;
        this.xp = xp;
        this.level = this.calculateLevelFromXp();
        this.streak = streak;
        this.lastActiveDate = lastActiveDate;
        this.totalMinutes = totalMinutes;
    }

    xpNeeded(level) {
        return 100 + (level - 1) * 50;
    }

    calculateLevelFromXp() {
        let currentLevel = 1;
        let remainingXp = this.xp;

        while (remainingXp >= this.xpNeeded(currentLevel)) {
            remainingXp -= this.xpNeeded(currentLevel);
            currentLevel++;
        }

        return currentLevel;
    }

    addXp(amount) {
        this.xp += amount;
        this.level = this.calculateLevelFromXp();
    }

    incrementStreak() {
        this.streak += 1;
    }

    addTotalMinutes(minutes) {
        this.totalMinutes += minutes;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getXp() {
        return this.xp;
    }

    getLevel() {
        return this.level;
    }

    getStreak() {
        return this.streak;
    }

    getLastActiveDate() {
        return this.lastActiveDate;
    }

    getTotalMinutes() {
        return this.totalMinutes;
    }

}

module.exports = User;
