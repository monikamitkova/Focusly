const {
    calculateLevelFromXp,
    getXpIntoCurrentLevel,
    getCurrentLevelXpRequired,
    getLevelProgressPercent,
} = require("./services/levelCalculator");
const { isSameDay, getDayDifference } = require("./services/dateUtils");
const { calculateTodayFocusSessions } = require("./services/todayFocusSession");
const { formatTotalTime } = require("./services/totalMinutes");

class User {
    constructor(
        id,
        name,
        xp = 0,
        level = 0,
        streak = 0,
        lastActiveDate,
        totalMinutes = 0,
        todayFocusSessions = 0,
        lastFocusSessionDate = null,
        recentSessions = [],
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
        this.todayFocusSessions = todayFocusSessions;
        this.lastFocusSessionDate = lastFocusSessionDate;
        this.recentSessions = recentSessions;
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

    updateTodayFocusSessions(currentDate = new Date()) {
        const result = calculateTodayFocusSessions(
            this.lastFocusSessionDate,
            this.todayFocusSessions,
            currentDate
        );

        this.todayFocusSessions = result.todayFocusSessions;
        this.lastFocusSessionDate = result.lastFocusSessionDate;
    }

    addXp(amount) {
        this.xp += amount;
        this.level = this.calculateLevelFromXp();
    }

    addTotalMinutes(minutes) {
        this.totalMinutes += minutes;
    }

    addRecentSession(session) {
        this.recentSessions = [session, ...this.recentSessions].slice(0, 10);
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

    getTodayFocusSessions() {
        return this.todayFocusSessions;
    }

    getLastFocusSessionDate() {
        return this.lastFocusSessionDate;
    }

    getRecentSessions() {
        return this.recentSessions;
    }

    getXpIntoCurrentLevel() {
        return getXpIntoCurrentLevel(this.xp);
    }

    getCurrentLevelXpRequired() {
        return getCurrentLevelXpRequired(this.xp);
    }

    getLevelProgressPercent() {
        return getLevelProgressPercent(this.xp);
    }

    getTotalHours() {
        return formatTotalTime(this.totalMinutes);
    }

}

module.exports = User;
