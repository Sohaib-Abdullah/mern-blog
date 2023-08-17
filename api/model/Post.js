const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        unique: true
    },
    desc: {
        type:String,
        required:true
    },
    photo: {
        type: String,
        required: false
    },
    likes: {
        type: Array,
        default:[],
    },
    username: {
        type:String,
        required:true
    },
    categories: {
        type:Array,
        required:false
    },
    comments :[{
        text: String,
        created: {type: Date, default: Date.now},
        postedBy:{ type: ObjectId, ref: "User"},
        replies: [
            {
              userId: { type: ObjectId, ref: "User" },
              message: String,
            },
        ],
        // replies: [{userId: ObjectId, message: String}]
    }],
    // postedBy: {
    //     type: ObjectId,
    //     ref: "User"
    // },
  
},
{timestamps: true}
);

module.exports = mongoose.model("Post", PostSchema);