
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { FormValue } from '../../pages/admin/components/modal/category/CategorySchema';
import api from '../../services/api';


const usePostCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
    mutationFn: async (data: FormValue) => {
        return await api.category.postCategory(data)
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (error : unknown) => {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Category created fail";
            toast.error(errorMessage);
          } else {
            toast.error("Something wrong happen. Try again!");
          }
    }
})}

export default usePostCategory