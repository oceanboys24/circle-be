import express from "express";
import {
  UploadManyImageController,
  UploadImageController,
} from "../../controllers/upload/upload_image_controller";
import { upload, uploadFiles } from "../../middlewares/multer_middleware";

const UploadRoute = express.Router();

UploadRoute.post("/thread", upload.single("image"), UploadImageController);

export default UploadRoute;
