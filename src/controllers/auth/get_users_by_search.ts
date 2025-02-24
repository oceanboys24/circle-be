import { Request, Response } from "express";
import GetUserBySearchService from "../../services/auth/get_user_by_search";

export default async function GetUsersSearch(req: Request, res: Response) {
  const search = req.query.search as string;
  const users = await GetUserBySearchService(search);
  res.json(users);
}
