function isSameDay(dateA, dateB) {
    return (
        dateA.getFullYear() === dateB.getFullYear() &&
        dateA.getMonth() === dateB.getMonth() &&
        dateA.getDate() === dateB.getDate()
    );
}

function getDayDifference(dateA, dateB) {
    const first = new Date(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
    const second = new Date(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    return Math.floor((second - first) / millisecondsPerDay);
}

module.exports = {
    isSameDay,
    getDayDifference,
};
