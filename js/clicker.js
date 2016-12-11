// count variables
var foodCount = 0;
var kittenCount = 0;
var kittenFedCount = 0;
var foodFactoryCount = 0;
var dispenseryCount = 0;
// time(day) variables
var dayNumber = 1;
var dayCountdown = 0;
var dayRunning = false;
var endDay = false;
// actioner time variables
var foodFactoryOldTime = new Date().getTime();
var dispenseryOldTime = new Date().getTime();
// actioner active variables
var foodFactoryActive = false;
var dispenseryActive = false;
// actioner multipliers
var foodFactoryMultiplier = 0.001;
var dispenseryMultiplier = 0.001;
// ui variables
var NEFMessage = true;
// misc variables
var kittenFedDiff = 0;

// display loop functions
function displayLoop() {
  $('#foodCount').html(Math.round(foodCount));
  $('#kittenCount').html(Math.round(kittenCount));
  $('#dayCountdown').html(dayCountdown);
  $('#dayNumber').html(dayNumber);
  if (dayCountdown == 10 || dayCountdown == 9) {
    $('#dayCountdownFeild').css('color', 'red');
  } else if (dayCountdown == 60 || dayCountdown == 59) {
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

function autoIncreaseEquation(multiplier, count, newTime, oldTime) {
  return multiplier * count * (newTime - oldTime);
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
  setTimeout(dayEvent, 50);
}

// auto generaters/actioners
function actioners() {
  if (foodFactoryActive == true) {
    function foodFactoryAction() {
      var innerNewTime = new Date().getTime();
      foodCount += autoIncreaseEquation(foodFactoryMultiplier, foodFactoryCount, innerNewTime, foodFactoryOldTime);
      foodFactoryOldTime = innerNewTime;
    }
    foodFactoryAction();
  }
  if (dispenseryActive == true) {
    function dispenseryAction() {
      // nada hoy
    }
    dispenseryAction();
  }
  // new Date().getTime()
  setTimeout(actioners, 45);
}

// things to do when page loads
function onLoad() {
  // this stuff gets run only once on page load
  $('#notEnoughFood').hide();
  NEFMessage = false;
  displayLoop();
  dayEvent();
  actioners();
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
