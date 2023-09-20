const { SlashCommandBuilder } = require('@discordjs/builders');
const mongoose = require('mongoose');
const profileModel = require('../../models/profileSchema') 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Registers a user in Key Bots MongoDB database'),
    async execute(interaction) {
        try {
            const data = await profileModel.findOne({
                userID: interaction.user.id,
                serverID: interaction.guild.id,
            });
            if (!data) {
                profileModel.create({
                    userID: interaction.user.id,
                    serverID: interaction.guild.id
                });
                interaction.reply({content: "Successfully registed in the KeyBot database.", ephemeral: true});
            }
            if (data) {
                interaction.reply({content: "You are already registered!", ephemeral: true});
            }
        } catch (error) {
        console.log(error);
    }
}   

}
