import { Request,Response } from "express";
import { getAuth } from "@clerk/express";
import * as queries from "../db/quries"

export const createComment = async(req : Request , res : Response )=>{
    try {
        const {userId} = getAuth(req)
        if (!userId) return res.status(401).json({error : "unauthorized"})

        const {productId} = req.params

        const {content} = req.body

        if (!content) return res.status(400).json({error : "Missing Comment Content"})

        const comment = await queries.createComment({
            userId,
            productId,
            content
        })

        res.status(200).json(comment)
    } catch (error) {
        res.status(500).json({error : "Error Creating Comment"})
        console.error("Create Commeent error");
        
    }
}

export const deleteComment = async(req : Request , res : Response )=>{
    try{
        const {userId} = getAuth(req)
        const {commentId} = req.params

        const existingComment = await queries.getCommentById(commentId)

        if (!existingComment) return res.status(404).json({error : "Comment Not Found"})

        if(existingComment.userId !== userId) res.status(500).json({error : "You Can Delete Your Own Comment"})

        await queries.deleteComment(commentId)
    }catch(error){
          res.status(500).json({error : "Error Deleting Comment"})
        console.error("Delete Commeent error");
    }
}