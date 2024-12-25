import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoint";
import { CourseGroupFormValue } from "../../pages/Profile/components/modal/CourseGroupSchema";
import authUtils from "../../utils/auth";
import { CourseGroup, CourseGroups, FetchListResponse, FetchResponse } from "../interfaces";

export default {
    getCourseGroups: async() => {
        const token = authUtils.getSessionToken();
        if(token){
            const response = await axios.get<FetchListResponse<CourseGroups>>(ENDPOINTS.COURSEGROUP.ALL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        }        
    },
    getCourseGroupById: async(id: string) => {
        const token = authUtils.getSessionToken();
        if(token){
            const response = await axios.get<FetchResponse<CourseGroup>>(`${ENDPOINTS.COURSEGROUP.ALL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        }
    },
    postCourseGroup: async (data: CourseGroupFormValue) => {
        const token = authUtils.getSessionToken();
        if(token){
            const response =  await axios.post(ENDPOINTS.COURSEGROUP.ALL, data, {
                headers: { Authorization: `Bearer ${token}` }
            })
            return response.data;
        }     
    },
    putCourseGroup: async (id: string, data: string) => {
        const token = authUtils.getSessionToken();
        if(token){
            const response =  await axios.put(`${ENDPOINTS.COURSEGROUP.ALL}/${id}`, {name: data}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            return response.data;
        }
    },
    deleteCourseGroup: async(id: string) => {
        const token = authUtils.getSessionToken();
        if(token){
            const response =  await axios.delete(`${ENDPOINTS.COURSEGROUP.ALL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            return response.data;
        }
    }
}