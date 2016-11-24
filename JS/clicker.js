var foodCount = 0;
var kittenCount = 0;
var NEFMessage = true;

// universal/common functions
function gameLoop() {
  $('#foodCount').html(foodCount);
  $('#kittenCount').html(kittenCount);
  setTimeout(gameLoop, 10);
}

// things to do when page loads
function onLoad() {
  // this stuff gets run only once on page load
  $('#notEnoughFood').hide();
  NEFMessage = false;
  gameLoop();
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
    $('#foodCount').html(foodCount);
    $('#kittenCount').html(kittenCount);
  } else if (NEFMessage == false) {
    NEFMessage = true;
    $('#notEnoughFood').show();
    setTimeout(function() {
      $('#notEnoughFood').hide();
      NEFMessage = false;
    }, 3000);
  }
});
