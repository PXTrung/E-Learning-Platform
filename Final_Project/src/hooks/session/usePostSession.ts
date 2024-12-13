import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SessionFormValue } from "../../pages/lecturer/components/modal/session/SessionSchema";
import api from "../../services/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface Props {
    id: string;
}

const usePostSession = ({id}:Props) => {
    const queryClient = useQueryClient();

    return useMutation({
    mutationFn: async (data: SessionFormValue) => {
        return await api.session.postSession(id, data)
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['sessions', id] })
    },
    onError: (error : unknown) => {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Session created fail";
            toast.error(errorMessage);
          } else {
            toast.error("Something wrong happen. Try again!");
          }
    }
})}

export default usePostSession