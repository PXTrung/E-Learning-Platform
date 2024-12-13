import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoint";
import { Category, FetchListResponse, FetchResponse} from "../interfaces";
import { FormValue } from "../../pages/admin/components/modal/category/CategorySchema";
import { BaseQueryParams, CourseQueryParams, queryBuilder } from "../../utils/queryBuilder";


export default {
    getCategories: async (params: BaseQueryParams) => {
        const queryString = queryBuilder(params);
        return await axios.get<FetchListResponse<Category>>(`${ENDPOINTS.CATEGORY.ALL}?${queryString}`)
                    .then(res => res.data);
    },
    getCategoryById: (id: string) => {
        return axios.get<FetchResponse<Category>>(`${ENDPOINTS.CATEGORY.ALL}/${id}`)
                    .then(res => res.data);
    },
    postCategory: async (data: FormValue) => {
        return await axios.post(ENDPOINTS.CATEGORY.ALL, data)
                    .then(res => res.data);
    },
    putCategory: async (id: string, data: FormValue) => {
        return await axios.put(`${ENDPOINTS.CATEGORY.ALL}/${id}`, data)
                    .then(res => res.data);
    }
}