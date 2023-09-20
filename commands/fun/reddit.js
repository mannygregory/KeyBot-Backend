const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('reddit')
		.setDescription('Sends a random post from Reddit!')
        .addSubcommand(subcommand => 
            subcommand
                .setName('getreddit')
                .setDescription('Sends a random post from Reddit!')
                .addStringOption(option =>
                    option.setName('subreddit')
                        .setDescription('Specify a SubReddit to get a post from')
                        .setRequired(false))),

	async execute(interaction) {

        var url = '';
        var subReddit = '';

        if(interaction.options.getSubcommand() == 'getreddit') {
            subReddit = interaction.options.getString('subreddit');
            url = `https://www.reddit.com/r/` + subReddit + '/random/.json'
        } 
        if(!subReddit) {
            url = `https://www.reddit.com/r/memes/random/.json`
        }

        async function meme() {
            
            
            await fetch(url)    
            .then(async r => {
                let meme = await r.json();
                let title = meme[0].data.children[0].data.title;
                let image = meme[0].data.children[0].data.url;
                let author = meme[0].data.children[0].data.author;
                let subRedditName = meme[0].data.children[0].data.subreddit;
                let permalink = 'https://www.reddit.com' + meme[0].data.children[0].data.permalink
                

                const embed = new EmbedBuilder()
                    .setColor("Blue")
                    .setDescription("From r/" + `${subRedditName}`)
                    .setTitle(`${title}`)
                    .setImage(`${image}`)
                    .setURL(`${permalink}`)
                    .setFooter({text: 'u/' + author})

            
                await interaction.reply({embeds: [embed]})
            })
		
	    }
        meme();
    }
}