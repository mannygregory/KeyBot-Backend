const { SlashCommandBuilder,AttachmentBuilder } = require('discord.js');
const mongoose = require('mongoose');
const profileModel = require('../../models/profileSchema') 
const assetModel = require('../../models/assetSchema')
const {profileBannerEmbedGen} = require('../../embeds/profileEmbed')
const fontList = require('font-list')
/*
var fontArr = []
fontList.getFonts()
  .then(fonts => {
    for(var i = 0; i < 1; i++) {
      fontArr[i] = fonts
      console.log(fontArr[i])
    }
    //console.log(JSON.stringify(fonts))
  })
  .catch(err => {
    console.log(err)
  })
*/

module.exports = {
	data: new SlashCommandBuilder()
		.setName('editprofile')
		.setDescription('Displays the customization options for a user\'s profile.')
        .addSubcommand(subcommand => 
            subcommand
                .setName('banner')
                .setDescription('Change the banner for your profile card.')
                .addStringOption(option =>
                    option.setName('banner')
                        .setDescription('Change the banner for your profile card.')
                        .setRequired(false)))
        .addSubcommand(subcommand => 
            subcommand
                .setName('font')
                .setDescription('Change the font for your profile card.')
                .addStringOption(option =>
                    option.setName('font')
                        .setDescription('Change the font for your profile card.')
                        .setRequired(false)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('steamurl')
                .setDescription('Upload a Steam URL to be displayed on your Key Bot stat\'s card')
                .addStringOption(option =>
                    option.setName('url')
                        .setDescription('Change the Steam URL for your Key Bot stat\'s card.')
                        .setRequired(false))),
	async execute(interaction) {

        var option_font = (interaction.options.getString('font'));
        var option_banner = (interaction.options.getString('banner'))
        var option_steamURL = (interaction.options.getString('url'))

        if (option_steamURL) {
            console.log(option_steamURL)
            if(!(option_steamURL.includes("steamcommunity.com/profiles/"))) {
                await interaction.reply({content:"Your Steam URL is invalid!", ephermal: true})
            } else if (option_steamURL.includes("steamcommunity.com/profiles/")){
            try {
            profileModel.updateOne({userID: interaction.user.id,},
                {$set: {"pf_Steam_URL": option_steamURL}}).exec();
            } catch (error) {
                console.log(error)
            }
            interaction.reply({content:"Your Steam URL is now displayed on your Key Bot stat\'s card", ephermal: true})
        }
        }
        
        if (option_banner) {
            try {
                const data = await assetModel.findOne({
                    ID: "Keybot-Assets"
                });
                let arrNum = await assetModel.aggregate()
                .match({ID: "Keybot-Assets"})
                .project({Banners: {$size: '$Banners'}})
                
                let bannerNum = arrNum[0]
                const bannerLength = bannerNum.Banners;
                let banners = []
                let bannerType= [] 
                let bannerID = [] 
                let bannerURL = []
                for(var i = 0; i < bannerLength; i++) {
                    banners.push(data.Banners[i])
                    let bannerObj = banners[i]
                    bannerObj = bannerObj.split(" ")
                    bannerType[i] = bannerObj[0]
                    bannerID[i] = bannerObj[1]
                    bannerURL[i] = bannerObj[2]
                    console.log(bannerType[i] + bannerID[i] + bannerURL[i])   
                }
                const profileCustom = profileBannerEmbedGen(bannerType, bannerID, bannerLength)
                interaction.reply({embeds:[profileCustom], components: [], ephermal:true})
                if (!data) {
                    console.log("No data found.");
                    
                }
                } catch (error) {
                    console.log(error);
                    interaction.reply("Select one of the options to customize your Key Bot profile card.")
                }
        }
        if(option_font) {
            try {
                interaction.user.send("Key Bot supports the all fonts native to Node JS: ")
            } catch (error) {
                console.log(error)
            }
        }
        
        if((!option_banner) && (!option_font) && (!option_steamURL))
        interaction.reply({content:"Select a profile customization option.", ephermal: true})
    } 
}
