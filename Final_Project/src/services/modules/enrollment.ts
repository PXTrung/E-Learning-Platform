import axios from "axios"
import { AddToGroup, Enrollments, FetchListResponse, RemoveFromGroup } from "../interfaces"
import { ENDPOINTS } from "../../constants/endpoint"
import authUtils from "../../utils/auth"

export default {
    getEnrollments: async() => {
        const token = authUtils.getSessionToken();
        if(token){
            const response = await axios.get<FetchListResponse<Enrollments>>(ENDPOINTS.ENROLLMENT.ALL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        }        
    },
    addToGroup: async(data: AddToGroup) => {
        const token = authUtils.getSessionToken();
        if(token){
            const response = await axios.post(ENDPOINTS.ENROLLMENT.ADD_TO_GROUP, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        }
    },
    removeFromGroup: async(data: RemoveFromGroup) => {
        const token = authUtils.getSessionToken();
        if(token){
            const response = await axios.post(ENDPOINTS.ENROLLMENT.REMOVE_FROM_GROUP, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        }
    },
}