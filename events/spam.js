const cron = require('node-cron');

module.exports = (client) => {
  client.on("ready", async() => {

		const channelId = '1436115271076024480'; // your channel ID here
	        const channeli = await client.channels.fetch(channelId);
	  cron.schedule('*/2 * * * * *', () => {
		channeli.send("pick toothpick beugette");

  	});
  });
};
