import axios from "axios";
import { FetchListResponse, FetchResponse, Sessions } from "../interfaces";
import { ENDPOINTS } from "../../constants/endpoint";
import { SessionFormValue } from "../../pages/lecturer/components/modal/session/SessionSchema";

export default {
    getSessions: async (id: string) => {
        return await axios.get<FetchListResponse<Sessions>>(`${ENDPOINTS.SESSION.ALL}/${id}`)
                    .then(res => res.data);
    },
    getSession: async (id: string) => {
        return await axios.get<FetchResponse<Sessions>>(`${ENDPOINTS.SESSION.BY_ID}/${id}`)
                    .then(res => res.data);
    },
    postSession: async (id: string, data: SessionFormValue) => {
        return await axios.post(`${ENDPOINTS.SESSION.ALL}/${id}`, data)
                    .then(res => res.data);
    },
    putSession: async (id: string, data: SessionFormValue) => {
        return await axios.put(`${ENDPOINTS.SESSION.ALL}/${id}`, data)
                    .then(res => res.data);
    },
    deleteSession: async (id: string) => {
        return await axios.delete(`${ENDPOINTS.SESSION.ALL}/${id}`)
                    .then(res => res.data);
    }
}