const mongoose = require("mongoose");
const bcrypt=require("bcryptjs");
const verificationTokenSchema = new mongoose.Schema({
  owner:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required:true
  },
  token:{
      type:String,
      required:true
  },
  createdAt:{
      type:Date,
      expires: 3600,
      default: Date.now()
  }
});

verificationTokenSchema.methods.matchToken=async function(enteredToken){
  return await bcrypt.compareSync(enteredToken,this.token);
}

// pre means before saving we should add a function over here to encrypt the password using bcrypt.js library of node js
verificationTokenSchema.pre("save",async function(next){
  if(!this.isModified){
    next();
  }
    //A salt is a random string that makes the hash unpredictable. Bcrypt is a popular and trusted method for salt and hashing passwords.
    const salt=await bcrypt.genSalt(10);
    this.token= await bcrypt.hash(this.token,salt);
  
})

const User = mongoose.model("VerificationToken", verificationTokenSchema);

module.exports = User;