const { EmbedBuilder } = require('discord.js');
const e = require('express');

function userStatsEmbedGen(target, username, userAvatar, numCorrect, numScience, numHistory, numEntertainment, numSports, numGeography, numVB, numComputers, numArt, userSteamURL) {
    console.log("Target " + target)
    var statEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(username + "\'s" + " Trivia Statistics")
        .setThumbnail(userAvatar)
        .setAuthor({ name: 'Key Bot', iconURL: 'https://cdn.discordapp.com/attachments/1114711289382588428/1136887248919470120/images.png', url: 'https://discord.js.org' })
        .addFields(
            {name: "Total Number of Right Answers: :trophy: ", value: String(numCorrect)},
            {name: "Science: :test_tube: ", value: String(numScience)},
            {name: "History: :scroll: ", value: String(numHistory)},
            {name: "Entertainment: :tv: ", value: String(numEntertainment)},
            {name: "Sports: :football: ", value: String(numSports)},
            {name: "Geography: :earth_americas: ", value: String(numGeography)},
            {name: "Videogames and Boardgames: :video_game:", value: String(numVB)},
            {name: "Computers: :computer: ", value: String(numComputers)},
            {name: "Art: :art: ", value: String(numArt)}
        )
        .setTimestamp()
        if(userSteamURL) {
            statEmbed.setFooter({text: 'Steam URL: '+ userSteamURL, iconURL: 'https://i.imgur.com/lN9wLrE.jpeg'});
        } 
        
        
            
        
    return statEmbed
}
function profileBannerEmbedGen(bannerType, bannerID, bannerLength) {
    //console.log(bannerType)
    //console.log(bannerID)
    var profileBannerEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle("Profile Customization Menu: Choose a Banner")
    .setDescription("**" + "Key Bot Supports " + bannerLength + " profile card backgrounds!"  + "**")
    .setAuthor({ name: 'Key Bot', iconURL: 'https://cdn.discordapp.com/attachments/1114711289382588428/1136887248919470120/images.png', url: 'https://discord.js.org' })
    
    for(var i = 0; i < bannerLength; i++) {
        if(bannerType[i] == "Default:") {
            if(i == 0) {
                profileBannerEmbed.addFields({name: "Default Backgrounds: :coin:",value: " "})
            }
            profileBannerEmbed.addFields({name:"⦁ " + bannerID[i], value: " "})
        }
        if(bannerType[i] == "Videogames:") {
            if(bannerType[i-1] != "Videogames:") {
                profileBannerEmbed.addFields({name: "Videogame Backgrounds: :video_game:",value: " "})
            }
            profileBannerEmbed.addFields({name:"⦁ " + bannerID[i], value: " "})
        }
        if(bannerType[i] == "Nature:") {
            if(bannerType[i-1] != "Nature:") {
                profileBannerEmbed.addFields({name: "Nature Backgrounds: :mountain:",value: " "})
            }
            profileBannerEmbed.addFields({name:"⦁ " + bannerID[i], value: " "})
        }
    }
    
   return profileBannerEmbed
}
/*
function profileFontEmbedGen() {
    var profileFontEmbed = new EmbedBuilder(fontLength)
    .setColor(0x0099FF)
    .setTitle("Profile Customization Menu: Choose a Font")
    .setAuthor({ name: 'Key Bot', iconURL: 'https://cdn.discordapp.com/attachments/1114711289382588428/1136887248919470120/images.png', url: 'https://discord.js.org' })



}
*/
module.exports = {userStatsEmbedGen, profileBannerEmbedGen}