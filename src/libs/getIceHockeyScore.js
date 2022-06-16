export const getIceHockeyMatchScore = (timeline, scores, ss) => {
    const matchResult = {
        home_score: '',
        away_score: '',
    }
    if (!scores) return matchResult;
    try {
        switch (timeline) {
            case '1st_peorid':
                matchResult.home_score = scores["1"] ? parseInt(scores["1"].home) : '';
                matchResult.away_score = scores["1"] ? parseInt(scores["1"].away) : '';
                break;
            case '2nd_peorid':
                matchResult.home_score = scores["2"] ? parseInt(scores["2"].home) : '';
                matchResult.away_score = scores["2"] ? parseInt(scores["2"].away) : '';
                break;
            case '3rd_peorid':
                matchResult.home_score = scores["3"] ? parseInt(scores["3"].home) : '';
                matchResult.away_score = scores["3"] ? parseInt(scores["3"].away) : '';
                break;
            default:
                if (!ss) {
                    matchResult.home_score = scores["5"] ? parseInt(scores["5"].home) : '';
                    matchResult.away_score = scores["5"] ? parseInt(scores["5"].away) : '';
                } else {
                    matchResult.home_score = ss.split('-')[0];
                    matchResult.away_score = ss.split('-')[1];
                }
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
