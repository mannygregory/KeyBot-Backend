const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const mongoose = require('mongoose');
const profileModel = require('../../models/profileSchema') 
const {userStatsEmbedGen} = require('../../embeds/profileEmbed')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Displays a user\'s Key Bots Trivia Statistics')
		.addUserOption(option => 
			option
				.setName('target')
				.setDescription('The user\'stats to show')
				.setRequired(false)),
	async execute(interaction, client) {
        const target = interaction.options.getUser('target')
        console.log(target)
		// If user specifies a target
		if(target) { 
			try {
				const data = await profileModel.findOne({
					userID: target.id,
					serverID: interaction.guild.id,
				});
                console.log(data)
                const username = target.username
				const userAvatar = target.displayAvatarURL()
				const userSteamURL = data.pf_Steam_URL				
				const numCorrect = data.triviaStats.numCorrect
				const numScience = data.triviaStats.scienceNum
				const numHistory = data.triviaStats.historyNum
				const numEntertainment = data.triviaStats.entertainmentNum
				const numSports = data.triviaStats.sportsNum
				const numGeography = data.triviaStats.geographyNum
				const numVB = data.triviaStats.videogameNum
				const numComputers = data.triviaStats.computerNum
				const numArt = data.triviaStats.artNum
                const userEmbed = userStatsEmbedGen(target, username, userAvatar, numCorrect, numScience, numHistory, numEntertainment, numSports, numGeography, numVB, numComputers, numArt, userSteamURL)
                interaction.reply({embeds:[userEmbed], components: []});
                
				if (!data) {
					interaction.reply("User hasn't been registered in the Key Bot Database!")
				}
			} catch (error) {
			console.log(error);
			}

        } else {
            try {
				const data = await profileModel.findOne({
					userID: interaction.user.id,
					serverID: interaction.guild.id,
				});
                console.log(data)
                const username = interaction.member.displayName
				const userAvatar = interaction.user.displayAvatarURL()
				const userSteamURL = data.pf_Steam_URL	
				const numCorrect = data.triviaStats.numCorrect
				const numScience = data.triviaStats.scienceNum
				const numHistory = data.triviaStats.historyNum
				const numEntertainment = data.triviaStats.entertainmentNum
				const numSports = data.triviaStats.sportsNum
				const numGeography = data.triviaStats.geographyNum
				const numVB = data.triviaStats.videogameNum
				const numComputers = data.triviaStats.computerNum
				const numArt = data.triviaStats.artNum
                const userEmbed = userStatsEmbedGen(target, username, userAvatar, numCorrect, numScience, numHistory, numEntertainment, numSports, numGeography, numVB, numComputers, numArt, userSteamURL)
                
                interaction.reply({embeds:[userEmbed], components: []});
				if (!data) {
					interaction.reply("User hasn't been registered in the Key Bot Database!")
				}
			} catch (error) {
			console.log(error);
			}
        }
    }
}