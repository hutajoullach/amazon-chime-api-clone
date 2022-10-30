import express from "express";

import {
  getChannels,
  createChannel,
  getMessages,
  createMessage,
  updateChannel,
  deleteChannel,
  updateMessage,
  replyMessage,
  deleteMessage,
  iconReply,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/messages.js";

const router = express.Router();

router.get("/", getChannels);
router.post("/", createChannel);
router.patch("/channel/:channelId", updateChannel);
router.delete("/channel/:channelId", deleteChannel);
router.get("/channel/:channelId", getMessages);
router.post("/channel/:channelId", createMessage);
router.patch("/channel/:channelId/:messageId", updateMessage);
router.delete("/channel/:channelId/:messageId", deleteMessage);
router.patch("/channel/:channelId/:messageId/replyMessage", replyMessage);
router.patch("/channel/:channelId/:messageId/iconReply", iconReply);
router.post("/signup", createUser);
router.patch("/user/:userId", updateUser);
router.delete("/user/:userId", deleteUser);

export default router;
