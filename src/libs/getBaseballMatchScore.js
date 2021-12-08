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
            case '1st_inning':
                matchResult.home_score += scores["1"] ? parseInt(scores["1"].home) : 0;
                matchResult.away_score += scores["1"] ? parseInt(scores["1"].away) : 0;
                break;
            case '2nd_inning':
                matchResult.home_score += scores["2"] ? parseInt(scores["2"].home) : 0;
                matchResult.away_score += scores["2"] ? parseInt(scores["2"].away) : 0;
                break;
            case '3rd_inning':
                matchResult.home_score += scores["3"] ? parseInt(scores["3"].home) : 0;
                matchResult.away_score += scores["3"] ? parseInt(scores["3"].away) : 0;
                break;
            case '4th_inning':
                matchResult.home_score += scores["4"] ? parseInt(scores["4"].home) : 0;
                matchResult.away_score += scores["4"] ? parseInt(scores["4"].away) : 0;
                break;
            case '5th_inning':
                matchResult.home_score += scores["5"] ? parseInt(scores["5"].home) : 0;
                matchResult.away_score += scores["5"] ? parseInt(scores["5"].away) : 0;
                break;
            case '6th_inning':
                matchResult.home_score += scores["6"] ? parseInt(scores["6"].home) : 0;
                matchResult.away_score += scores["6"] ? parseInt(scores["6"].away) : 0;
                break;
            case '7th_inning':
                matchResult.home_score += scores["7"] ? parseInt(scores["7"].home) : 0;
                matchResult.away_score += scores["7"] ? parseInt(scores["7"].away) : 0;
                break;
            case '8th_inning':
                matchResult.home_score += scores["8"] ? parseInt(scores["8"].home) : 0;
                matchResult.away_score += scores["8"] ? parseInt(scores["8"].away) : 0;
                break;
            case '9th_inning':
                matchResult.home_score += scores["9"] ? parseInt(scores["9"].home) : 0;
                matchResult.away_score += scores["9"] ? parseInt(scores["9"].away) : 0;
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