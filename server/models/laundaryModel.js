const mongoose = require('mongoose');


const keySchema = new mongoose.Schema({
    // 여기에 key 스키마의 필드를 정의합니다.
    // 예를 들어, keyName, keyValue 등을 가정하겠습니다.
    laundaryName: {
        type: String,
        required: true
    },
    currentUser: {
        type: String,
        required: true
    },
    isRunning: {
        type: Number,
        default: 0
    },

    startTime: {
        type: Date,
        default: Date.now
    }
    // 추가 필드가 있다면 여기에 추가할 수 있습니다.
});



const laundarySchema = new mongoose.Schema({

    laundary: {
        type: [keySchema] 
    }
});

module.exports = mongoose.model('Laundary', laundarySchema);
