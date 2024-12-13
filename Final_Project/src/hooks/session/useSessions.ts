import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

const useSessions = (id: string) => useQuery({
    queryKey: ['sessions', id],
    queryFn: () => {
        const items = api.session.getSessions(id);
        return items;
    },
    enabled: !!id
})

export default useSessions