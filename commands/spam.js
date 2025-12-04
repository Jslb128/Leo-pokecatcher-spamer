// commands/spam.js
let spamMsg = "Its Beginning To Look A Lot Like Christmas...";
const cron = require("node-cron");
let tasks = new Map(); // Map<guildId, intervalId>
const { stopSpam } = require("../events/catch.js");


module.exports = { 
  name: "spam",
  description: "Make the bot spam something.",
  ownerOnly: true,
  cron.schedule("* * * * *", () => {
  execute(message, args) {
    const cmd = args.join(" ");
    const guildId = message.guild.id;

    if (!cmd) {
      return message.reply("⚠️ Please provide an argument.");
    }

    // START
    if (cmd === "start") {
      if (tasks.has(guildId)) {
        return message.reply("⚠️ Spam is already running in this server.");
      }

      const channel = message.channel;

      const intervalId = setInterval(async () => {
        await channel.send(spamMsg);
      }, 2500); 
      console.log("This runs every minute");
        if (stopSpam){
          const intervalId = tasks.get(guildId);
          clearInterval(intervalId);
          tasks.delete(guildId);
          return message.reply("🛑 Stopped spamming in this server. Exceeded 998. \n Will start after cooldown is lifted.");
        }
      });
      tasks.set(guildId, intervalId);

      return message.reply("✅ Started spamming.");
    }

    // STOP
    if (cmd === "stop") {
      if (!tasks.has(guildId)) {
        return message.reply("⚠️ No spam task is running for this server.");
      }

      const intervalId = tasks.get(guildId);
      clearInterval(intervalId);
      tasks.delete(guildId);

      return message.reply("🛑 Stopped spamming in this server.");
    }
  },
};
