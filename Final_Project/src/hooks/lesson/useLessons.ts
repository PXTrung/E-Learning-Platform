import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

const useLessons = (id: string) => useQuery({
    queryKey: ['lessons', id],
    queryFn: () => {
        const items = api.lesson.getLessons(id);
        return items;
    },
    // The query will not execute until the id exists
    enabled: !!id
})

export default useLessons