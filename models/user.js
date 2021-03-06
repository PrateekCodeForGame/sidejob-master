var mongoose = require('mongoose');
var util = require('../config/util.js');

var UserSchema = mongoose.Schema({
    user: String,
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    general_job: String,
    specific_job: String,
    phone: String,
    jobs_created: String,
    jobs_completed: String,
    password: String,
    ZIP: String,
    avatar: String,
    summary: String,
    skills: String,
    workimages: String,
    job: String,
    conversations: [],
    dob: {
        day: String,
        month: String,
        year: String
    },
    lastConnection: {
        type: Date,
        default: Date.now
    },
    facebook: {
        id: String,
        email: String,
        token: String,
        name: String
    },
    google: {
        id: String,
        email: String,
        token: String,
        name: String
    }
});

UserSchema.methods = {

    authenticate: function(plainText) {
        return plainText == this.password;
    }

};

mongoose.model('User', UserSchema);
