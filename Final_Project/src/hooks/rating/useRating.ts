import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import authUtils from "../../utils/auth";
import api from "../../services/api"
import { CreateRatingData, EditRatingData, ResponseData } from "../../services/interfaces";
import { AxiosError } from "axios";
import { toast } from "react-toastify";


const useRating = () => {
    const queryClient = useQueryClient();
    const token = authUtils.getSessionToken();

    const getRatings = (id: string) => useQuery({
        queryKey: ["ratings"],
        queryFn: async() => {
            const items = await api.rating.GetRatingByCourse(id);
            return items;
        }
    });

    const createRatingMutation = useMutation({
        mutationFn: async(data: CreateRatingData) => {
            return await api.rating.createRating(data);
        },
        onSuccess: (data: ResponseData) => {
            console.log(data);
            queryClient.invalidateQueries({ queryKey: ["ratings"] }),
            queryClient.invalidateQueries({ queryKey: ['course', data.data] })
        },
        onError: (error : unknown) => {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "create rating fail";
                toast.error(errorMessage);
              } else {
                toast.error("Something wrong happen. Try again!");
              }
        }
    });

    const editRatingMutation = useMutation({
        mutationFn: async(data: EditRatingData) => {
            return await api.rating.editRating(data);
        },
        onSuccess: (data: ResponseData) => {
            console.log(data);
            queryClient.invalidateQueries({ queryKey: ["ratings"] }),
            queryClient.invalidateQueries({ queryKey: ['course', data.data] })
        },
        onError: (error : unknown) => {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "edit rating fail";
                toast.error(errorMessage);
              } else {
                toast.error("Something wrong happen. Try again!");
              }
        }
    });

    const createRating = (data: CreateRatingData) => {
        createRatingMutation.mutate(data);
    }

    const editRating = (data: EditRatingData) => {
        editRatingMutation.mutate(data);
    }

    return {getRatings, createRating, createRatingMutation, editRating, editRatingMutation}
}

export default useRating;