import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate: {
        validator: (v) => !v.includes("@"),
        message: (props) => `${props.value} does not contain @ symbol.`,
      },
    },
    password: String,
    username: {
      type: String,
      required: true,
      minLength: 1,
    },
    thumbnail: String,
  },
  {
    timestamps: true,
  }
);

const channelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 1,
    },
    // creator: userSchema,
    creator: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    inviteOnly: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const iconSchema = mongoose.Schema({
  iconType: {
    type: String,
    required: true,
  },
});

const iconCountSchema = mongoose.Schema({
  iconCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  iconType: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Icon",
  },
});

const messageSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      minLength: 1,
    },
    // creator: userSchema,
    creator: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    // channel: channelSchema,
    channel: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Channel",
      required: true,
    },
    selectedFile: [String],
    icon: [iconCountSchema],
    // icon: [mongoose.SchemaTypes.ObjectId],
    replyToAnother: {
      type: Boolean,
      default: false,
    },
    // replyMessage: [messageSchema],
    repliedMessage: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "MessageBody",
    },
    // createdAt: {
    //   type: Date,
    //   default: new Date(),
    // },
  },
  {
    timestamps: true,
  }
);

export const MessageBody = mongoose.model("MessageBody", messageSchema);
export const User = mongoose.model("User", userSchema);
export const Channel = mongoose.model("Channel", channelSchema);
export const Icon = mongoose.model("Icon", iconSchema);

// export default MessageBody;
