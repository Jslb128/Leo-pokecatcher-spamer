const cron = require("node-cron");

module.exports = (client) => {
  const spamMsg = "Its Beginning To Look A Lot Like Christmas...";
  const tasks = new Map(); // Map<guildId, cronTask>
  const chnnlName = "spam";

  client.on("ready", async () => {
    if (client.captchaPaused = false){
      for (const [guildId, guild] of client.guilds.cache) {
        try {
          const channel = guild.channels.cache.find(
            ch => ch.name === chnnlName && ch.type === "GUILD_TEXT"
          );
  
          if (!channel) {
            console.log(`⚠️ No #${chnnlName} channel found in ${guild.name}`);
            continue;
          }
  
          if (tasks.has(guildId)) continue;
  
          const task = cron.schedule("*/3 * * * * *", async () => {
            try {
              await channel.send(spamMsg);
            } catch (err) {
              console.error(`❌ Spam failed in ${guild.name}:`, err.message);
            }
          });
  
          tasks.set(guildId, task);
          console.log(`✅ Auto-spamming started in ${guild.name} → #${channel.name}`);
  
        } catch (err) {
          console.error(`❌ Failed to start spam in ${guild.name}:`, err.message);
        }
      }
    }
  });

};

