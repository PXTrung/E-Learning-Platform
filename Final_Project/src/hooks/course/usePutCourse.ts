import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import useStore from "../../store";

interface Props {
    id: string;
}

const usePutCourse = ({id}:Props) => {
    const queryClient = useQueryClient();

    const { courseQuery } = useStore();

    return useMutation({
    mutationFn: async (data: FormData) => {
        return await api.course.putCourse(id, data)
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['courses', courseQuery] })
        queryClient.invalidateQueries({queryKey: ['course', id]})
    },
    onError: (error : unknown) => {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Course Updated fail";
            toast.error(errorMessage);
          } else {
            toast.error("Something wrong happen. Try again!");
          }
    }
})}

export default usePutCourse