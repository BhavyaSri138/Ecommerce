const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },

    password : {
        type : String,
        required : true,
        unique : false,
        trim : true,
        minlength : 6,
    }
}
)


const user = mongoose.model('user',userSchema)
module.exports = user;
