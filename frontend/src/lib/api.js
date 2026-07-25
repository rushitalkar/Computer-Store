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

export const getMyProduct = async()=>{
    const {data} = await api.get("/products/my")
    return data
}

export const createProduct = async(productData)=>{
    const {data} = await api.post("/products",productData)
    return data
}

export const updateProduct = async(id,...productData)=>{
    const {data} = await api.put(`/products/${id}`,productData)
    return data
}

export const deleteProduct = async(id)=>{
    const {data} = await api.delete(`/products/${id}`)
    return data
}

export const createComment = async({productId , content})=>{
    const {data} = await api.post(`/comments/${productId}`,{content})
    return data
}

export const deleteComment =async({commentId})=>{
    const {data} = await api.delete(`/comments/${commentId}`)
    return data
}