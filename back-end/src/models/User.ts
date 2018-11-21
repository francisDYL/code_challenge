
import bcrypt from "bcrypt"
import mongoose from "mongoose"


  const UserSchema  = new mongoose.Schema({
    email : {
      type : String,
      required : true,
      unique : true
    },
    password : {
        type:String,
        required:true
    },
  },{ timestamps: true });
 
UserSchema.pre('save', async function(next){
  //'this' refers to the current document about to be saved
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});


UserSchema.methods.isValidPassword = async function(candidate, password){
  const isMatch =  await bcrypt.compare(candidate,password);
  return isMatch;
}

const User = mongoose.model('user',UserSchema);

export default User;