const { isSameDay } = require("./dateUtils");

function calculateTodayFocusSessions(lastFocusSessionDate, todayFocusSessions, currentDate = new Date()) {
    const today = new Date(currentDate);

    if (!lastFocusSessionDate) {
        return {
            todayFocusSessions: 1,
            lastFocusSessionDate: today,
        };
    }

    const lastDate = new Date(lastFocusSessionDate);

    if (isSameDay(lastDate, today)) {
        return {
            todayFocusSessions: todayFocusSessions + 1,
            lastFocusSessionDate: today,
        };
    }

    return {
        todayFocusSessions: 1,
        lastFocusSessionDate: today,
    };
}

module.exports = {
    calculateTodayFocusSessions,
};