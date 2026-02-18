import dotenv from "dotenv";
dotenv.config();

let notificationDevChannel = "";
if (process.env.NOTIFICATION_DEV_CHANNEL) {
  notificationDevChannel = process.env.NOTIFICATION_DEV_CHANNEL;
}

let successDevChannel = "";
if (process.env.SUCCESS_DEV_CHANNEL) {
  successDevChannel = process.env.SUCCESS_DEV_CHANNEL;
}

let devId = "";
if (process.env.DEV_ID) {
  devId = process.env.DEV_ID;
}

let devGuild = "";
if (process.env.DEV_GUILD) {
  devGuild = process.env.DEV_GUILD;
}

export const NOTIFICATION_DEV_CHANNEL = notificationDevChannel;
export const SUCCESS_DEV_CHANNEL = successDevChannel;
export const DEV_ID = devId;
export const DEV_GUILD = devGuild;
