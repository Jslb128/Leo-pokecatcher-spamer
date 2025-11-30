// commands/spam.js
const cron = require("node-cron");
let spamMsg = "Its Beginning To Look A Lot Like Christmas...";
let task = null; 
module.exports = {
	
  name: "spam",
  description: "Make the bot spam something.",
  ownerOnly: true, // Only owners can run this command

  execute(message, args) {
    const cmd = args.join(" ");
    if (!cmd) {
      return message.reply("⚠️ Please provide an argument for spam command.");
    }
	if (cmd === "start"){
      if (task) {
        return message.reply("⚠️ Spam task is already running.");
      }
      const channel = message.channel;
      task = cron.schedule("*/3 * * * * *", async () => {
        await channel.send(spamMsg);
      });
      task.start();
      return message.reply("✅ Started spamming.");
    }
	if (cmd === "stop"){
      if (!task) {
        return message.reply("⚠️ No spam task is running.");
      }

      task.stop();
      task = null;
      return message.reply("🛑 Stopped spamming.");
	}
  },
};
