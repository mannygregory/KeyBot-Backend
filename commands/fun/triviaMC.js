const { SlashCommandBuilder } = require('discord.js')
const { default: axios } = require('axios');
const {TimeoutEmbed, correctEmbedGen, IncorrectEmbed, TriviaMCEmbedGen, TriviaMCbuttonGen, TriviaAnswerSort} = require ('../../embeds/triviaEmbeds')
const profileModel = require('../../models/profileSchema') 
module.exports = {

    data: new SlashCommandBuilder()
        .setName('triviamc')
        .setDescription('Posts a random multiple-choice question from OpenTDB. Answer to earn EXP!')
        .addSubcommand(subcommand => 
            subcommand
                .setName('question')
                .setDescription('Posts a random multiple-choice question from OpenTDB. Answer to earn EXP!')
                .addStringOption(option =>
                    option.setName('category')
                        .setDescription('Specify a Trivia category:')
                        .setRequired(false))),

    async execute(interaction) {

        var ts_stat_cat = '';
        var url = ''
        var category = String(interaction.options.getString('category'));
        category = category.toLowerCase();

        //Checking categories if user specified a category
        switch(category) {
            case "art":
                url = 'https://opentdb.com/api.php?amount=10&category=25&type=multiple'
                ts_stat_cat = 'a'
                break;
            case "science":
                url = 'https://opentdb.com/api.php?amount=10&category=17'
                ts_stat_cat = 's'
                break;
            case "books":
                url = 'https://opentdb.com/api.php?amount=10&category=10'
                ts_stat_cat = 'e'
                break;
            case "music":
                url = 'https://opentdb.com/api.php?amount=10&category=12'
                ts_stat_cat = 'e'
                break;
            case "computers":
                url = 'https://opentdb.com/api.php?amount=10&category=18'
                ts_stat_cat = 'c'
                break;
            case "math":
                url = 'https://opentdb.com/api.php?amount=10&category=19'
                ts_stat_cat = 's'
                break;
            case "politics":
                url = 'https://opentdb.com/api.php?amount=10&category=24'
                ts_stat_cat = 'h'
                break;
            case "history":
                url = 'https://opentdb.com/api.php?amount=10&category=23'
                ts_stat_cat = 'h'
                break;
            case "geography":
                url = 'https://opentdb.com/api.php?amount=10&category=22'
                ts_stat_cat = 'g'
                break;
            case "sports":
                url = 'https://opentdb.com/api.php?amount=10&category=21'
                ts_stat_cat = 'sp'
                break;
            case "tv":
                url = 'https://opentdb.com/api.php?amount=10&category=14'
                ts_stat_cat = 'e'
                break;
            case "videogames":
                url = 'https://opentdb.com/api.php?amount=10&category=15' 
                ts_stat_cat = 'v'
                break;
            case "vehicles":
                url = 'https://opentdb.com/api.php?amount=10&category=28'
                break;
            default: 
                url = 'https://opentdb.com/api.php?amount=1&type=multiple'
                ts_stat_cat = 'nc'

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
                        ts_stat_cat = 'e';
                        break;
                    case ("Entertainment: Cartoon & Animations"):
                        ts_stat_cat = 'e';
                        break;
                    case ("Celebrities"):
                        ts_stat_cat = 'e';
                        break;
                    case ("Entertainment: Comics"):
                        ts_stat_cat = 'e';
                        break;
                    case ("Entertainment: Japanese Anime & Manga"):
                        ts_stat_cat = 'e';
                        break;
                    case ("Entertainment: Television"):
                        ts_stat_cat = 'e';
                        break;
                    case ("Entertainment: Film"):
                        ts_stat_cat = 'e';
                        break;
                    case ("Entertainment: Musicals & Theatres"):
                        ts_stat_cat = 'e';
                        break;
                    case ("Entertainment: Video Games"):
                        ts_stat_cat = 'vg';
                        break;
                    case ("Entertainment: Board Games"):
                        ts_stat_cat = 'vg';
                        break;
                    case ("History"):
                        ts_stat_cat = 'h';
                        break;
                    case ("Mythology"):
                        ts_stat_cat = 'h';
                        break;
                    case ("Politics"):
                        ts_stat_cat = 'h';
                        break;
                    case ("Geography"):
                        ts_stat_cat = 'g';
                        break;
                    case ("Science & Nature"):
                        ts_stat_cat = 's'
                        break;
                    case ("Animals"):
                        ts_stat_cat = 's'
                        break;
                    case ("Science: Mathematics"):
                        ts_stat_cat = 's'
                        break;
                    case ("Science: Gadgets"):
                        ts_stat_cat = 's'
                        break;
                    case ("Science: Computers"):
                        ts_stat_cat = 'c'
                        break;
                    case ("Sports"):
                        ts_stat_cat = 'sp'
                        break;
                    case ("Art"):
                        ts_stat_cat = 'a'
                        break;
                    default:
                        break;
                }

                for (let i = 0; i < res.data.results[0].incorrect_answers.length; i++) {
                    answers.push(res.data.results[0].incorrect_answers[i]);
                }
                answers.push(res.data.results[0].correct_answer); 
                answers = TriviaAnswerSort(answers);
                
                //Answer formatting
                for (let i = 0; i < answers.length; i++) {
                        answers[i] = answers[i].replaceAll("&quot;","\"" )
                        answers[i] = answers[i].replaceAll("&#039;","\'")

                }
                
                // Global variables for interactionCreate.js to reference
                global.correct_answer = res.data.results[0].correct_answer;
                global.gotCorrect = null;
                    
                const row = TriviaMCbuttonGen(answers[0], answers[1], answers[2], answers[3]);
                
                function DetermineAnswer(res, ts_stat_cat){
                    console.log("TS Stat: " + ts_stat_cat)
                    if (res === true){
                        var points = 0;
                        if (difficulty === 'easy'){ points = 7;}
                        else if (difficulty === 'medium'){points = 12;}
                        else if (difficulty === 'hard'){points = 20;}
                        profileModel.updateOne({userID: interaction.user.id,},
                            {$inc: {experience: points}}).exec()
                        profileModel.updateOne({userID: interaction.user.id,},
                            {$inc: {'triviaStats.numCorrect': 1}}).exec();
                        switch(ts_stat_cat) {
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
                        const TriviaEmbed = TriviaMCEmbedGen(category, "Easy", question, answers[0], answers[1], answers[2], answers[3])
                        TriviaEmbed.setColor('Green')
                        interaction.reply({embeds:[TriviaEmbed], components: [row]});
                    }
                    else if (difficulty === 'medium'){
                        const TriviaEmbed = TriviaMCEmbedGen(category, "Medium", question, answers[0], answers[1], answers[2], answers[3])
                        TriviaEmbed.setColor('Yellow')
                        interaction.reply({embeds:[TriviaEmbed], components: [row]});
                    }
                    else if (difficulty === 'hard'){
                        const TriviaEmbed = TriviaMCEmbedGen(category, "Hard", question, answers[0], answers[1], answers[2], answers[3])
                        TriviaEmbed.setColor('Red')
                        interaction.reply({embeds:[TriviaEmbed], components: [row]});
                    }
                    setTimeout(()=>{
                        DetermineAnswer(gotCorrect,ts_stat_cat)
                    }, AnswerTime)


                })
                .catch((err) => {
                    interaction.reply("There was an error trying to retrieve the trivia question. Please try again!")
                    console.log('ERROR:', err);
                    return;
                })
            }
    }