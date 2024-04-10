import {Request, Response} from "express";
import {PhotoModel} from "../models/PhotoModel";
import {PhotoUploadData} from "../types/PhotoUploadData";



export const uploadPhoto = async (req: Request, res: Response) => {

    let photoUploadData: PhotoUploadData = req.body;
    console.log("MODEL")
    console.log(photoUploadData)


    if (!photoUploadData.photo_base64) {
        return res.status(400).send({
            status: 400,
            message: "photo base64 encoding has not been provided"
        })
    }
    if (!photoUploadData.photo_description) {
        return res.status(400).send({
            status: 400,
            message: "Photo Description has not been provided "
        })
    }


    const photoModel = new PhotoModel();
    await photoModel.uploadPhoto(photoUploadData)
    res.status(201).send({
        status: 201,
        message: "Photo uploaded successfully!"
    })
}

export const getPhotos = async (req: Request, res: Response) => {

    const userId = parseInt(req.params.id);
    const photoModel = new PhotoModel();

    const photos = await photoModel.getPhotos(userId);
    res.send(photos);

}

export const getAllPhotos = async (req: Request, res: Response) => {


    const photoModel = new PhotoModel();

    const photos = await photoModel.getAllPhotos();
    res.send(photos);

}