import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import api from "../../services/api";


const useDeleteLesson = (id:string, sessionId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
    mutationFn: async () => {
        return await api.lesson.deleteLesson(id);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['lessons', sessionId] })
    },
    onError: (error : unknown) => {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Lesson deleted fail";
            toast.error(errorMessage);
          } else {
            toast.error("Something wrong happen. Try again!");
          }
    }
})}

export default useDeleteLesson