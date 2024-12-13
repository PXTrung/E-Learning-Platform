import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../services/api";
import { FormValue } from "../../pages/admin/components/modal/category/CategorySchema";

interface Props {
    id: string;
}

const usePutCategory = ({id}:Props) => {
    const queryClient = useQueryClient();

    return useMutation({
    mutationFn: async (data: FormValue) => {
        return await api.category.putCategory(id, data);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
    }
})
}

export default usePutCategory