import { useQuery } from "@tanstack/react-query";
import api from "../../services/api"

const useOrder = () => {
    const getOrders = () => useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const items = await api.order.getAll();
            return items;
        }
    });

    return {getOrders}
}

export default useOrder;