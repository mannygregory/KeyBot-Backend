const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.')
		.addUserOption(option => 
			option
				.setName('target')
				.setDescription('The user\'s avatar to show')
				.setRequired(false)),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild

		//await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
		const user = interaction.options.getUser('target');
		console.log(user.id)
		//await interaction.reply(`Hi, ${user}.`);
		//await interaction.followUp(`Hi, <@${user.id}>.`);
		interaction.reply("Done")
		

	},
};