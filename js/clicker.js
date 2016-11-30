// variables
var foodCount = 0;
var kittenCount = 0;
var kittenFedCount = 0;
var kittenFedDiff = kittenCount - kittenFedCount;
var dayNumber = 1;
var dayCountdown = 0;
var dayRunning = false;
var endDay = false;
// ui variables
var NEFMessage = true;

// display loop functions
function displayLoop() {
  $('#foodCount').html(foodCount);
  $('#kittenCount').html(kittenCount);
  $('#dayCountdown').html(dayCountdown);
  $('#dayNumber').html(dayNumber)
  setTimeout(displayLoop, 10);
}

// daily functions
function dayEvent() {
  if (dayRunning == false) {
    dayRunning = true;
    dayCountdown = 60;
    function dayCountdownFunction() {
      if (dayCountdown > 0) {
        dayCountdown--;
        setTimeout(dayCountdownFunction, 1000);
      } else {
        endDay = true;
      }
    }
    dayCountdownFunction();
  }
  if (endDay == true) {
    endDay = false;
    kittenCount -= kittenFedDiff;
    dayNumber++;
    dayRunning = false;
  }
  setTimeout(dayEvent, 10);
}

// things to do when page loads
function onLoad() {
  // this stuff gets run only once on page load
  $('#notEnoughFood').hide();
  NEFMessage = false;
  displayLoop();
  dayEvent();
}

// button actions
$('#makeFood').click(function() {
  foodCount++;
});

$('#putOutFood').click(function() {
  if (foodCount >= 1) {
    foodCount--;
    kittenCount++;
  } else if (NEFMessage == false) {
    NEFMessage = true;
    $('#notEnoughFood').show();
    setTimeout(function() {
      $('#notEnoughFood').hide();
      NEFMessage = false;
    }, 3000);
  }
});
