//import modules
const express = require('express');
const {json,urlencoded} = express;
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {check, body, validationResult} = require('express-validator');
require('dotenv').config();


//app
const app = express();

//db
mongoose.connect(process.env.MONGO_DB_URI, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true
}).then(() => {console.log('MongoDB connected')}).catch(err => console.log(`MongoDB connection error: ${err}`));

//middleware
app.use(morgan('dev'));
app.use(cors({origin:true, credentials:true}));
app.use(json());
app.use(urlencoded({extended:false}));
app.use(cookieParser());
app.use(check());

//routes
const testRoutes = require('./routes/test');
app.use('/test', testRoutes);
const userRoutes = require('./routes/user');
app.use('/', userRoutes);

//port
const port = process.env.PORT || 8085;

//listener
const server = app.listen(port, () => {console.log(`Server is running on port ${port}`)});