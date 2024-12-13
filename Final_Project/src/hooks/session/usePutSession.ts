import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SessionFormValue } from "../../pages/lecturer/components/modal/session/SessionSchema";
import api from "../../services/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";


const usePutSession = (id:string, courseId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
    mutationFn: async (data: SessionFormValue) => {
        return await api.session.putSession(id, data)
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['session', id] })
        queryClient.invalidateQueries({ queryKey: ['sessions', courseId] })
    },
    onError: (error : unknown) => {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Session updated fail";
            toast.error(errorMessage);
          } else {
            toast.error("Something wrong happen. Try again!");
          }
    }
})}

export default usePutSession