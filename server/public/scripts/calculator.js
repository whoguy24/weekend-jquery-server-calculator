// Initialize jQuery
$(document).ready(onReady);

// Global Variables
let operation = ""

// Run function on page load
function onReady () {
    console.log('jQuery has loaded successfully.');
    $('#button-add').on('click', setOperation);
    $('#button-subtract').on('click', setOperation);
    $('#button-multiply').on('click', setOperation);
    $('#button-divide').on('click', setOperation);
    $('#button-clear').on('click', setOperation);
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
        operation = "Add";
    }
    else if (operation === 'button-subtract') {
        console.log('Operation selected: Subtraction');
        operation = "Subtract";
    }
    else if (operation === 'button-multiply') {
        console.log('Operation selected: Multiplication');
        operation = "Multiply";

    }
    else if (operation === 'button-divide') {
        console.log('Operation selected: Division');
        operation = "Divide";
    }
    else {
        console.log('Click handler failed.');
    }
    
}