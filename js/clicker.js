// count variables other thea
var count = {
  kittenFood: 0,
  kittens: {total: 0, occupied: 0, free: function() {return (count.kittens.total - count.kittens.occupied);}, fed: 0}
}
var foodCount = 0;
var kittenCount = 0;
var occupiedKittenCount = 0;
var freeKittenCount = 0;
var kittenFedCount = 0;

// time(day) variables
var day = {
  number: 1,
  countdown: 0,
  running: false,
  end: false
}

// actioners (i really need to change this name)

var foodFactory = {
  oldTime: new Date().getTime(),
  active: false,
  multiplier: 0.001,
  count: 0
}

var dispensery = {
  oldTime: new Date().getTime(),
  active: false,
  multiplier: 0.001,
  count: 0
}

// ui variables
var uiVars = {
  NEFMessage: true
};

// misc variables
var kittenFedDiff = 0;

// messages shown
var messagesShown = {
  makeSureEnoughFoodEreday: false
    // etc
};


// display loop functions
function displayLoop() {
  $('#foodCount').html(Math.round(foodCount));
  $('#kittenCount').html(Math.round(kittenCount));
  $('#freeKittenCount').html(Math.round(freeKittenCount));
  $('#dayCountdown').html(day.countdown);
  $('#dayNumber').html(day.number);
  if (day.countdown == 10 || day.countdown == 9) {
    $('#dayCountdownFeild').css('color', 'red');
  } else if (day.countdown == 60 || day.countdown == 59) {
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
  if (day.running == false) {
    day.running = true;
    day.countdown = 60;

    function dayCountdownFunction() {
      if (day.countdown > 0) {
        day.countdown--;
        setTimeout(dayCountdownFunction, 1000);
      } else {
        day.end = true;
      }
    }
    dayCountdownFunction();
  }
  if (day.end == true) {
    day.end = false;
    kittenFedDiff = doTheGoodDiff(kittenCount, foodCount);
    feedKittens(kittenCount, kittenFedDiff);
    kittenCount -= kittenFedDiff;
    if (kittenFedDiff >= 1) {
      console.log(Math.round(kittenFedDiff) + " kittens were killed, make sure you have enough food to feed all of your kittens at the end of the day next time");
    } else {
      console.log("No kittens were killed today!");
    }
    day.number++;
    day.running = false;
  }
  setTimeout(dayEvent, 50);
}

// auto generaters/actioners
function actioners() {
  if (foodFactory.active == true) {
    function foodFactoryAction() {
      var innerNewTime = new Date().getTime();
      foodCount += autoIncreaseEquation(foodFactory.multiplier, foodFactory.count, innerNewTime, foodFactory.oldTime);
      foodFactory.oldTime = innerNewTime;
    }
    foodFactoryAction();
  }
  if (dispensery.active == true) {
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
  uiVars.NEFMessage = false;
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
  } else if (uiVars.NEFMessage == false) {
    uiVars.NEFMessage = true;
    $('#notEnoughFood').show();
    setTimeout(function() {
      $('#notEnoughFood').hide();
      uiVars.NEFMessage = false;
    }, 3000);
  }
});
