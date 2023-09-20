const { Events } = require('discord.js');
const pollModel = require('../models/pollSchema')
//const { cooldowns } = client;

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
			}
		} else if ((interaction.isButton()) && (interaction.customId.includes(' -trivMC'))) { //Button Interaction Manager for TriviaMC.js
			
			const usrAns = interaction.customId.replace(' -trivMC', '');
			if(usrAns == correct_answer) {
				gotCorrect = true;
			} else {
					gotCorrect = false;
			}
			interaction.reply({content: "Response recorded", ephermal: true})
			
		} else if ((interaction.isButton()) && (interaction.customId.includes(' -trivTF'))) { //Button Interaction Manager for TriviaTF.js

			const usrAns = interaction.customId.replace(' -trivTF', '');
			if(usrAns == correct_answer) {
				gotCorrect = true;
			} else {
					gotCorrect = false;
			}
			interaction.reply({content: "Response recorded", ephermal: true})
			

		} else if ((interaction.isButton()) && (interaction.customId.includes('PollButton'))){  // Poll Interaction Manager
			const customID = interaction.customId
			const IDArr = customID.split(" ");
			const pollNumID = IDArr[0]
			const pollOptionID = IDArr[1];
			const UserID = interaction.member.user.id;
			try {
				const data = await pollModel.findOne({pollID: pollNumID});
			
			
				if(data.votedUsers.includes(UserID)){
					interaction.reply({content:"You have already voted in this poll!", ephemeral: true});
				}
				else{
					if (pollOptionID == "PollButton_1"){
						pollModel.updateOne(
							{pollID: pollNumID,},
							{$inc: {option1: 1}}).exec();
					}
					else if(pollOptionID == "PollButton_2"){
						pollModel.updateOne(
							{pollID: pollNumID,},
							{$inc: {option2: 1}}).exec();
					}
					else if(pollOptionID == "PollButton_3"){
						pollModel.updateOne(
							{pollID: pollNumID,},
							{$inc: {option3: 1}}).exec();
					}
					else if(pollOptionID == "PollButton_4"){
						pollModel.updateOne(
							{pollID: pollNumID,},
							{$inc: {option4: 1}}).exec();
					}
					pollModel.updateOne(
						{pollID: pollNumID,},
						{$push: {votedUsers: [UserID] }}).exec();
					interaction.reply({content:"Your response has been recorded.", ephemeral: true});
				}
			} catch (error) {
			console.log(error)
		}
		}
		
	},
};