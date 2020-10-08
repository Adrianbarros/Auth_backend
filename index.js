const express = require('express');
const path = require('path')
const app = express();

//set a static folder
app.use(express.static(path.join(__dirname, 'public')));

//setting the port
const PORT = process.env.PORT || 5000;
//start the server in the given port
app.listen(PORT, () => console.log(`server started on port ${PORT}`))