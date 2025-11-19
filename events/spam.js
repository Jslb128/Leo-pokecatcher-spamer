const cron = require('node-cron');

module.exports = (client) => {
	client.on("ready", async() => {
		const channelId = '1436115271076024480'; // your channel ID here
		const channel = await client.channels.fetch(channelId);

		cron.schedule('*/3 * * * * *', () => {
			channel.send("Its Beginning To Look A Lot Like Christmas...");
		});

	});
};
