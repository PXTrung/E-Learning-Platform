import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface Props {
    sessionId: string;
}

const usePostLesson = ({sessionId}: Props) => {
    const queryClient = useQueryClient();

    return useMutation({
    mutationFn: async (data: FormData) => {
        return await api.lesson.postLesson(sessionId, data)
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['lessons', sessionId] })
    },
    onError: (error : unknown) => {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Lesson created fail";
            toast.error(errorMessage);
          } else {
            toast.error("Something wrong happen. Try again!");
          }
    }
})}

export default usePostLesson