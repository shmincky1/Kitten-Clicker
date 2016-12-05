// variables
var foodCount = 0;
var kittenCount = 0;
var kittenFedCount = 0;
var kittenFedDiff = 0;
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
  $('#dayNumber').html(dayNumber);
  if (dayCountdown == 10) {
    $('#dayCountdownFeild').css('color', 'red');
  } else if (dayCountdown == 60) {
    $('#dayCountdownFeild').css("color", "black");
  }
  setTimeout(displayLoop, 10);
}

// universal helper functions
var doTheGoodDiff = function(kittens, food) {
  if (kittens > food) {
    return kittens - food;
  } else {
    return 0;
  }
};

function feedKittens(kittens, diff) {
  foodCount -= kittens - diff;
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
    kittenFedDiff = doTheGoodDiff(kittenCount, foodCount);
    feedKittens(kittenCount, kittenFedDiff);
    kittenCount -= kittenFedDiff;
    if (kittenFedDiff != 0) {
      console.log(kittenFedDiff + " kittens were killed, make sure you have enough food to feed all of your kittens at the end of the day next time");
    } else {
      console.log("No kittens were killed today!");
    }
    dayNumber++;
    dayRunning = false;
  }
  setTimeout(dayEvent, 20);
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
