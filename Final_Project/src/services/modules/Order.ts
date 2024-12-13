import axios from "axios";
import authUtils from "../../utils/auth"
import { FetchListResponse, Orders } from "../interfaces";
import { ENDPOINTS } from "../../constants/endpoint";

export default {
    getAll: async () =>{
        const token = authUtils.getSessionToken();
        if(token){
            const response = await axios.get<FetchListResponse<Orders>>(ENDPOINTS.ORDER.ALL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        }        
    }}