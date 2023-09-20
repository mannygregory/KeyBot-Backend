const { SlashCommandBuilder } = require('discord.js')
const { default: axios } = require('axios');
const {TimeoutEmbed, correctEmbedGen, IncorrectEmbed, TriviaTFbuttonGen, TriviaTFEmbedGen} = require ('../../embeds/triviaEmbeds')
const profileModel = require('../../models/profileSchema') 
module.exports = {

    data: new SlashCommandBuilder()
        .setName('triviatf')
        .setDescription('Posts a random true or false question from OpenTDB. Answer to earn EXP!')
        .addSubcommand(subcommand => 
            subcommand
                .setName('question')
                .setDescription('Posts a random true or false question from OpenTDB. Answer to earn EXP!')
                .addStringOption(option =>
                    option.setName('category')
                        .setDescription('Specify a Trivia category:')
                        .setRequired(false))),

    async execute(interaction) {

        var trivia_stat_cat = '';
        var url = ''
        var category = String(interaction.options.getString('category'));
        category = category.toLowerCase();

        //Checking categories if user specified a category
        switch(category) {
            case "art":
                url = 'https://opentdb.com/api.php?amount=10&category=25&type=boolean'
                trivia_stat_cat = 'a'
                break;
            case "science":
                url = 'https://opentdb.com/api.php?amount=10&category=17&type=boolean'
                trivia_stat_cat = 's'
                break;
            case "books":
                url = 'https://opentdb.com/api.php?amount=10&category=10&type=boolean'
                trivia_stat_cat = 'e'
                break;
            case "music":
                url = 'https://opentdb.com/api.php?amount=10&category=12&type=boolean'
                trivia_stat_cat = 'e'
                break;
            case "computers":
                url = 'https://opentdb.com/api.php?amount=10&category=18&type=boolean'
                trivia_stat_cat = 'c'
                break;
            case "math":
                url = 'https://opentdb.com/api.php?amount=10&category=19&type=boolean'
                trivia_stat_cat = 's'
                break;
            case "politics":
                url = 'https://opentdb.com/api.php?amount=10&category=24&type=boolean'
                trivia_stat_cat = 'h'
                break;
            case "history":
                url = 'https://opentdb.com/api.php?amount=10&category=23&type=boolean'
                trivia_stat_cat = 'h'
                break;
            case "geography":
                url = 'https://opentdb.com/api.php?amount=10&category=23&type=boolean'
                ts_stat_cat = 'g'
                break;
            case "sports":
                url = 'https://opentdb.com/api.php?amount=10&category=21&type=boolean'
                trivia_stat_cat = 'sp'
                break;
            case "tv":
                url = 'https://opentdb.com/api.php?amount=10&category=14&type=boolean'
                trivia_stat_cat = 'e'
                break;
            case "videogames":
                url = 'https://opentdb.com/api.php?amount=10&category=15&type=boolean' 
                trivia_stat_cat = 'v'
                break;
            case "vehicles":
                url = 'https://opentdb.com/api.php?amount=10&category=28&type=boolean'
                break;
            default: 
                url = 'https://opentdb.com/api.php?amount=1&type=boolean'
                trivia_stat_cat = 'nc'
        }

        await axios.get(url)
            .then((res) => {
                    
                
                console.log(res.data.results[0]);
                let AnswerTime = 10000;
                let answers = [];
                let difficulty = res.data.results[0].difficulty;
                const category = res.data.results[0].category;
                let question = res.data.results[0].question;
                //Question Formatting
                question = question.replaceAll("&quot;","\"" )
                question = question.replaceAll("&#039;","\'")

                //Checking categories if user did not specify a category
                switch(category) {
                    case ("Entertainment: Books"):
                        trivia_stat_cat = 'e';
                        break;
                    case ("Entertainment: Cartoon & Animations"):
                        trivia_stat_cat = 'e';
                        break;
                    case ("Celebrities"):
                        trivia_stat_cat = 'e';
                        break;
                    case ("Entertainment: Comics"):
                        trivia_stat_cat = 'e';
                        break;
                    case ("Entertainment: Japanese Anime & Manga"):
                        trivia_stat_cat = 'e';
                        break;
                    case ("Entertainment: Television"):
                        trivia_stat_cat = 'e';
                        break;
                    case ("Entertainment: Film"):
                        trivia_stat_cat = 'e';
                        break;
                    case ("Entertainment: Musicals & Theatres"):
                        trivia_stat_cat = 'e';
                        break;
                    case ("Entertainment: Video Games"):
                        trivia_stat_cat = 'vg';
                        break;
                    case ("Entertainment: Board Games"):
                        trivia_stat_cat = 'vg';
                        break;
                    case ("History"):
                        trivia_stat_cat = 'h';
                        break;
                    case ("Mythology"):
                        trivia_stat_cat = 'h';
                        break;
                    case ("Politics"):
                        trivia_stat_cat = 'h';
                        break;
                    case ("Geography"):
                        trivia_stat_cat = 'g';
                        break;
                    case ("Science & Nature"):
                        trivia_stat_cat = 's'
                        break;
                    case ("Animals"):
                        trivia_stat_cat = 's'
                        break;
                    case ("Science: Mathematics"):
                        trivia_stat_cat = 's'
                        break;
                    case ("Science: Gadgets"):
                        trivia_stat_cat = 's'
                        break;
                    case ("Science: Computers"):
                        trivia_stat_cat = 'c'
                        break;
                    case ("Sports"):
                        trivia_stat_cat = 'sp'
                        break;
                    case ("Art"):
                        trivia_stat_cat = 'a'
                        break;
                    default:
                        break;
                }
                var Label_1 = ''
                var Label_2 = ''
                for (let i = 0; i < res.data.results[0].incorrect_answers.length; i++) {
                    answers.push(res.data.results[0].incorrect_answers[i]);
                }
                answers.push(res.data.results[0].correct_answer);
                
                if(answers[0] == 'True') {
                    Label_1 = "T"
                    Label_2 = "F"
                } else {
                    answers[0] = 'True'
                    answers[1] = 'False'
                    Label_1 = "T"
                    Label_2 = "F"
                } 
                /*
                console.log(answers)
                console.log(Label_1, Label_2)
                console.log(ts_stat_cat)
                */
                // Global variables for interactionCreate.js to reference
                global.correct_answer = res.data.results[0].correct_answer;
                global.gotCorrect = null;
                
                const row = TriviaTFbuttonGen(answers[0], answers[1], Label_1, Label_2);

                function DetermineAnswer(res, ts){
                    ts = trivia_stat_cat
                    console.log("TS Stat: " + ts)
                    if (res === true){
                        var points = 0;
                        if (difficulty === 'easy'){ points = 7;}
                        else if (difficulty === 'medium'){points = 12;}
                        else if (difficulty === 'hard'){points = 20;}
                        profileModel.updateOne({userID: interaction.user.id,},
                            {$inc: {experience: points}}).exec()
                        profileModel.updateOne({userID: interaction.user.id,},
                            {$inc: {'triviaStats.numCorrect': 1}}).exec();
                        switch(ts) {
                            case 's':
                                profileModel.updateOne({userID: interaction.user.id,},
                                    {$inc: {'triviaStats.scienceNum': 1}}).exec();
                                break;
                            case 'h':
                                profileModel.updateOne({userID: interaction.user.id,},
                                    {$inc: {'triviaStats.historyNum': 1}}).exec();
                                break;
                            case 'e': 
                                profileModel.updateOne({userID: interaction.user.id,},
                                    {$inc: {'triviaStats.entertainmentNum': 1}}).exec();
                                break;
                            case 'sp':
                                profileModel.updateOne({userID: interaction.user.id,},
                                    {$inc: {'triviaStats.sportsNum': 1}}).exec();
                                break;
                            case 'vg':
                                profileModel.updateOne({userID: interaction.user.id,},
                                    {$inc: {'triviaStats.videogameNum': 1}}).exec();
                                break;
                            case 'g':
                                profileModel.updateOne({userID: interaction.user.id,},
                                    {$inc: {'triviaStats.geographyNum': 1}}).exec();
                                break;
                            case 'c':
                                profileModel.updateOne({userID: interaction.user.id,},
                                    {$inc: {'triviaStats.computerNum': 1}}).exec();
                                break;
                            case 'a':
                                profileModel.updateOne({userID: interaction.user.id,},
                                    {$inc: {'triviaStats.artNum': 1}}).exec();
                                break;
                            default:
                                break;
                        }
                        const CorrectEmbed = correctEmbedGen(points);
                        interaction.editReply({embeds:[CorrectEmbed], components: []});
                    }
                        
                    else if(res === false){
                        interaction.editReply({embeds:[IncorrectEmbed], components: []});
                    }
                    else{
                        interaction.editReply({embeds:[TimeoutEmbed], components: []});
                    }
                }
                    if (difficulty === 'easy'){
                        const TriviaEmbed = TriviaTFEmbedGen(category, "Easy", question, answers[0], answers[1])
                        TriviaEmbed.setColor('Green')
                        interaction.reply({embeds:[TriviaEmbed], components: [row]});
                    }
                    else if (difficulty === 'medium'){
                        const TriviaEmbed = TriviaTFEmbedGen(category, "Medium", question, answers[0], answers[1])
                        TriviaEmbed.setColor('Yellow')
                        interaction.reply({embeds:[TriviaEmbed], components: [row]});
                    }
                    else if (difficulty === 'hard'){
                        const TriviaEmbed = TriviaTFEmbedGen(category, "Hard", question, answers[0], answers[1])
                        TriviaEmbed.setColor('Red')
                        interaction.reply({embeds:[TriviaEmbed], components: [row]});
                    }
                    setTimeout(()=>{
                        DetermineAnswer(gotCorrect)
                    }, AnswerTime)


                })
                .catch((err) => {
                    interaction.reply("There was an error trying to retrieve the trivia question. Please try again!")
                    console.log('ERROR:', err);
                    return;
                })
            }
    }
    