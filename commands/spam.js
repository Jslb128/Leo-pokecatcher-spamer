let spamMsg = "Its Beginning To Look A Lot Like Christmas...";
let tasks = new Map(); // Map<guildId, intervalId>

const { stopSpam } = require("../events/catch.js");

module.exports = { 
  name: "spam",
  description: "Make the bot spam something.",
  ownerOnly: true,

  async execute(message, args) {
    const cmd = args[0];              
    const chnnlName = args.slice(1).join("-");
    const guildId = message.guild.id;

    if (!cmd) {
      return message.reply("⚠️ Please provide `start` or `stop`.");
    }

    // ✅ START SPAM
    if (cmd === "start") {
      if (!chnnlName) {
        return message.reply("⚠️ Provide a channel name.\n`!spam start general`");
      }

      if (tasks.has(guildId)) {
        return message.reply("⚠️ Spam is already running in this server.");
      }

      const channel = message.guild.channels.cache.find(
        ch => ch.name === chnnlName && ch.isTextBased()
      );

      if (!channel) {
        return message.reply("❌ Channel not found.");
      }

      if (!channel.permissionsFor(message.guild.members.me).has("SendMessages")) {
        return message.reply("❌ I don't have permission to send messages in that channel.");
      }

      const intervalId = setInterval(async () => {
        try {
          if (stopSpam === true) {
            clearInterval(intervalId);
            tasks.delete(guildId);
            return channel.send("🛑 Spam stopped. Cooldown active.");
          }

          await channel.send(spamMsg);
        } catch (err) {
          clearInterval(intervalId);
          tasks.delete(guildId);
          console.error("Spam stopped due to error:", err);
        }

      }, 4000);
      setTimeout(() => {
        if (tasks.has(guildId)) {
          clearInterval(intervalId);
          tasks.delete(guildId);
          channel.send("⏳ Spam auto-stopped after 5 minutes.");
        }
      }, 300000);

      tasks.set(guildId, intervalId);
      return message.reply(`✅ Started spamming in **#${channel.name}**.`);
    }

    // ✅ STOP SPAM
    if (cmd === "stop") {
      if (!tasks.has(guildId)) {
        return message.reply("⚠️ No spam task is running.");
      }

      clearInterval(tasks.get(guildId));
      tasks.delete(guildId);

      return message.reply("🛑 Stopped spamming in this server.");
    }
  },
};
