import api from "./axios";

export const  syncUser = async(userData)=>{
    try {
         const {data} = await api.post("/users/sync" , userData)
    console.log("data Sync")
    return data
    } catch (error) {
     console.error(error);
     
    }
   
}

export const getAllProduct = async()=>{
    const {data} = await api.get("/products")
    return data
}

export const getproductById =async (id)=>{
    const { data } = await api.get(`/products/${id}`)
    return data
}
//The frontend does not supply userId directly.
//The backend extracts it from the authenticated request using Clerk.
//So GET /products/my returns only the current logged-in user’s products.
export const getMyProducts = async()=>{
    const {data} = await api.get("/products/my")
    return data
}

export const createProduct = async(productData)=>{
    const {data} = await api.post("/products",productData)
    return data
}



export const updateProduct = async ({ id, ...productData }) => {
  const { data } = await api.put(`/products/${id}`, productData);
  return data;
};

export const deleteProduct = async(id)=>{
    try {
        
        const {data} = await api.delete(`/products/${id}`)
        return data
    } catch (error) {
        console.log(error);
        
    }
    
}

export const createComment = async({productId , content})=>{
    const {data} = await api.post(`/comments/${productId}`,{content})
    return data
}

export const deleteComment =async({commentId})=>{
    const {data} = await api.delete(`/comments/${commentId}`)
    return data
}

