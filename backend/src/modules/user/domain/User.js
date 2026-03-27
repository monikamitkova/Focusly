const { calculateLevelFromXp } = require("./services/levelCalculator");
const { isSameDay, getDayDifference } = require("./services/dateUtils");

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

    calculateLevelFromXp() {
        return calculateLevelFromXp(this.xp);
    }

    updateStreak(currentDate = new Date()) {
        const today = new Date(currentDate);

        if (!this.lastActiveDate) {
            this.streak = 1;
            this.lastActiveDate = today;
            return;
        }

        const lastDate = new Date(this.lastActiveDate);

        if (isSameDay(lastDate, today)) {
            this.lastActiveDate = today;
            return;
        }

        const dayDifference = getDayDifference(lastDate, today);

        if (dayDifference === 1) {
            this.streak += 1;
        } else if (dayDifference > 1) {
            this.streak = 1;
        }

        this.lastActiveDate = today;
    }

    addXp(amount) {
        this.xp += amount;
        this.level = this.calculateLevelFromXp();
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
