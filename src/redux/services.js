import { ApiService } from "../services/api.service";

export const getEvent = (date) => {
    return ApiService.get('/events', { params: { date } });
}

export const getLeagueRound = (league) => {
    return ApiService.get('/events/league/rounds', { params: { league: league } })
}

export const getLeagueEvents = (date, league) => {
    return ApiService.get('events/league', { params: { date, league } })
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

export const phoneVerify = (data) => {
    return ApiService.post('/auth/phone-verify', data);
}

export const getNews = (page) => {
    return ApiService.get('/news', { params: { page } });
}
