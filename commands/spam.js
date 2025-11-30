// commands/spam.js
const cron = require("node-cron");
module.exports = {
	
  name: "spam",
  description: "Make the bot spam something.",
  ownerOnly: true, // Only owners can run this command

  execute(message, args, spamMsg = "Its Beginning To Look A Lot Like Christmas...") {
    const cmd = args.join(" ");
	const task = cron.schedule('*/3 * * * * *', async() => {
		await message.channel.send(spamMsg);
	});
    if (!cmd) {
      return message.reply("⚠️ Please provide an argument for spam command.");
    }
	if (cmd == "start"){
		task.start();
	}
	if (cmd == "stop"){
		task.stop();
	}
  },
};
