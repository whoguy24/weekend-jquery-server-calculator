// LOAD EXPRESS MODULES
const express = require('express');

// CREATE SERVER
const app = express();
const PORT = 5000;
app.use(express.static('./server/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// START SERVER
app.listen(PORT, function() {
    console.log(`Server is now running on port ${PORT}.`);
});

// SERVER LOGIC

let history = [
    {
        int1: '1',
        int2: '2',
        result: '3',
        operation: '+'
    },
    {
        int1: '14',
        int2: '9',
        result: '5',
        operation: '-'
    },
    {
        int1: '2',
        int2: '6',
        result: '12',
        operation: '*'
    },
    {
        int1: '14',
        int2: '2',
        result: '7',
        operation: '/'
    }
];

app.get('/calculate', (req, res) => {
    res.send(history);
});

app.post('/calculate', (req, res) => {
    history.push(req.body);
    res.sendStatus(201);
})