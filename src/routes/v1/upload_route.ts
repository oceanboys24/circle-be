import express from "express";
import {
  UploadImageCommentController,
  UploadImageController,
  UploadManyImageController,
} from "../../controllers/upload/upload_image_controller";
import { upload, uploadFiles } from "../../middlewares/multer_middleware";

const UploadRoute = express.Router();

UploadRoute.post("/", upload.single("imageContent"), UploadImageController);
UploadRoute.post(
  "/comment",
  upload.single("contentImage"),
  UploadImageCommentController
);

UploadRoute.post('/edit-profile', uploadFiles, UploadManyImageController)

export default UploadRoute;
