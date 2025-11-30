// commands/spam.js
const cron = require("node-cron");

let spamMsg = "Its Beginning To Look A Lot Like Christmas...";
let tasks = new Map(); // Map<guildId, cronTask>

module.exports = {
  name: "spam",
  description: "Make the bot spam something.",
  ownerOnly: true,

  execute(message, args) {
    const cmd = args.join(" ");
    const guildId = message.guild.id;

    if (!cmd) {
      return message.reply("⚠️ Please provide an argument`.");
    }

    if (cmd === "start") {
      if (tasks.has(guildId)) {
        return message.reply("⚠️ Spam is already running in this server.");
      }
      const channel = message.channel;
      const task = cron.schedule("*/3 * * * * *", async () => {
        await channel.send(spamMsg);
      });
      task.start();
      tasks.set(guildId, task);
      return message.reply("✅ Started spamming for this server.");
    }

    if (cmd === "stop") {
      if (!tasks.has(guildId)) {
        return message.reply("⚠️ No spam task is running for this server.");
      }
      const task = tasks.get(guildId);
      task.stop();
      tasks.delete(guildId);
      return message.reply("🛑 Stopped spamming in this server.");
    }
  },
};
