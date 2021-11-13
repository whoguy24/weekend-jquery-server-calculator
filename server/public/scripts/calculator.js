// Initialize jQuery
$(document).ready(onReady);

// Define global variables
let operationType = '';
let result = '';
let history = [];

// Run function on page load
function onReady () {
    console.log('jQuery has loaded successfully.');
    console.log('Ready to calculate!');
    $('#button-add').on('click', setOperation);
    $('#button-subtract').on('click', setOperation);
    $('#button-multiply').on('click', setOperation);
    $('#button-divide').on('click', setOperation);
    $('#button-submit').on('click', calculate);
    $('#button-clear').on('click', clearInputs);
    renderHistory()
}

// Sets the current operation type.
function setOperation () {

    // Capture clicked button
    let operation = $(this).attr('id');

    // Highlight selected button to show current operation type
    $('.button-operation').removeClass('button-active');
    $(this).addClass('button-active');

    // Determine which button was clicked, then set global operation variable
    // Output operation type to the console
    if (operation === 'button-add') {
        console.log('Operation selected: Addition');
        operationType = '+';
    }
    else if (operation === 'button-subtract') {
        console.log('Operation selected: Subtraction');
        operationType = '-';
    }
    else if (operation === 'button-multiply') {
        console.log('Operation selected: Multiplication');
        operationType = '*';

    }
    else if (operation === 'button-divide') {
        console.log('Operation selected: Division');
        operationType = '/';
    }
    else {
        console.log('Click handler failed.');
    }
    
}

// Clear inputs and remove highlighting from all buttons
function clearInputs () {
    console.log('Inputs cleared.');
    $('.button-operation').removeClass('button-active');
    $('#input-number-1').val('');
    $('#input-number-2').val('');
}

// Render list element in the DOM from array of history objects
function renderHistory() {

    // Send GET request to server to retrieve history object array
    $.ajax({
        method: 'GET',
        url: '/calculate'
    }).then((response) => {

        // Clear list element
        $('#list-history').empty();

        // Construct list element from history objects.
        // Construct operation strings from history data.
        for (let historyObject of response) {
            let listItemString = calculationObjectString(historyObject);
            $('#list-history').append(`<li>${listItemString}</li>`);
        }

        // Log GET success to the console
        console.log('Successfully retrieved history from the server.');
        
    }).catch((error) => {

        // Log GET failure to the console
        console.log('Could not retrieve history from the server.', error);

    })

}

// Retrieve inputs and return calculation object
function retrieveInputs() {
    let calculation = {
        int1: $('#input-number-1').val(),
        int2: $('#input-number-2').val(),
        operation: operationType
    }
    return calculation;
}

// Calculate the desired operation
function calculate() {

    // Retrieve inputs and build calculation object
    let calculation = retrieveInputs();

    console.log(calculation);

    // Post calculation object to the server
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: calculation
    }).then((response) => {
        console.log('Successfully posted to the server:');
        console.log(calculation);

    }).catch((error) => {
        console.log('Post to server failed.');
    })

}

// Function to turn calculation object into a string
function calculationObjectString(calculationObject) {

    // Initialize calculationString variable
    let calculationString = '';

    // If the object has a result, display it. Otherwise, don't bother
    if (calculationObject.result) {
        calculationString = `${calculationObject.int1} ${calculationObject.operation} ${calculationObject.int2} = ${calculationObject.result}`;
    } else {
        calculationString = `${calculationObject.int1} ${calculationObject.operation} ${calculationObject.int2}`;
    }

    // Return string
    return calculationString;

}