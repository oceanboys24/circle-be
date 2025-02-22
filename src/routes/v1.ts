import AuthRoute from "./v1/auth_route";
import FollowRoute from "./v1/follow_route";
import LikesRoute from "./v1/like_route";
import ProfileRoute from "./v1/profile_route";
import ReplyRoute from "./v1/reply_route";
import ThreadRoute from "./v1/thread_route";
import UploadRoute from "./v1/upload_route";
import UserRoute from "./v1/user_route";
import express from "express";

const v1Router = express.Router();

v1Router.use("/users", UserRoute);
v1Router.use("/auth", AuthRoute);
v1Router.use("/profile", ProfileRoute);
v1Router.use("/threads", ThreadRoute);
v1Router.use("/likes", LikesRoute);
v1Router.use("/follows", FollowRoute);
v1Router.use("/reply", ReplyRoute);
v1Router.use("/upload", UploadRoute)

export default v1Router;
