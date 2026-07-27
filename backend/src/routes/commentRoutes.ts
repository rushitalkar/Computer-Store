import { Router } from "express";
import { requireAuth } from "@clerk/express";
import * as commentController from "../controller/commentController"
const router = Router();

router.post("/:productId",requireAuth, commentController.createComment)

router.delete("/:commentId",requireAuth, commentController.deleteComment)



export default router