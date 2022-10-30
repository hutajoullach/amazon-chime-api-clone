import mongoose from "mongoose";
import { MessageBody, Channel, User, Icon } from "../models/messageBody.js";

export const getChannels = async (req, res) => {
  try {
    const channels = await Channel.find();

    res.status(200).json(channels);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createChannel = async (req, res) => {
  const channel = req.body;

  const newChannel = new Channel(channel);

  try {
    await newChannel.save();

    res.status(201).json(newChannel);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  const channelId = req.params['channelId'];

  if (!mongoose.Types.ObjectId.isValid(channelId))
    return res.status(404).send("No Channel with that channel id");

  try {
    const messageBodies = await MessageBody.where({ channel: channelId }).where({ replyToAnother: false });

    res.status(200).json(messageBodies);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createMessage = async (req, res) => {
  const channelId = req.params['channelId'];

  if (!mongoose.Types.ObjectId.isValid(channelId))
    return res.status(404).send("No Channel with that channel id");

  const message = req.body;

  const messageWithChannelId = {
    ...message,
    channel: channelId,
  };

  const newMessage = new MessageBody(messageWithChannelId);

  try {
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.statues(409).json({ message: error.message });
  }
};

export const updateChannel = async (req, res) => {
  const { channelId: _id } = req.params;
  const channel = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Channel with that channel id");

  const updatedChannel = await Channel.findByIdAndUpdate(
    _id,
    { ...channel, _id },
    { new: true }
  );

  res.json(updatedChannel);
};

export const deleteChannel = async (req, res) => {
  const { channelId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(channelId))
    return res.status(404).send("No Channel with that channel id");

  await Channel.findByIdAndRemove(channelId);

  res.json({ message: "Channel deleted successfully" });
};

export const updateMessage = async (req, res) => {
  const { messageId: _id } = req.params;

  const message = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Message with that message id");

  const updatedMessage = await MessageBody.findByIdAndUpdate(
    _id,
    { ...message, _id },
    { new: true }
  );

  res.json(updatedMessage);
};

export const replyMessage = async (req, res) => {
  const channelId = req.params['channelId'];
  const messageId = req.params['messageId'];

  if (!mongoose.Types.ObjectId.isValid(channelId))
    return res.status(404).send("No Channel with that channel id");

  if (!mongoose.Types.ObjectId.isValid(messageId))
    return res.status(404).send("No Message with that message id");
  
  const message = req.body;

  const messageWithChannelId = {
    ...message,
    channel: channelId,
  };

  const newMessage = new MessageBody(messageWithChannelId);

  let updatedMessage

  try {
    await newMessage.save().then(() => {
      const repliedMessageBody = MessageBody.findById(messageId);

      updatedMessage = MessageBody.findByIdAndUpdate(
      messageId,
      {
        repliedMessage: repliedMessageBody.repliedMessage.push(newMessage._id),
      },
      { new: true }
      );
    })

    res.status(201).json({
      createdMessage: newMessage,
      updatedMessage: updatedMessage,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  const { messageId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(messageId))
    return res.status(404).send("No Message with that message id");

  await MessageBody.findByIdAndRemove(messageId);

  res.json({ message: "Message deleted successfully" });
};

export const iconReply = async (req, res) => {
  const messageId = req.params['messageId'];

  const clickedIcon = req.body;

  if (!mongoose.Types.ObjectId.isValid(messageId))
    return res.status(404).send("No Message with that message id");

  const message = await MessageBody.findById(messageId);

  let updatedIcon;

  if (message.icon.includes({ iconType: clickedIcon })) {
    updatedIcon = message.icon.map((icon) => {
      if (icon.iconType === clickedIcon) icon.iconCount + 1;
    });
  } else {
    updatedIcon = message.icon.push({
      iconCount: 1,
      iconType: clickedIcon,
    });
  }

  const updatedMessage = await MessageBody.findByIdAndUpdate(
    messageId,
    {
      icon: updatedIcon,
    },
    { new: true }
  );

  res.json(updatedMessage);
};

export const createUser = async (req, res) => {
  const user = req.body;

  const newUser = new User(user);

  try {
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { userId: _id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No User with that user id");

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { ...user, _id },
    { new: true }
  );

  res.json(updatedUser);
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(404).send("No User with that user id");

  await User.findByIdAndRemove(userId);

  res.json({ message: "User deleted successfully" });
};