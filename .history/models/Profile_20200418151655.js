const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    company: {
        type : String
    },
    company: {
        type : String
    },
    company: {
        type : String
    }
});