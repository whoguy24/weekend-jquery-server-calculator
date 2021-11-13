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