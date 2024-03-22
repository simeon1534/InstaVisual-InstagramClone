

import {DB} from "../core/DB";
import {PhotoUploadData} from "../types/PhotoUploadData";

export class PhotoModel {
    private conn;
    constructor() {
        this.conn = new DB().conn;
    }

    async uploadPhoto(photoUploadData: PhotoUploadData) {
        const insertDataObject = [
            photoUploadData.user_id,
            photoUploadData.photo_description,
            photoUploadData.photo_base64
        ]

        await this.conn.execute("INSERT INTO photos (user_id, photo_description, photo_base64, date_of_upload) VALUES (?, ?, ?, NOW())", insertDataObject)

    }

    async getPhotos(user_id: number){
        const [rows] =  await this.conn.query("SELECT photo_description, photo_base64 FROM photos WHERE user_id = ?", [user_id])
        return rows;
    }

    async getAllPhotos(){
        const [rows] =  await this.conn.query("SELECT photos.photo_description, photos.photo_base64, photos.photo_id,photos.user_id,photos.date_of_upload,users.username\n" +
            "FROM users\n" +
            "INNER JOIN photos ON users.user_id = photos.user_id;")
        return rows;
    }

}

