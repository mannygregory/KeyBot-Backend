const mongoose = require('mongoose')

const assetSchema = new mongoose.Schema({
    ID: {
        type: String,
        require: true
    },
    Banners: {
        type: Array,
        require: true
    }
})

const assetModel = mongoose.model('keybot-assets', assetSchema);
module.exports = assetModel; 