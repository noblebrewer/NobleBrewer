$('#container-1').mouseenter(function(){
	toggleBanner(1, 'on');	
})

$('#container-1').mouseleave(function(){
	toggleBanner(1, 'off');	
})

$('#container-2').mouseenter(function(){
	toggleBanner(2, 'on');	
})

$('#container-2').mouseleave(function(){
	toggleBanner(2, 'off');	
})

$('#container-3').mouseenter(function(){
	toggleBanner(3, 'on');	
})

$('#container-3').mouseleave(function(){
	toggleBanner(3, 'off');	
})

$('#container-4').mouseenter(function(){
	toggleBanner(4, 'on');	
})

$('#container-4').mouseleave(function(){
	toggleBanner(4, 'off');	
})


$('#vote-photo-1').click(function(){
	showHomebrewerModal(1);
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

function toggleBanner(num, toggle){
	if (toggle === 'on') {
		$('#vote-banner-'+num).css('background-color', '#C5A77E');
		$('#vote-text-'+num).css('opacity', 1);
	} else if (toggle === 'off') {
		$('#vote-banner-'+num).css('background-color', '');
		$('#vote-text-'+num).css('opacity', 0);
	}
}

function showHomebrewerModal(num){
	$('#brewer-modal-'+num).modal('show')
}

function submitVote(){
	var form = {
		vote:"lostlocal",
		emailaddress:"ccmohnike22@gmail.com",
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
