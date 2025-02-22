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

export function UploadManyImageController(req: Request, res: Response) {}
