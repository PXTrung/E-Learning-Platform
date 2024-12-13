import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import useStore from "../../store";

const useCourses = () => {
    const { courseQuery } = useStore();


    return useQuery({
        queryKey: ['courses', courseQuery],
        queryFn: async () => {
            const items = await api.course.getCourses(courseQuery);
            return items;
        },
    });
} 

export default useCourses;