import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { deleteProduct, getAllProduct , getMyProducts , updateProduct} from "../lib/api";
import { createProduct } from "../lib/api";
import { getproductById } from "../lib/api";
export const useProducts = ()=>{
    const result = useQuery({queryKey : ["products" ] , queryFn : getAllProduct})
    return result
}

export const useCreateProduct = ()=>{
    return useMutation({mutationFn : createProduct})
}


export const useProduct=(id)=>{
    return useQuery({queryKey : ["product", id] , queryFn :()=> getproductById(id) , enabled : !!id ,})

}


export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProducts"] });
    },
  });
};

export const useMyProducts = () => {
  return useQuery({ queryKey: ["myProducts"], queryFn: getMyProducts });
};

export const useUpdateProduct = ()=>{
   const queryClient = useQueryClient()
    return useMutation({
      mutationFn : updateProduct,
      onSuccess : (_, variables)=>{
           queryClient.invalidateQueries({queryKey : ["products"]})
           queryClient.invalidateQueries({queryKey : ["product", variables.id]})
           queryClient.invalidateQueries({queryKey : ["myProducts"]})
      }
    })
}