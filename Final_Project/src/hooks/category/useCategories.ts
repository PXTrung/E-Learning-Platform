import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import api from "../../services/api"
import { Category, FetchListResponse } from "../../services/interfaces";
import useStore from "../../store";

const useCategories = () => {
    const { categoryQuery } = useStore();


    return useQuery({
        queryKey: ['categories', categoryQuery],
        queryFn: async () => {
            const items = await api.category.getCategories(categoryQuery);
            return items;
        },
        staleTime: 1000 * 60 * 5,  
    }); 
}

export default useCategories;