import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoint";
import { FetchListResponse, FetchResponse, Lessons } from "../interfaces";

export default {
    getLessons: (id: string) => {
        return axios.get<FetchListResponse<Lessons>>(`${ENDPOINTS.LESSON.ALL}/${id}`)
                    .then(res => res.data);
    },
    getLesson: async(id: string) => {
        return await axios.get<FetchResponse<Lessons>>(`${ENDPOINTS.LESSON.BY_ID}/${id}`)
        .then(res => res.data);
    },
    postLesson: async (id: string, data: FormData) => {
        return await axios.post(`${ENDPOINTS.LESSON.ALL}/${id}`, data)
                    .then(res => res.data);
    },
    putLesson: async(id: string, data: FormData) => {
        return await axios.put(`${ENDPOINTS.LESSON.ALL}/${id}`, data)
                    .then(res => res.data);
    },
    deleteLesson: async(id: string) => {
        return await axios.delete(`${ENDPOINTS.LESSON.ALL}/${id}`)
                    .then(res => res.data);
    }
}