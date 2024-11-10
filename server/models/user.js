const mongoose = require('mongoose');
const crypto = require('crypto');
const {v1: uuidv1} = require('uuid');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: String,
},{
    timestamps: true
});

//virtual field
userSchema.virtual('password')
    .set(function(password){
        this._password = password;
        this.salt = uuidv1();
        this.hashedPassword = this.encryptPassword(password);
})

//methods
userSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashedPassword;
    },
    encryptPassword: function(password){
        if(!password) return '';
        try{
            return crypto.createHmac('sha256', this.salt)
                .update(password)
                .digest('hex');
        } catch(err){
            throw err; 
        }
    }
}
module.exports = mongoose.model('User', userSchema);

