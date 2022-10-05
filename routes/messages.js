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
} from "../controllers/messages.js";

const router = express.Router();

// router.get("/", getMessages);
// router.post("/", createMessage);
// router.patch("/:id", updateMessage);
// router.delete("/:id", deleteMessage);
// router.patch("/:id/iconReply", iconReply);

router.get("/", getChannels);
router.post("/", createChannel);
router.get("/:channelId", getMessages);
router.post("/:channelId", createMessage);
router.patch("/:channelId", updateChannel);
router.delete("/:channelId", deleteChannel);
router.patch("/:channelId/:messageId", updateMessage);
router.patch("/:channelId/:messageId/replyMessage", replyMessage);
router.delete("/:channelId/:messageId", deleteMessage);
router.patch("/:channelId/:messageId/iconReply", iconReply);

export default router;
