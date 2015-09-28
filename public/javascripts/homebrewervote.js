//Tracks what the current vote is by which brewer they clicked on to open the vote module

var currentVote = '';

//Current homebrewers - these variables are also in the routes/api doc, so don't
//forget to change them there too if you do another round of this

var brewer1 = "lostlocal",
	brewer2 = "boden",
	brewer3 = "myers",
	brewer4 = "papadoc";

//Watches the photo container to show text and change color when mouse enters + leaves

$('#container-1').mouseenter(function(){
	toggleBanner(1, 'on');	
})

$('#vote-text-1').mouseenter(function(){
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

function toggleBanner(num, toggle){
	if (toggle === 'on') {
		$('#vote-banner-'+num).css('background-color', '#C5A77E');
		$('#vote-text-'+num).css('opacity', 1);
	} else if (toggle === 'off') {
		$('#vote-banner-'+num).css('background-color', '');
		$('#vote-text-'+num).css('opacity', 0);
	}
}

//Shows the homebrewer's info modal when the photo is clicked

$('#vote-photo-1').click(function(){
	showHomebrewerModal(1);
	currentVote = brewer1;
})

$('#vote-photo-2').click(function(){
	showHomebrewerModal(2);
	currentVote = brewer2;
})

$('#vote-photo-3').click(function(){
	showHomebrewerModal(3);
	currentVote = brewer3;
})

$('#vote-photo-4').click(function(){
	showHomebrewerModal(4);
	currentVote = brewer4;
})

function showHomebrewerModal(num){
	$('#brewer-modal-'+num).modal('show')
}

//Shows the voting modal when the vote banner is clicked

$('.vote-banner-1').click(function(){
	showVotingModal()
	currentVote = brewer1;
})

$('.vote-banner-2').click(function(){
	showVotingModal()
	currentVote = brewer2;
})

$('.vote-banner-3').click(function(){
	showVotingModal()
	currentVote = brewer3;
})

$('.vote-banner-4').click(function(){
	showVotingModal()
	currentVote = brewer4;
})

//Opens the voting modal from the homebrewer's info modal's 'vote' button

$('#info-vote-1').click(function(){
	showVotingModal(1)
})

$('#info-vote-2').click(function(){
	showVotingModal(2)
})

$('#info-vote-3').click(function(){
	showVotingModal(3)
})

$('#info-vote-4').click(function(){
	showVotingModal(4)
})

function showVotingModal(num){
	$('#voteModal').modal('show')
	if (num !== null) {
		$('#brewer-modal-'+num).modal('hide');
	}
}

//Opens the success/share modal and tracks vote

$('#submit-vote').click(function(){
	submitVote(); 
})

function submitVote(){
	//TODO: Submit email to hubspot
	//TODO: display 21 error message
	//TODO: Validate email regex
	var birthdate = document.getElementById('birthdate').value

	var form = {
		vote : currentVote,
		emailaddress : document.getElementById('email_address').value,
		date : Date.now(),
		birthdate : birthdate
	}
	if (verifyBirthdate(birthdate) === true) {
		$.post("/api/homebrewervote", form, function(data){
			console.log(data)
			$('#shareModal').modal('show');
			$('#voteModal').modal('hide');
			$('#brewer1results').html(data.one);
			$('#brewer2results').html(data.two);
			$('#brewer3results').html(data.three);
			$('#brewer4results').html(data.four);
		})
	} else {
		console.log("not 21");
	}
}

function verifyBirthdate(date){
  	var today = new Date();
  	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
  	var twentyOneYear = yyyy - 21;
  	var dateArray = date.split('-');
    if (dateArray[0] > twentyOneYear){
		return false;
    } else if (dateArray[0] == twentyOneYear) {
      	if (dateArray[1] > mm) {
        	return false;
        } else if (dateArray[1] == mm) {
          	if (dateArray[2] > dd) {
           		return false;
            } else if (dateArray[2] == dd) {
             	return true;
            }
        }
    } else {
     	return true;
    }
}
