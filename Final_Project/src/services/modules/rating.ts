import axios from "axios";
import { CreateRatingData, EditRatingData, FetchListResponse, Ratings } from "../interfaces";
import { ENDPOINTS } from "../../constants/endpoint";
import authUtils from "../../utils/auth";

export default {
    GetRatingByCourse: async(id: string) => {
        const response = await axios.get<FetchListResponse<Ratings>>(`${ENDPOINTS.RATING.ALL}/${id}`);
        return response.data;      
    },
    createRating: async(data: CreateRatingData) => {
        const token = authUtils.getSessionToken();
        if(token){
            const response = await axios.post(ENDPOINTS.RATING.CREATE, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        }
    },
    editRating: async(data: EditRatingData) => {
        const token = authUtils.getSessionToken();
        if(token){
            const response = await axios.put(ENDPOINTS.RATING.EDIT, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        }
    }
}