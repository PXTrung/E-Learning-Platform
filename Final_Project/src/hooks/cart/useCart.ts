import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import api from "../../services/api"
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import authUtils from "../../utils/auth";
import { CartInformation } from "../../services/interfaces";

const useCart = () => {
    const queryClient = useQueryClient();
    const token = authUtils.getSessionToken();

    const getCart = () => useQuery({
        queryKey: ["cart", token],
        queryFn: async() => {
            if(!token){
                return {
                        id: "0",
                        total: 0,
                        itemCount: 0,
                        cartItems: []
                    } as CartInformation;
            }
            const item = await api.cart.getCarts();
            return item;
        },
        enabled: !!token, // Ensure the query only runs if the token exists 
    });

    const removeFromCartMutation =  useMutation({
        mutationFn: async (id: string) => {
            return await api.cart.removeFromCart(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
        },
        onError: (error : unknown) => {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "CartItem remove fail";
                toast.error(errorMessage);
              } else {
                toast.error("Something wrong happen. Try again!");
              }
        }
    });

    const addToCartMutation = useMutation({
        mutationFn: async (id: string) => {
            return await api.cart.addToCart(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
        },
        onError: (error : unknown) => {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "CartItem remove fail";
                toast.error(errorMessage);
              } else {
                toast.error("Something wrong happen. Try again!");
              }
        }
    });

    // Now, you can call removeFromCartMutation.mutate() any time without violating the hook rules
    const removeFromCart = (id: string) => {
        removeFromCartMutation.mutate(id);
    };

    const addToCart = (id: string) => {
        addToCartMutation.mutate(id);
    };

    return {getCart, removeFromCart, addToCart};
};

export default useCart;