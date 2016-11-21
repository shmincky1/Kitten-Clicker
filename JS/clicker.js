// universal variables
var foodCount = 0;
var kittenCount = 0;
var NEFMessage = true;

// universal functions
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// onload stuff
$('document').onLoad(function() {
  while (true) {
    // eventually this will keep the counters synced with the variables
    // $('')
  }
});

function onLoad() {
  $('#foodCount').html(foodCount);
  $('#kittenCount').html(kittenCount);
  $('#notEnoughFood').hide();
  NEFMessage = false;
}

// function wait(milliseconds){
//   setTimeout(function() {
//     console.log("Waiting has finished.");
//   }, milliseconds);
// }

// Usage!

// async function demo() {
//   console.log('Taking a break...');
//   await sleep(2000);
//   console.log('Two second later');
// }

function makeFood() {
  foodCount++;
  $('#foodCount').html(foodCount);
}

function putOutFood() {
  if (foodCount >= 1){
    foodCount--;
    kittenCount++;
    $('#foodCount').html(foodCount);
    $('#kittenCount').html(kittenCount);
  } else if (NEFMessage == false) {
    NEFMessage = true;
    $('#notEnoughFood').show();
    sleep(3000).then(() => {
      $('#notEnoughFood').hide();
      NEFMessage = false;
    });
  }
}
