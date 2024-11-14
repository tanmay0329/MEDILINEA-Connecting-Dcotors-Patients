const mongoose = require('mongoose');

function connectToDB(url){
    return mongoose.connect(url);
}

module.exports = {connectToDB}