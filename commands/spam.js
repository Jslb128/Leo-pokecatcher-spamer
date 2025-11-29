// commands/spam.js


module.exports = {
	
  name: "spam",
  description: "Make the bot spam something. Cannot be stopped.",
  ownerOnly: true, // Only owners can run this command

  execute(message, args) {
    const text = args.join(" ");
    if (!text) {
      text = "Its Beginning To Look A Lot Like Christmas...";
      //return message.reply("⚠️ Please provide text to spam.");
    }
	const cron = require("node-cron");
	cron.schedule('*/3 * * * * *', async() => {
		await message.channel.send(text);
	});
  },
};
