const mongoose = require( 'mongoose' );

const chatmessageSchema   = new mongoose.Schema({
    content:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    email:{
        type:String
    }
},{
    timestamps:true
});



const chatMessage = mongoose.model('chatMessage', chatmessageSchema);

module.exports = chatMessage;