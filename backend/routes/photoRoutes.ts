import {Router} from "express";
import {getAllPhotos, getPhotos, uploadPhoto} from "../controllers/PhotoController";


export const photoRouter = Router();
photoRouter.post("/new_photo", uploadPhoto)
photoRouter.get("/user/:id", getPhotos)
photoRouter.get("/photos", getAllPhotos)
