import { Response, Request } from "express";

export function UploadImageController(req: Request, res: Response) {
  try {
    const fileUrl = (req.file as Express.MulterS3.File).location;
    res.status(200).json({
      status: 200,
      message: "Success Upload Image",
      data: fileUrl,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
export function UploadImageCommentController(req: Request, res: Response) {
  try {
    const fileUrl = (req.file as Express.MulterS3.File).location;
    res.status(200).json({
      status: 200,
      message: "Success Upload Image",
      data: fileUrl,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

export function UploadManyImageController(req: Request, res: Response) {
  try {
    if (!req.files) {
      res.status(400).json({
        status: 400,
        message: "No files uploaded",
      });
      return;
    }

    const files = req.files as { [fieldname: string]: Express.MulterS3.File[] };

    const responseData: Record<string, string> = {};

    if (files.avatarUrl) {
      responseData.avatarUrl = files.avatarUrl[0].location;
    }

    if (files.bannerUrl) {
      responseData.bannerUrl = files.bannerUrl[0].location;
    }

    res.status(200).json({
      responseData,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
