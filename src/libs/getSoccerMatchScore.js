export const getSoccerMatchScore = (timeline, scores) => {
    const matchResult = {
        home_score: '',
        away_score: '',
    }
    if (!scores) return matchResult
    try {
        switch (timeline) {
            case '1st_half':
                matchResult.home_score = scores["1"] ? parseInt(scores["1"].home) : '';
                matchResult.away_score = scores["1"] ? parseInt(scores["1"].away) : '';
                break;
            case '2nd_half':
                matchResult.home_score = scores["1"] && scores["2"] ? parseInt(scores["2"].home) - parseInt(scores["1"].home) : '';
                matchResult.away_score = scores["1"] && scores["2"] ? parseInt(scores["2"].away) - parseInt(scores["1"].away) : '';
                break;
            default:
                matchResult.home_score = scores["2"] ? parseInt(scores["2"].home) : '';
                matchResult.away_score = scores["2"] ? parseInt(scores["2"].away) : '';
        }
        return matchResult;
    } catch (error) {
        return {
            home_score: '',
            away_score: '',
        };
    }
}