var foodCount = 0;
var kittenCount = 0;

function onLoad() {
  $('#foodCount').innerHTML = foodCount;
  $('#kittenCount').innerHTML = kittenCount;
}

function wait(milliseconds){
  setTimeout(function() {
    console.log("Waiting has finished.");
  }, milliseconds);
}

function makeFood() {
  foodCount++;
  $('#foodCount').html(foodCount);
}

function putOutFood() {
  if(foodCount >= 1){
    foodCount--;
    kittenCount++;
    $('#foodCount').HTML = foodCount;
    $('#kittenCount').innerHTML = kittenCount;
  } else {
    $('#notEnoughFood').hide();
    wait(100);
    $('#notEnoughFood').show();
    wait(3000);
    $('#notEnoughFood').hide();
  }
}
