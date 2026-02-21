<img width="1280" height="320" alt="Raid Alert Banner" src="https://github.com/user-attachments/assets/87081624-ac59-4410-bdcb-8c2ef1403c5c" />

![GitHub last commit](https://img.shields.io/github/last-commit/AestheticWolfie/raidAlert)

RaidAlert is a discord bot that posts and automatically updates a schedule in discord.

## Event Schedule
---

Use /post-schedule on a channel to post an up to date Arc Raiders event schedule.

RaidAlert updates the schedule automatically every three minutes with up to date data from the free metaforge event API.

![raidAlert-slash-command](https://github.com/user-attachments/assets/c975ab7d-c291-4683-b3dc-d4eab68631f0)

### What you need to start up a raidAlert discord bot
---
All you need are two things:
- A discord app with a client token.
- Any mongoDB database, this can be localhosted, mongoDB atlas (what I use) or any other mongoDB database that has a URI pointing to it.

### Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| DISCORD_TOKEN | ✅ | Your Discord app client token |
| MONGODB_URI | ✅ | Your MongoDB connection string |
| DEV_ID | ❌ | Your Discord user ID |
| DEV_GUILD | ❌ | Your dev guild ID |
| SUCCESS_DEV_CHANNEL | ❌ | Channel ID for success notifications |
| NOTIFICATION_DEV_CHANNEL | ❌ | Channel ID for error notifications |

✅ Is required ❌ Is optional

Put these in a .env where it can be referenced

### Option 1 - Git cloning
---
You can clone the repo and make a .env file to put your environment variables in. The environment variables will be called DISCORD_TOKEN for the client token of your discord app and MONGODB_URI for your database.

npm install the dependencies and then run node src/index.js

### Option 2 - Docker (preferred)
---
Make sure docker is installed on your system. If you run locally I highly recommend using Docker Desktop. Just have that running in the background.

You pull a container from the GHCR

```docker pull ghcr.io/aestheticwolfie/raid-alert:latest```

You could then run the command and replace all the constants with your own but this way is a little insecure.
```
docker run -d \
  --name raidalert \
  --restart unless-stopped \
  -e DISCORD_TOKEN=your_discord_token \
  -e MONGODB_URI=your_mongodb_uri \
  -e DEV_ID=your_dev_id \
  -e DEV_GUILD=your_dev_guild_id \
  -e SUCCESS_DEV_CHANNEL=your_success_channel_id \
  -e NOTIFICATION_DEV_CHANNEL=your_notification_channel_id \
  -v /path/to/raidalert-data:/app/cache \
  ghcr.io/aestheticwolfie/raid-alert:latest
```

I'd recommend putting all the variables into a .env and then run the command

```
docker run -d \
  --name raidalert \
  --restart unless-stopped \
  --env-file /path/to/.env \
  -v /path/to/raidalert-data:/app/cache \
  ghcr.io/aestheticwolfie/raid-alert:latest
```

By doing it this way you can raise the permissions of .env high so its harder to see but its preference. You can leave out the optional variables.

Also remember you need a tiny bit of storage to house a local volume.

## License
MIT © AestheticWolfie


