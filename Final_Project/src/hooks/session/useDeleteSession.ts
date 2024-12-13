import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import api from "../../services/api";


const useDeleteSession = (id:string, courseId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
    mutationFn: async () => {
        return await api.session.deleteSession(id);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['sessions', courseId] })
    },
    onError: (error : unknown) => {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Session deleted fail";
            toast.error(errorMessage);
          } else {
            toast.error("Something wrong happen. Try again!");
          }
    }
})}

export default useDeleteSession