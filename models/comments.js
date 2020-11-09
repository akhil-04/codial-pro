const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        require: true
    },
    //comment belong to which user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User' 
    },
    //comment belong to which post
    Post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post' 
    },
},{
    timestamps:true
});

const comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;