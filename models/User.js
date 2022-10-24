const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({
    userid: String,
    token: String,
    name: String,
    gender: String,
    avatar: String,
    provider: String
},
  {timestamps: true}
);

// UserSchema.pre(
//   'save',
//   async function(next) {
//     const user = this;
//     const hash = await bcrypt.hash(this.password, 10);

//     this.password = hash;
//     next();
//   }
// );

// UserSchema.methods.isValidPassword = async function(password) {
//   const user = this;
//   const compare = await bcrypt.compare(password, user.password);

//   return compare;
// }
 

module.exports = mongoose.model("User", UserSchema);