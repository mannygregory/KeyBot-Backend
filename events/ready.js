const { Events,ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Logged in as ${client.user.tag}`);
		
		client.user.setPresence({ activities: [{ name: `Cold Bot is in ${client.guilds.cache.size} server${client.guilds.cache.size > 1 ? 's': ''}!` }], status: 'online' });


	},
};