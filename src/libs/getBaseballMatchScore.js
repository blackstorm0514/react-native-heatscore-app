export const getBaseballMatchScore = (timeline, scores) => {
    const matchResult = {
        home_score: '',
        away_score: '',
    }
    if (!scores) return matchResult;
    try {
        switch (timeline) {
            case '5th_innings':
                for (const key of ["1", "2", "3", "4", "5"]) {
                    matchResult.home_score += scores[key] ? parseInt(scores[key].home) : 0;
                    matchResult.away_score += scores[key] ? parseInt(scores[key].away) : 0;
                }
                break;
            default:
                matchResult.home_score = scores["run"] ? parseInt(scores["run"].home) : 0;
                matchResult.away_score = scores["run"] ? parseInt(scores["run"].away) : 0;
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