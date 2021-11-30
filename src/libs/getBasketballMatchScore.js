export const getBasketballMatchScore = (timeline, scores) => {
    const matchResult = {
        home_score: '',
        away_score: '',
    }
    if (!scores) return matchResult;
    try {
        switch (timeline) {
            case '1st_half':
                if (scores["3"]) {
                    matchResult.home_score = parseInt(scores["3"].home);
                    matchResult.away_score = parseInt(scores["3"].away);
                } else {
                    matchResult.home_score = scores["1"] ? parseInt(scores["1"].home) : '';
                    matchResult.away_score = scores["1"] ? parseInt(scores["1"].away) : '';
                }
                break;
            case '2nd_half':
                if (scores["3"]) {
                    matchResult.home_score = scores["7"] ? parseInt(scores["7"].home) - parseInt(scores["3"].home) : '';
                    matchResult.away_score = scores["7"] ? parseInt(scores["7"].away) - parseInt(scores["3"].away) : '';
                } else {
                    matchResult.home_score = scores["2"] ? parseInt(scores["2"].home) : '';
                    matchResult.away_score = scores["2"] ? parseInt(scores["2"].away) : '';
                }
                break;
            case '1st_quarter':
                matchResult.home_score = scores["1"] ? parseInt(scores["1"].home) : '';
                matchResult.away_score = scores["1"] ? parseInt(scores["1"].away) : '';
                break;
            case '2nd_quarter':
                matchResult.home_score = scores["2"] ? parseInt(scores["2"].home) : '';
                matchResult.away_score = scores["2"] ? parseInt(scores["2"].away) : '';
                break;
            case '3rd_quarter':
                matchResult.home_score = scores["4"] ? parseInt(scores["4"].home) : '';
                matchResult.away_score = scores["4"] ? parseInt(scores["4"].away) : '';
                break;
            case '4th_quarter':
                matchResult.home_score = scores["5"] ? parseInt(scores["5"].home) : '';
                matchResult.away_score = scores["5"] ? parseInt(scores["5"].away) : '';
                break;
            default:
                matchResult.home_score = scores["7"] ? parseInt(scores["7"].home) : '';
                matchResult.away_score = scores["7"] ? parseInt(scores["7"].away) : '';
                break;
        }
        return matchResult;
    } catch (error) {
        return {
            home_score: '',
            away_score: '',
        };
    }
}
