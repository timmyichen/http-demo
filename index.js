const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/api', require('./api/apiIndex'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.locals.data = require('./data/data');

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});