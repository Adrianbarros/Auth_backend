const express = require('express');
const path = require('path')
const app = express();


const members = {
    id: 1,
    name: 'name'
}

app.get('api/members', (req, res) => {
    res.json(members);
});

//set a static folder
app.use(express.static(path.join(__dirname, 'public')));

//setting the port
const PORT = process.env.PORT || 5000;
//start the server in the given port
app.listen(PORT, () => console.log(`server started on port ${PORT}`))