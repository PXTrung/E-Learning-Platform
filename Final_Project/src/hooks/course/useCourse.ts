import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";


const useCourse = (id: string) => useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
        const items = await api.course.getCourseById(id);
        return items;
    },
     // The query will not execute until the id exists
     enabled: !!id
});

export default useCourse