const cron = require('node-cron');

module.exports = (client) => {
	client.on("ready", async() => {
		const channelId = '1436115271076024480'; // your channel ID here
		const channel = await client.channels.fetch(channelId);
			await console.log("!spam");

	});
};
