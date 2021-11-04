import { ApiService } from "../services/api.service";

export const getEvent = (date) => {
    return ApiService.get('/events', { params: { date } });
}