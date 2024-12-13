import authUtils from "../../utils/auth";
import api from "../../services/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CourseGroupFormValue } from "../../pages/Profile/components/modal/CourseGroupSchema";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { CourseGroupEditFormValue } from "../../pages/Profile/components/modal/CourseGroupEditSchema";

const useCourseGroup = () => {
    const queryClient = useQueryClient();
    const token = authUtils.getSessionToken();

    const getCourseGroups = () => useQuery({
        queryKey: ["courseGroups", token],
        queryFn: async () => {
            const items = await api.courseGroup.getCourseGroups();
            return items;
        }
    });

    const getCourseGroupById = (id: string) => useQuery({
        queryKey: ["courseGroup", id],
        queryFn: async () => {
            const items = await api.courseGroup.getCourseGroupById(id);
            return items;
        }
    });

    const createCourseGroupsMutation = useMutation({
        mutationFn: async (data: CourseGroupFormValue) => {
            return await api.courseGroup.postCourseGroup(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["courseGroups", token] })
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

    const editCourseGroupsMutation = useMutation({
        mutationFn: async (data: CourseGroupEditFormValue) => {
            return await api.courseGroup.putCourseGroup(data.id, data.name);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["courseGroups", token] })
        },
        onError: (error : unknown) => {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "Group updated fail";
                toast.error(errorMessage);
              } else {
                toast.error("Something wrong happen. Try again!");
              }
        }
    })

    const createCourseGroup = (data: CourseGroupFormValue) => {
        createCourseGroupsMutation.mutate(data);
    }

    const editCourseGroup = (data: CourseGroupEditFormValue) => {
        editCourseGroupsMutation.mutate(data);
    }

    return {getCourseGroups, getCourseGroupById ,createCourseGroup, editCourseGroup, createCourseGroupsMutation, editCourseGroupsMutation}
}

export default useCourseGroup;