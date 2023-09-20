const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    userID: {
        type: String, 
        require: true, 
        unique: true
    },
    serverID: {
        type: String, 
        require: true
    },
    experience: {
        type: Number, 
        require: true,
        default: 0
    },
    level: {
        type: Number,
        require: true,
        default: 1
    },
    pf_BG_Selection: {
        type: String,
        require: true,
        default: 'default'
    },
    pf_Steam_URL: {
        type: String,
        require: true,
        default: ' '
    },
    triviaStats: {
        numCorrect: {
            type: Number,
            require: true,
            default: 0
        },
        scienceNum: {
            type: Number,
            require: true,
            default: 0
        },
        historyNum: {
            type: Number,
            require: true,
            default: 0
        },
        entertainmentNum: {
            type: Number,
            require: true,
            default: 0
        },
        sportsNum: {
            type: Number,
            require: true,
            default: 0
        },
        geographyNum: {
            type: Number,
            require: true,
            default: 0
        },
        videogameNum: {
            type: Number,
            require: true,
            default: 0
        },
        computerNum: {
            type: Number,
            require: true,
            default: 0
        },
        artNum: {
            type: Number,
            require: true,
            default: 0
        }
    }

});

const profileModel = mongoose.model('userprofile', profileSchema);
module.exports = profileModel; 