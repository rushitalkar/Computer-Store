import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { getAllProduct } from "../lib/api";
import { createProduct } from "../lib/api";
export const useProducts = ()=>{
    const result = useQuery({queryKey : ["products" ] , queryFn : getAllProduct})
    return result
}

export const useCreateProduct = ()=>{
    return useMutation({mutationFn : createProduct})
}
