const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')

function TriviaMCbuttonGen(answer1, answer2, answer3, answer4) {
    var button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(answer1 + ' -trivMC')
                .setLabel('1')
                .setStyle('Success')
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId(answer2 + ' -trivMC')
                .setLabel('2')
                .setStyle('Success')
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId(answer3 + ' -trivMC')
                .setLabel('3')
                .setStyle('Success')
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId(answer4 + ' -trivMC')
                .setLabel('4')
                .setStyle('Success')
                .setDisabled(false),
        );
        return button;
}
function TriviaTFbuttonGen(answer1, answer2, Label_1, Label_2) {
    var button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(answer1 + ' -trivTF')
                .setLabel(Label_1)
                .setStyle('Success')
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId(answer2 + ' -trivTF')
                .setLabel(Label_2)
                .setStyle('Success')
                .setDisabled(false),
            
        );
        return button;
}
function CategoryEmojiGen(category) {
    var emoji = '';
    switch(category) {
        case 'Science & Nature':
            emoji = ':test_tube:'
            break;
        case 'Entertainment: Books':
            emoji = ':book:'
            break;
        case 'Entertainment: Film':
            emoji = ':movie_camera:'
            break;
        case 'Entertainment: Music':
            emoji = ':musical_keyboard:'
            break;
        case 'Entertainment: Musicals & Theatres':
            emoji = ':performing_arts:'
            break;
        case 'Entertainment: Television':
            emoji = ':tv:'
            break;
        case 'Entertainment: Video Games':
            emoji = ':video_game:'
            break;
        case 'Entertainment: Board Games':
            emoji = ':game_die:'
            break;
        case 'Science: Computers':
            emoji = ':computer:'
            break;
        case 'Science: Mathematics':
            emoji = ':heavy_plus_sign:'
            break;
        case 'Mythology':
            emoji = ':fairy:'
            break;
        case 'Sports':
            emoji = ':football:'
            break;
        case 'Geography':
            emoji = ':globe_with_meridians:'
            break;
        case 'History':
            emoji = ':scroll:'
            break;
        case 'Politics':
            emoji = ':judge:'
            break;
        case 'Art':
            emoji = ':art:'
            break;
        case 'Celebrities':
            emoji = ':woman:'
            break;
        case 'Animals':
            emoji = ':tiger:'
            break;
        case 'Vehicles':
            emoji = ':red_car:'
            break;
        case 'Entertainment: Comics':
            emoji = ':superhero:'
            break;
        case 'Science: Gadgets':
            emoji = ':mobile_phone: '
            break;
        case 'Entertainment: Japanese Anime & Manga':
            emoji = ':japanese_goblin:'
            break;
        case 'Entertainment: Cartoon & Animations':
            emoji = ':tv:'
            break;
        default:
            emoji = ':brain:'
            break;
    }
    return emoji;
}
function TriviaMCEmbedGen(category, difficulty, question, answer1, answer2, answer3, answer4) {
    var questionEmbed = new EmbedBuilder()
        .setTitle('Trivia Question!')
        .setColor('#000000')
        .addFields(
            { name: 'Category: ', value: category + ' ' + CategoryEmojiGen(category)},
            { name: 'Difficulty: ', value: difficulty },
            { name: 'Question: ', value: question },
            { name: ':one: ', value: answer1},
            { name: ':two: ', value: answer2},
            { name: ':three: ', value: answer3},
            { name: ':four: ', value: answer4},
    ); 
    return questionEmbed;
}
function TriviaTFEmbedGen(category, difficulty, question, answer1, answer2) {
    var value_1 = ''
    var value_2 = ''
    if(answer1 == "True") {
        value_1 = "True"
        value_2 = "False"
        var questionEmbed = new EmbedBuilder()
        .setTitle('Trivia Question!')
        .setColor('#000000')
        .addFields(
            { name: 'Category: ', value: category + ' ' + CategoryEmojiGen(category)},
            { name: 'Difficulty: ', value: difficulty },
            { name: 'Question: ', value: question },
            { name: ':regional_indicator_t:  ', value: value_1},
            { name: ':regional_indicator_f:  ', value: value_2},
        ); 
        return questionEmbed;
    } else {
        value_1 = "False"
        value_2 = "True"
        var questionEmbed = new EmbedBuilder()
        .setTitle('Trivia Question!')
        .setColor('#000000')
        .addFields(
            { name: 'Category: ', value: category + ' ' + CategoryEmojiGen(category)},
            { name: 'Difficulty: ', value: difficulty },
            { name: 'Question: ', value: question },
            { name: ':regional_indicator_t:  ', value: value_2},
            { name: ':regional_indicator_f:  ', value: value_1},
        ); 
        return questionEmbed;
    } 
}
function correctEmbedGen(points){
    const CorrectEmbed = new EmbedBuilder()
    .setColor("Green")
    .setTitle(":brain: Correct! :brain:")
    .setDescription("Correct! You got the question right and earned " + points + " EXP!")
	return CorrectEmbed;
}
const TimeoutEmbed = new EmbedBuilder()
	.setColor("Orange")
	.setTitle(":hourglass: Timed Out! :hourglass:")
	.setDescription("You didn't answer the question in time. Please try again!");
const IncorrectEmbed = new EmbedBuilder()
    .setColor("Red")
    .setTitle(":x: Incorrect! :x:")
    .setDescription("You got this question wrong. Try again!")

function TriviaAnswerSort(arr){ 
        for (let i = arr.length -1; i > 0; i--){
            const j = Math.floor(Math.random() * i);
            let k = arr[i];
            arr[i] = arr[j];
            arr[j] = k;
        }
        return arr;
}

module.exports = {TriviaMCbuttonGen, TriviaTFbuttonGen, TriviaMCEmbedGen, TriviaTFEmbedGen, correctEmbedGen, IncorrectEmbed, TimeoutEmbed, TriviaAnswerSort}