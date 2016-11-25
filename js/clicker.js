// count variables
var foodCount = 0;
var kittenCount = 0;
var 
// ui variables
var NEFMessage = true;

// central loop functions
function displayLoop() {
  $('#foodCount').html(foodCount);
  $('#kittenCount').html(kittenCount);
  setTimeout(displayLoop, 10);
}

function logicLoop() {
  
}

// things to do when page loads
function onLoad() {
  // this stuff gets run only once on page load
  $('#notEnoughFood').hide();
  NEFMessage = false;
  displayLoop();
  
}

// button actions
$('#makeFood').click(function(){
    foodCount++;
});

$('#putOutFood').click(function(){
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
