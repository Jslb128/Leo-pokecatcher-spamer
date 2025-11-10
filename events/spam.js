const cron = require('node-cron');
function sleep(timeInMs) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeInMs);
  });
}
module.exports = (client) => {
	client.on("ready", async() => {
		const channelId = '1436115271076024480'; // your channel ID here
		const channel = await client.channels.fetch(channelId);
		while (!client.captchaPaused){
			await sleep(1500);
			channel.send("Its Beginning To Look A Lot Like Christmas...");
		};
	});
};
