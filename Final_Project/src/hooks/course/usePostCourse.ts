import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import useStore from "../../store";

const usePostCourse = () => {
    const queryClient = useQueryClient();

    const { courseQuery } = useStore();

    return useMutation({
    mutationFn: async (data: FormData) => {
        return await api.course.postCourse(data)
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['courses', courseQuery] })
    },
    onError: (error : unknown) => {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Course created fail";
            toast.error(errorMessage);
          } else {
            toast.error("Something wrong happen. Try again!");
          }
    }
})}

export default usePostCourse