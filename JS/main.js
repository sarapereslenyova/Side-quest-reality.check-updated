let $ = jQuery.noConflict();

//Groceries
let priceGrocer = null;
let groceriesPaid = false;

//Rent
let priceRent = null;
let rentPaid = false;

//Ballance
let userBallance = null;
let userBallanceUpdated = null;

//Function to make sure all the numbers are 
function roundToTwoDecimalPlaces(number) {
  //return Math.round(number * 100) / 100;
  let parsedNumber = parseFloat(Math.round(number*100)/100);
  return parsedNumber;
  //return Math.round(number.toPrecision(2));
}

// Disabling buttons before input has been submitted
function updateGrocerButtons() {
  if (priceGrocer !== null && userBallance !== null) {
    $("#payGrocer").prop("disabled", false);
  } else {
    $("#payGrocer").prop("disabled", true);
  }
}

function updateRentButtons() {
  if (priceRent !== null && userBallance !== null) {
    $("#payRentButton").prop("disabled", false);
  } else {
    $("#payRentButton").prop("disabled", true);
  }
}

$("#cancelRentButton").prop("disabled", true);
$("#cancelGrocer").prop("disabled", true);

updateGrocerButtons();
updateRentButtons();

//Setting rent
function changeRentPrice() {
  if (rentPaid === true){
    cancelRent()
  }
  let userInput = $("#userInputRent").val();
  priceRent = roundToTwoDecimalPlaces(userInput);
  updateRentButtons();
  return priceRent;
}

//Linking the images and buttons to rent related functions
$("#changeRentButton").click(changeRentPrice);
if(rentPaid === false){
$("#imageRent").click(payRent);
}
$("#changeGrocerButton").click(changeGrocerPrice);
if(groceriesPaid === false){
$("#imageGrocer").click(payGrocer);
}

//Setting groceries
function changeGrocerPrice() {
  if (groceriesPaid === true){
    cancelGrocer()
  }
  let userInput = $("#userInputGrocer").val();
  priceGrocer = roundToTwoDecimalPlaces(userInput);
  updateGrocerButtons();
  return priceGrocer;
}

//Setting the real and fictional ballance

function setBallance() {
    // getting the value from the input form
    if (rentPaid || groceriesPaid){
      cancelRent();
      cancelGrocer();
    } else { 
      updateRentButtons();
      updateGrocerButtons();
    }
    let userInput = $("#userInputBallance").val();
    let userBallanceDisplay = $("#ballanceDisplay");
    let parsedInput = roundToTwoDecimalPlaces(userInput)

    // updates the text based on the user's input
    userBallanceDisplay.text("Your real ballance is: " + parsedInput);

    // updating the real ballance according to the input and creating the fictional ballance base
    userBallance = parsedInput;
    userBallanceUpdated = userBallance;
    displayFictionalBallance();
    console.log(priceGrocer, priceRent);
    console.log(userBallance);
    console.log(userBallanceUpdated);
    return userBallance, userBallanceUpdated;
  }

function alertSetBallance() {
  alert("Please, input your coin first")
}

displayFictionalBallance();

function displayFictionalBallance() {
  let fictionalBallanceDisplay = $("#fictionalBallance");
  if (userBallanceUpdated===null){
    fictionalBallanceDisplay.text("Not set yet.");
  } else{
    userBallanceUpdated = roundToTwoDecimalPlaces(userBallanceUpdated)
    fictionalBallanceDisplay.text(userBallanceUpdated);
    }
  }

// User clicks on Pay rent and the amount is deducted from their ballance
function payRent() {
  if (rentPaid === false && userBallanceUpdated>priceRent && priceRent!==null) {
    userBallanceUpdated = roundToTwoDecimalPlaces(userBallanceUpdated - priceRent);
    rentPaid = true;
    $("#cancelRentButton").prop("disabled", false);
    $("#payRentButton").prop("disabled", true);
    $('#imageRent').attr("src", "images/castle upgrade.png");
    displayFictionalBallance()
    return userBallanceUpdated, rentPaid;
  } else {
    if(priceRent===null){
      alert("You did not set the rent price!")
    } else{
      alert("Your ballance is insufficient!")
    }
  }
}

function cancelRent() {
  if (rentPaid) {
  userBallanceUpdated = roundToTwoDecimalPlaces(userBallanceUpdated + priceRent);
  rentPaid = false;
  $("#cancelRentButton").prop("disabled", true);
  $("#payRentButton").prop("disabled", false);
  $("#imageRent").attr("src", "images/castle realistic.png");
  displayFictionalBallance();
  return rentPaid, userBallanceUpdated;
  }
}

// User clicks on Pay groceries and the amount is deducted from their ballance
function payGrocer() {
  if (groceriesPaid === false && userBallanceUpdated>priceGrocer && priceGrocer!==null) {
    userBallanceUpdated = roundToTwoDecimalPlaces(userBallanceUpdated - priceGrocer);
    groceriesPaid = true;
    $("#cancelGrocer").prop("disabled", false);
    $("#payGrocer").prop("disabled", true);
    $('#imageGrocer').attr("src", "images/castle upgrade.png");
    displayFictionalBallance()
    return userBallanceUpdated, groceriesPaid;
  } else {
    if(priceGrocer===null){
      alert("You did not set the groceries price!")
    } else{
      alert("Your ballance is insufficient!")
    }
  }
}

function cancelGrocer() {
  if (groceriesPaid) {
  userBallanceUpdated = roundToTwoDecimalPlaces(userBallanceUpdated + priceGrocer);
  groceriesPaid = false;
  $("#cancelGrocer").prop("disabled", true);
  $("#payGrocer").prop("disabled", false);
  $("#imageGrocer").attr("src", "images/castle 1.png");
  displayFictionalBallance();
  return groceriesPaid, userBallanceUpdated;
  }
}

//Future features
$("#checkEndOfMonthBallance").prop("disabled", true)
$("#checkSthBallance").prop("disabled", true)
