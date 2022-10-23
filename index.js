if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose') 
const cors = require('cors')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
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

const initializePassport = require('./config/passport')
initializePassport(passport)

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.use("/auth", authRoutes);
app.use("/", mainRoutes);

app.listen(process.env.PORT || 5000 , () => {
  console.log(`Server running on port 5001`);
})