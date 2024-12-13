import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoint";
import authUtils from "../../utils/auth";
import { EmailOTPData, FetchListResponse, FetchResponse, LoginData, OTPData, ProfileData, RegisterData, ResetPasswordData, Users } from "../interfaces";
import { BaseQueryParams, queryBuilder, userQueryParams } from "../../utils/queryBuilder";

export default {
    login: async (data: LoginData) => {
        return await axios.post(ENDPOINTS.LOGIN, data)
            .then(res => res.data);
    },
    register: async(data: RegisterData) => {
        return await axios.post(ENDPOINTS.REGISTER, data)
            .then(res => res.data);
    },
    getProfile: async() => {
        const token = authUtils.getSessionToken();
        if(token) {
            const response = await axios.get<ProfileData>(ENDPOINTS.PROFILE.CURRENT, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return response.data;
        }
    },
    editProfile: async(data: FormData) => {
        const token = authUtils.getSessionToken();
        if(token) {
            const response = await axios.put(ENDPOINTS.PROFILE.EDIT, data, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return response.data;
        }
    },
    sendEmailOTP: async(data: EmailOTPData) => {
        const token = authUtils.getSessionToken();
        if(token) {
            const response = await axios.post(ENDPOINTS.PROFILE.SENDEMAIL, data, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return response.data;
        }
    },
    verifyOTP: async(data: OTPData) => {
        const token = authUtils.getSessionToken();
        if(token) {
            const response = await axios.post(ENDPOINTS.PROFILE.CONFIRMOTP, data, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return response.data;
        }
    },
    resetPass: async(data: ResetPasswordData) => {
        const token = authUtils.getSessionToken();
        if(token) {
            const response = await axios.post(ENDPOINTS.PROFILE.RESETPASS, data, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return response.data;
        }
    },
    getAllUsers: async(params: userQueryParams) => {
        const token = authUtils.getSessionToken();
        const queryString = queryBuilder(params);
        if(token) {
            const response = await axios.get<FetchListResponse<Users>>(`${ENDPOINTS.PROFILE.ALL}?${queryString}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return response.data;
        }
    }
}