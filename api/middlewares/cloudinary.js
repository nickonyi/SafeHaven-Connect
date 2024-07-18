import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import DatauriParser from 'datauri/parser.js';
import path from 'path';

const { config, uploader } = cloudinary;

export const cloudinaryConfig = () => {
    config({
        cloud_name: process.env.cloudinary_name,
        api_key: process.env.cloudinary_api_key,
        api_secret: process.env.cloudinary_api_secret,
        secure: true
    });
}
    const storage = multer.memoryStorage();
    export const multerUploads = multer({storage}).single("image");
    
    export const dataUri = (req) => {
        const parser = new DatauriParser();
        return parser.format(
            path.extname(req.file.originalname).toString(),
            req.file.buffer
        ).content;
    }


export {uploader} ;