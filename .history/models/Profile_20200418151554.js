const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.T
        ref: 'user'
    }
});