import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import api from "../../services/api";


const usePutLesson = (id:string, sessionId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
    mutationFn: async (data: FormData) => {
        return await api.lesson.putLesson(id, data);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['lesson', id] })
        queryClient.invalidateQueries({ queryKey: ['lessons', sessionId] })
    },
    onError: (error : unknown) => {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Lesson updated fail";
            toast.error(errorMessage);
          } else {
            toast.error("Something wrong happen. Try again!");
          }
    }
})}

export default usePutLesson