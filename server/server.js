// LOAD EXPRESS MODULES
const express = require('express');

// CREATE SERVER
const app = express();
const port = 5000;
app.use(express.static('./server/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// START SERVER
app.listen(port, function() {
    console.log(`Server is now running on port ${port}.`);
});

// Set global variables
let history = [];

// GET request
app.get('/calculate', (req, res) => {
    res.send(history);
});

// POST request
app.post('/calculate', (req, res) => {
    let calculationObject = calculate(req.body);
    history.push(calculationObject);
    res.sendStatus(201);
})

// Function to calculate actual arithmetic from calculation object
function calculate (calculationObject) {

    // Determine calculationObject operation type.
    // Perform appropriate operation using data from calculationObject.
    if (calculationObject.operation === '+') {
        calculationObject.result = Number(calculationObject.int1) + Number(calculationObject.int2);
        return calculationObject;
    }
    else if (calculationObject.operation === '-') {
        calculationObject.result = Number(calculationObject.int1) - Number(calculationObject.int2);
        return calculationObject;
    }
    else if (calculationObject.operation === '*') {
        calculationObject.result = Number(calculationObject.int1) * Number(calculationObject.int2);
        return calculationObject;
    }
    else if (calculationObject.operation === '/') {
        calculationObject.result = Number(calculationObject.int1) / Number(calculationObject.int2);
        Math.round(calculationObject.result * 100) / 100;
        return calculationObject;
    }
    else {
        console.log(`Could not calculate from object. Please ensure your calculationObject has a valid "operation" property.`);
        return false;
    }

}