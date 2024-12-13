import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

const useLesson = (id: string) => useQuery({
    queryKey: ['lesson', id],
    queryFn: () => {
        const items = api.lesson.getLesson(id);
        return items;
    },
    enabled: !!id
})

export default useLesson