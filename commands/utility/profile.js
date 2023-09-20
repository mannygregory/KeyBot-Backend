const { SlashCommandBuilder,AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');
const mongoose = require('mongoose');
const profileModel = require('../../models/profileSchema') 


module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Displays a user\'s Key Bots profile card.')
		.addUserOption(option => 
			option
				.setName('target')
				.setDescription('The user\'s avatar to show')
				.setRequired(false)),
	async execute(interaction) {

		const target = interaction.options.getUser('target');
		
		// If user specifies a taget
		if(target) { 
			try {
				const data = await profileModel.findOne({
					userID: target.id,
					serverID: interaction.guild.id,
				});
				//console.log(target.id)
				//console.log(target.username)
				if (!data) {
					interaction.reply("User hasn't been registered in the Key Bot Database!")
				}
			} catch (error) {
			console.log(error);
			}
		} else { 
		//If user doesn't specify a target
			try {
				const data = await profileModel.findOne({
					userID: interaction.user.id,
					serverID: interaction.guild.id,
				});
				console.log("Data for " + interaction.user.id + " found.")
				if (!data) {
					let newUser = profileModel.create({
						userID: interaction.user.id,
						serverID: interaction.guild.id,
						experience: 0,
						level: 1
					})
					console.log("User profile created on database.")
				}
			} catch (error) {
			console.log(error);
			}
		}
		var level;
		if(target) {
			try {
				const data = await profileModel.findOne({
					userID: target.id
				});
				if (data) {
					level = data.level
				}
				if (!data) {
					console.log("Unable to retrieve target user's level")
				}
			} catch (error) {
				console.log(error)
			}
		} else {
			try {
				const data = await profileModel.findOne({
					userID: interaction.user.id
				});
				if (data) {
					level = data.level
				}
				if (!data) {
					console.log("Unable to retrieve user's level")
				}
			} catch (error) {
				console.log(error)
			}
		}
		
		
		let expNeeded = 100;
		var userExp;
		for(let o = 1; o < level; o++) {
			expNeeded = expNeeded * 1.5
		}
		console.log("EXP Needed 1:" + expNeeded)
		if(target) {
			try {
				const data = await profileModel.findOne({
					userID: target.id
				});
				if (data) {
					// Testing purposes. Logs the MongoDB collection associated with user ID.
					//console.log(data) 
					level = data.level
					userExp = data.experience
					if(userExp > expNeeded) {
						profileModel.updateOne({userID: target.id,},
							{$inc: {level: 1}}).exec();
						userExp = userExp - expNeeded
						profileModel.updateOne({userID: target.id,},
							{$set: {experience: userExp}}).exec();
						level++;
						for(let y = level; y < level+1; y++) {
							expNeeded = expNeeded * 1.5
						}
						console.log("EXP Needed 2:" + expNeeded)
					}
					
				}
				if (!data) {
					console.log("Unable to retrieve document")
				}
			} 
			catch (error) {
				console.log(error)
			} 
		} else {
			try {
				const data = await profileModel.findOne({
					userID: interaction.user.id
				});
				if (data) {
					// Testing purposes. Logs the MongoDB collection associated with user ID.
					//console.log(data) 
					level = data.level
					userExp = data.experience
					if(userExp > expNeeded) {
						profileModel.updateOne({userID: interaction.user.id,},
							{$inc: {level: 1}}).exec();
						userExp = userExp - expNeeded
						profileModel.updateOne({userID: interaction.user.id,},
							{$set: {experience: userExp}}).exec();
						level++;
						for(let y = level; y < level+1; y++) {
							expNeeded = expNeeded * 1.5
						}
						console.log("EXP Needed " + expNeeded)
					}
					
				}
				if (!data) {
					console.log("Unable to retrieve document")
				}
			} 
			catch (error) {
				console.log(error)
			}
		}
		const canvas = Canvas.createCanvas(700, 250);
		var context = canvas.getContext('2d');
		const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/1114711289382588428/1133974711471198278/default.png');

		context.drawImage(background, 0, 0, canvas.width, canvas.height);
		context.strokeStyle = 'black';
		context.strokeRect(0, 0, canvas.width, canvas.height);

		// Color of stroke
		context.strokeStyle = "black";
		// Rectangle with the dimensions of the entire canvas
		context.lineWidth = 20;
		context.strokeRect(0, 0, canvas.width, canvas.height);
		/* Using undici to make HTTP requests for better performance
		const { body } = await request(interaction.user.displayAvatarURL({ extension: 'jpg' }));
		const avatar = await Canvas.loadImage(await body.arrayBuffer());
		*/
		var text = ''
		
		if(target) {
			text = target.username
		} else {
			text = interaction.member.displayName
		}
		console.log(text)
	
    	//context.fillText(interaction.user.name, 250, 125);
    	//context.fillText(interaction.user.username, 380, 125);
		
    	// Level
    	context.font = "20px \"Alien Encounters\""
    	context.fillStyle = "#FFFFFF";
    	context.fillText("Level: " + `${level}`, 250, 165);

   	 	// Exp
    	context.font = "20px \"Alien Encounters\""
    	context.fillStyle = "#FFFFFF";
    	context.fillText("Exp:" + `${userExp}`, 450, 165)
		context.font = "20px Arial"
		context.fillStyle = "#FFFFFF";
		context.fillText("/", 535, 165)
		context.font = "20px \"Alien Encounters\""
    	context.fillStyle = "#FFFFFF";
		context.fillText(`${expNeeded}`, 550, 165)

		//Default Font
		context.font = "50px \"Alien Encounters\"";
		context.fillStyle = "#FFFFFF";
		context.fillText(text, 250 , canvas.height / 2.2);

		for(var i = 0; i < 80; i++)  {
			context.beginPath()
			context.lineWidth = 18
			context.strokeStyle = "black"
			context.fillStyle = "black"
			context.arc(270 + (i * 4.32), 190, 8, 0, Math.PI * 2, true)
			context.stroke()
			context.fill()
		}
		var percentage = ((userExp/expNeeded) * (80))
		console.log("Percentage:" + percentage)
		for(var u = 0; u < percentage; u++)  {
			context.beginPath()
			context.lineWidth = 18
			context.strokeStyle = "blue"
			context.fillStyle = "blue"
			context.arc(270 + (u * 4.32), 190, 6, 0, Math.PI * 2, true)
			context.stroke()
			context.fill()   
		}
		// Pick up the pen
		context.beginPath();
		// Starts an arc to form a circle
		context.arc(125, 125, 100, 0, Math.PI * 2, true);
		// Clips off the region the pen drew on
		context.clip();
		var avatar;
		if(target) {
			avatar = await Canvas.loadImage(target.displayAvatarURL({ extension: 'jpg' }));
		} else {
			avatar = await Canvas.loadImage(interaction.user.displayAvatarURL({ extension: 'jpg' }));
		}
		context.drawImage(avatar, 25, 25, 200, 200);
		// Process file using attachment builder
		
		const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'profile-image.png' });
		
		interaction.reply({ files: [attachment] });
		
	}
};

//module.exports = {context}