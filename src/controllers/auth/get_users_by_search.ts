import { Request, Response } from "express";
import GetUserBySearchService from "../../services/auth/get_user_by_search";

export default async function GetUsersSearch(req: Request, res: Response) {
  try {
    const q = req.query.q as string;

    if (!q.trim()) {
      res.json([]);
      return;
    }
    const users = await GetUserBySearchService(q);
    res.json(users);
  } catch (error) {
    res.json("error");
  }
}
