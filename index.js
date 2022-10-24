if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const session = require('express-session')
const passport = require('passport')
const User = require('./models/User')
const authRoutes = require("./routes/auth");
const mainRoutes = require("./routes/main");

const app = express()

//connection to database
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB connected');
}).catch((err)=>{
  console.log(err);
});

require('./config/passport')
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(path.join(`${__dirname}/puplic`)));
app.use(express.static(__dirname + '/views'));

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session()); 


app.use("/auth", authRoutes);
app.use("/", mainRoutes);

// app.use("/",passport.authenticate('jwt', { session: false }), mainRoutes);

// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.json({ error: err });
// });

app.listen(process.env.PORT || 5000 , () => {
  console.log(`Server running on port 5001`);
})