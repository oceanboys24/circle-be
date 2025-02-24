import express from "express";
import {
  UploadImageCommentController,
  UploadImageController,
} from "../../controllers/upload/upload_image_controller";
import { upload } from "../../middlewares/multer_middleware";

const UploadRoute = express.Router();

UploadRoute.post("/", upload.single("imageContent"), UploadImageController);
UploadRoute.post(
  "/comment",
  upload.single("contentImage"),
  UploadImageCommentController
);

export default UploadRoute;
