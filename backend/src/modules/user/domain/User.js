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
        this.level = level;
        this.streak = streak;
        this.lastActiveDate = lastActiveDate;
        this.totalMinutes = totalMinutes;
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
