const express = require('express');
const path = require('path')
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

///connect to DB
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true }, { useUnifiedTopology: true }, () =>
    console.log('DB connected')
)


//Import Routes
const authRoute = require('./routes/auth');

//route middleware
app.use('/api/user', authRoute);

//set a static folder
app.use(express.static(path.join(__dirname, 'public')));

//setting the port
const PORT = process.env.PORT || 5000;
//start the server in the given port
app.listen(PORT, () => console.log(`server started on port ${PORT}`))