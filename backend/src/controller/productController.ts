import { Request , Response } from "express";
import { getAuth, UnauthorizedError } from "@clerk/express";
import * as queries from "../db/quries"
import { NewProduct } from "../db/schema";
export const getAllProducts = async(req : Request , res : Response )=>{
    try {
        const products = await queries.getAllProducts()
        res.status(200).json(products)

    } catch (error) {
        console.error("error in getAllProduct",error);
        res.status(401).json({error : "Not Syncking Products"})
    }
}

export const getProductById = async(req : Request , res : Response )=>{
    try {
        const {id } = req.params
        const product = await queries.getProductById(id)

        if (!product) return res.status(500).json({error : "Not Loading Products"})
        
        res.status(200).json(product)
    } catch (error) {
                console.error("error in getProductById",error);

                res.status(401).json({error : "Not Syncking Product"})

    }
}

export const getMyProducts = async(req : Request , res : Response )=>{
    try{
       const {userId} = getAuth(req)
       const products = await queries.getProductByUserId(userId)
       
       if (!userId) return res.status(500).json({error : UnauthorizedError})

       res.status(200).json(products)
    }catch(error){
        console.error("error in getMyProduct",error);
        
        res.status(401).json({error : "Not Syncking Products"})
    }
}

export const createProduct = async(req : Request , res : Response )=>{
    try {
        const {userId} = getAuth(req)
        const {title , description , imageUrl} = req.body 

       if ( !title || !description || !imageUrl) {
         return res.status(400).json({error : "Missing Required Fields"})

       } 

         const product = await queries.createProduct({
            userId ,
             title,
            description,
            imageUrl,

        })

        res.status(200).json(product)
    } catch (error) {
        console.error("error in createProduct",error);
        
        res.status(401).json({error : "Not Syncking Product"})
    }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const { title, description, imageUrl } = req.body;

    // Check if product exists and belongs to user
    const existingProduct = await queries.getProductById(id);
    if (!existingProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    if (existingProduct.userId !== userId) {
      res.status(403).json({ error: "You can only update your own products" });
      return;
    }

    const product = await queries.updateProduct(id, {
      title,
      description,
      imageUrl,
    });

    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};


export const deleteProduct = async (req : Request , res : Response )=>{
    try {
        const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;

    // Check if product exists and belongs to user
    const existingProduct = await queries.getProductById(id);
    if (!existingProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    if (existingProduct.userId !== userId) {
      res.status(403).json({ error: "You can only update your own products" });
      return;
    }

    await queries.deleteProduct(id)
    } catch (error) {
        
    }
}