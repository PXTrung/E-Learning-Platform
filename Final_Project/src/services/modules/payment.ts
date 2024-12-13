import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoint";
import authUtils from "../../utils/auth";
import { ClientSceret } from "../interfaces";

export default {
    createPayment: async () => {
        const token = authUtils.getSessionToken();
        if(token){
            const response =  await axios.post(`${ENDPOINTS.PAYMENT.CREATE_PAYMENT_INTENT}`,{}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            return response.data as ClientSceret;
        }    
    },
    confirmPayment: async () => {
        const token = authUtils.getSessionToken();
        if(token){
            const response =  await axios.post(`${ENDPOINTS.PAYMENT.CONFIRM_ORDER}`,{}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            return response.data;
        }  
    }
}