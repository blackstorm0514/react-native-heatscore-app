export function capitalizeString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function truncateString(text) {
    if (text.length > 10) {
        text = text.substring(0, 10) + "...";
    }
    return text;
}

export function getTimeLineName(timeline) {
    const timelines = {
        "game": "Game",
        "5th_innings": "5th Innings",
        "1st_half": "1st Half",
        "2nd_half": "2nd Half",
        "1st_quarter": "1st Quarter",
        "2nd_quarter": "2nd Quarter",
        "3rd_quarter": "3rd Quarter",
        "4th_quarter": "4th Quarter",
        "1st_peorid": "1st Peorid",
        "2nd_peorid": "2nd Peorid",
        "3rd_peorid": "3rd Peorid",
    }
    return timelines[timeline];
}