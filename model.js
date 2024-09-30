const mongoose=require("mongoose");
const schema = mongoose.Schema({
//Write missing code here

title: {
    type: String,
    required: true,
    trim: true
},
content: {
    type: String,
    required: true
},
author: {
    type: String,
    required: true
},
created_at: {
    type: Date,
    default: Date.now
},
updated_at: {
    type: Date,
    default: Date.now
}
});


schema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});


const Blog = mongoose.model("Blog", schema);

module.exports = Blog; 