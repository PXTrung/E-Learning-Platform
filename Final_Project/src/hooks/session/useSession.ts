import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

const useSession = (id: string) => useQuery({
    queryKey: ['session', id],
    queryFn: () => {
        const items = api.session.getSession(id);
        return items;
    },
    enabled: !!id
})

export default useSession