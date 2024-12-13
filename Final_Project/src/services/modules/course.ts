import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoint";
import { Course, FetchListResponse, FetchResponse } from "../interfaces";
import { CourseQueryParams, queryBuilder } from "../../utils/queryBuilder";

export default {
    getCourses: async(params: CourseQueryParams) => {
        const queryString = queryBuilder(params);
        return await axios.get<FetchListResponse<Course>>(`${ENDPOINTS.COURSE.ALL}?${queryString}`)
                    .then(res => res.data);
    },
    getCourseById: async(id: string) => {
        return await axios.get<FetchResponse<Course>>(`${ENDPOINTS.COURSE.ALL}/${id}`)
                    .then(res => res.data);
    },
    postCourse: async(data: FormData) => {
        return await axios.post(ENDPOINTS.COURSE.ALL, data)
                    .then(res => res.data);
    },
    putCourse: async (id: string, data: FormData) => {
        return await axios.put(`${ENDPOINTS.COURSE.ALL}/${id}`, data)
                    .then(res => res.data);
    }

}