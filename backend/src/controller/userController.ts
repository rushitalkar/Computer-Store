import { Request , Response } from "express";
import * as queries from "../db/quries"
import { getAuth } from "@clerk/express";
export const syncUser = async(req : Request , res : Response)=>{
    try {
        const {userId} = getAuth(req)
        if (!userId) return res.status(401).json({error : "unauthorized"})

        const {email, name , imageUrl} = req.body

        if (!email || !name || !imageUrl) {
            return res.status(401).json({error : "Email Name and Image Url Require"})
        }
        

        const user = await queries.upsertUser({
            id : userId,
            email,
            name,
            imageUrl
        })

    res.status(400).json(user)
    } catch (error) {
        console.error("Error Syncking User",error);
        res.status(500).json({error : "Error Syncing User "})
    }
}