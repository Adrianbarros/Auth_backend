const express = require('express');
const path = require('path')
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//TODO:
//socket.io

//sample post
const postRoute = require('./routes/post')

dotenv.config()
//Import Routes
const authRoute = require('./routes/auth');

///connect to DB
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true }, { useUnifiedTopology: true }, () =>
    console.log('DB connected')
);
//middleware
app.use(express.json());

//route middleware
app.use('/api/user', authRoute);
app.use('/api/post', postRoute);


//set a static folder
app.use(express.static(path.join(__dirname, 'public')));

//setting the port
const PORT = process.env.PORT || 5000;
//start the server in the given port
app.listen(PORT, () => console.log(`server started on port ${PORT}`))