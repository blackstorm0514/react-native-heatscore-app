import { ApiService } from "../services/api.service";

export const getEvent = (date, sport) => {
    return ApiService.get('/events', { params: { date, sport } });
}

export const getLeagueRound = (league) => {
    return ApiService.get('/events/league/rounds', { params: { league: league } })
}

export const getLeagueEvents = (date, league) => {
    return ApiService.get('/events/league', { params: { date, league } })
}

export const getLeagueList = () => {
    return ApiService.get('/events/leagues');
}

export const getProfile = () => {
    return ApiService.get('/auth/profile');
}

export const signIn = (email, password) => {
    return ApiService.post('/auth/signin', { email, password });
}

export const signInGoogle = (idToken) => {
    return ApiService.post('/auth/signin-google', { idToken });
}

export const signUp = (data) => {
    return ApiService.post('/auth/signup', data);
}

export const changePassword = (data) => {
    return ApiService.post('/auth/changepassword', data);
}

export const phoneVerify = (data) => {
    return ApiService.post('/auth/phone-verify', data);
}

export const getNews = (page) => {
    return ApiService.get('/news', { params: { page } });
}

export const searchTeams = (search) => {
    return ApiService.get('/favorites/search', { params: { search } });
}

export const getFavorites = () => {
    return ApiService.get('/favorites/all');
}

export const addFavorite = (sport, team) => {
    return ApiService.post('/favorites/add', { sport, team });
}

export const removeFavorite = (sport, team) => {
    return ApiService.post('/favorites/remove', { sport, team });
}

export const searchEventsForScoreCard = (search) => {
    return ApiService.get('/scorecards/events', { params: { search } });
}

export const addScoreCard = (data) => {
    return ApiService.post('/scorecards', data);
}

export const getScoreCards = (date) => {
    return ApiService.get('/scorecards', { params: { date } });
}

export const deleteScoreCard = (card_id) => {
    return ApiService.delete(`/scorecards/${card_id}`);
}

export const getEventDetail = (event_id) => {
    return ApiService.get(`/events/${event_id}/detail`);
}