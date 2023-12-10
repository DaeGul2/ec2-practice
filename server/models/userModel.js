const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username cannot ba blank'],
        unique: true
    },
    key: {//해시된 비밀번호가 저장됨
        type: String,
        required: [true, 'Password cannot ba blank']
    },
    is_select:{
        type: Number,
        default:0
    }
    ,
    my_select: {
        type: String,
        default: ""
    },
    choose_me:{
        type: String,
        default: ""
    }

});

module.exports = mongoose.model('User', userSchema);