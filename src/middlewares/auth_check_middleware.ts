import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function AuthCheck(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"] || "";
  const jwtToken = process.env.JWT_SECRET || "";

  try {
    const userVerify = jwt.verify(token, jwtToken);
    if (!userVerify) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    (req as any).userVerify = userVerify;
    next();
  } catch (error) {
    res.status(403).json({
      message: "Forbidden : Invalid or Expired Token",
    });
    return;
  }
}
