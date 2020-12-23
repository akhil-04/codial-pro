const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId
    },
    //this defines the objectId of like object
    likeable:{
        type:mongoose.Schema.ObjectId,
        require:true,
        refPath: 'onModel'
    },
    //used for defining the type of the liked object since it is a dynamic refrence
    onModel:{
        type:String,
        required:true,
        enum:['Post', 'Comment']
    }
},{
    timestamps:true
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;