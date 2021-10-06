//when dom loads
$(document).ready(function() {
  $('#word-box').keyup(function(){
    let count= 140-$(this).val().length;
    $('#text-counter').text(count);
    if(count<0){
      $('#text-counter').addClass('over-char-limit')
    }
    else{
      $('#text-counter').removeClass('over-char-limit')
    }
  });
});