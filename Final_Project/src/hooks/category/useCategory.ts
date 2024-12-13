import { useQuery } from "@tanstack/react-query"
import api from "../../services/api";


const useCategory = (id: string) => useQuery({
    queryKey: ['category', id],
    queryFn: () => {
        const items = api.category.getCategoryById(id);
        return items;
    },
     // The query will not execute until the id exists
     enabled: !!id
})

export default useCategory