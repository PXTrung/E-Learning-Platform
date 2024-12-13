import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import authUtils from "../../utils/auth";
import api from "../../services/api"
import { AddToGroup, RemoveFromGroup } from "../../services/interfaces";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const useEnrollment = () => {
    const queryClient = useQueryClient();
    const token = authUtils.getSessionToken();

    const getEnrollments = () => useQuery({
        queryKey: ["enrollments", token],
        queryFn: async () => {
            const items = await api.enrollment.getEnrollments();
            return items;
        },
        enabled: !!token
    });

    const addEnrollmentToGroupMutation = useMutation({
        mutationFn: async (data: AddToGroup) => {
            return await api.enrollment.addToGroup(data);
        },
        onError: (error : unknown) => {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "Group created fail";
                toast.error(errorMessage);
              } else {
                toast.error("Something wrong happen. Try again!");
              }
        }
    });

    const removeFromGroupMutation = useMutation({
        mutationFn: async (data: RemoveFromGroup) => {
            return await api.enrollment.removeFromGroup(data);
        },
        onError: (error : unknown) => {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "Group removed fail";
                toast.error(errorMessage);
              } else {
                toast.error("Something wrong happen. Try again!");
              }
        }
    });

    const addEnrollmentToGroup = (data: AddToGroup) => {
        addEnrollmentToGroupMutation.mutate(data);
    }

    const removeFromGroup = (data: RemoveFromGroup) => {
        removeFromGroupMutation.mutate(data);
    }

    return {getEnrollments, addEnrollmentToGroup, removeFromGroup, addEnrollmentToGroupMutation, removeFromGroupMutation}
}

export default useEnrollment;