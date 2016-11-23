var foodCount = 0;
var kittenCount = 0;
var NEFMessage = true;
var runGameLoop = false;

// universal/common functions
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function gameLoop() {
  while (runGameLoop == true) {
    $('#foodCount').innerHTML = foodCount;
    $('#kittenCount').innerHTML = kittenCount;
  }
}

// things to do when page loads
function onLoad() {
  // this stuff gets run only once on page load
  $('#foodCount').innerHTML = foodCount;
  $('#kittenCount').innerHTML = kittenCount;
  $('#notEnoughFood').hide();
  NEFMessage = false;
}

// button actions
$('#makeFood').click(function(){
    foodCount++;
    // $('#foodCount').html(foodCount)
});

$('#putOutFood').click(function(){
  if (foodCount >= 1) {
    foodCount--;
    kittenCount++;
    // $('#foodCount').html(foodCount);
    // $('#kittenCount').html(kittenCount);
  } else if (NEFMessage == false) {
    NEFMessage = true;
    $('#notEnoughFood').show();
    sleep(3000).then(() => {
      $('#notEnoughFood').hide();
      NEFMessage = false;
    });
  }
});
