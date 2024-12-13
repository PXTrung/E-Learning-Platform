import axios from "axios";
import { CartInformation } from "../interfaces";
import { ENDPOINTS } from "../../constants/endpoint";
import authUtils from "../../utils/auth"

export default {
    getCarts: async () => {
        const token = authUtils.getSessionToken();
        if(token){
            const response = await axios.get<CartInformation>(ENDPOINTS.CART.ALL, {
                headers: { Authorization: `Bearer ${token}` }
            })
            return response.data;
        }  
    },
    removeFromCart: async (id: string) => {
        const token = authUtils.getSessionToken();
        if(token){
            const response = await axios.delete(ENDPOINTS.CART.ALL,  {
                headers: { Authorization: `Bearer ${token}` },
                data: {courseId: id},
            })
            return response.data;
        } 
    },
    addToCart: async (id: string) => {
        const token = authUtils.getSessionToken();
        if(token){
            const response = await axios.post(ENDPOINTS.CART.ALL, {courseId: id}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            return response.data;
        } 
    }
}