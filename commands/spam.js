
// commands/spam.js

let spamMsg = "Its Beginning To Look A Lot Like Christmas...";
let tasks = new Map(); // Map<guildId, intervalId>

const { stopSpam } = require("../events/catch.js");

module.exports = { 
  name: "spam",
  description: "Make the bot spam something.",
  ownerOnly: true,

  async execute(message, args) {
    const cmd = args[0];              // start / stop
    const chnnlName = args[1];        // channel name
    const guildId = message.guild.id;

    if (!cmd) {
      return message.reply("⚠️ Please provide an argument.");
    }

    // ✅ START SPAM
    if (cmd === "start") {
      if (!chnnlName) {
        return message.reply("⚠️ Please provide a channel name. Example:\n`!spam start general`");
      }

      if (tasks.has(guildId)) {
        return message.reply("⚠️ Spam is already running in this server.");
      }

      // ✅ FIND THE CHANNEL BY NAME
      const channel = message.guild.channels.cache.find(
        ch => ch.name === chnnlName && ch.type === "GUILD_TEXT"
      );

      if (!channel) {
        return message.reply("❌ Channel not found. Make sure the name is correct.");
      }

      const intervalId = setInterval(async () => {

        await channel.send(spamMsg);
      }, 2500);

      tasks.set(guildId, intervalId);
      return message.reply(`✅ Started spamming in **#${channel.name}**.`);
    }

    // ✅ STOP SPAM
    if (cmd === "stop" || stopSpam === true) {
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
