import { Router } from "express";
import { getUserChatsController } from "../controllers/chat/getChats";
import { createChatController } from "../controllers/chat/create-chat.controller";
import { createMessageController } from "../controllers/message/createmsg.controller";
import { getAllMessagesController } from "../controllers/message/getAllmessages";

const chatRouter = Router();

chatRouter
  .route("/chat")
  .get(getUserChatsController)
  .post(createChatController);
chatRouter.route("/message").post(createMessageController).get(getAllMessagesController);

export default chatRouter