$('#vote-photo-1').mouseenter(function(){
	$('#vote-banner-1').css('background-color', '#C5A77E');	
	$('#vote-text-1').toggleClass('hidden');
})

$('#vote-photo-1').mouseleave(function(){
	$('#vote-banner-1').css('background-color', '');	
	$('#vote-text-1').toggleClass('hidden');
})

$('#vote-photo-1').click(function(){
	$('#infoModal').modal('show')
})

$('#vote-banner-1').mouseenter(function(){
	$('#vote-banner-1').css('background-color', '#C5A77E');	
	$('#vote-text-1').toggleClass('hidden');
})

$('#vote-banner-1').mouseleave(function(){
	$('#vote-banner-1').css('background-color', '');
	$('#vote-text-1').toggleClass('hidden');
})

$('.vote-banner').click(function(){
	$('#voteModal').modal('show')
})

$('#submit-vote').click(function(){
	$('#shareModal').modal('show');
	$('#voteModal').modal('hide');
	submitVote();
})

$('#info-vote').click(function(){
	$('#voteModal').modal('show')
	$('#infoModal').modal('hide')
})

function submitVote(){
	var form = {
		vote:"lostlocal",
		emailaddress:"ccmohnike11@gmail.com",
		date:Date.now()
	}
	$.post("/api/homebrewervote", form, function(data){
		console.log(data)
	})
}

$('#birthdate').change(function(){
  	var today = new Date();
  	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
  	var twentyOneYear = yyyy - 21;
  	var date = $('#birthdate').val();
  	var dateArray = date.split('-');
    if (dateArray[0] > twentyOneYear){
		$('#age-warning').removeClass('hidden');
      	$('#submit-registration').addClass('hidden');
    } else if (dateArray[0] == twentyOneYear) {
      	if (dateArray[1] > mm) {
        	$('#age-warning').removeClass('hidden');
          	$('#submit-registration').addClass('hidden');
        } else if (dateArray[1] == mm) {
          	if (dateArray[2] > dd) {
           		$('#age-warning').removeClass('hidden');
              	$('#submit-registration').addClass('hidden');
            } else if (dateArray[2] == dd) {
             	console.log('Happy Birthday!'); 
            }
        }
    } else {
     	$('#age-warning').addClass('hidden'); 
      	$('#submit-registration').prop('disabled', false);
    }
})
