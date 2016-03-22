$("#mc-embedded-subscribe").click(function(e){
	console.log("New member referral waiting list signup");
	// e.preventDefault();
	var form = {
		email : (document.getElementById('mce-EMAIL').value).toLowerCase(),
		first_name : document.getElementById('mce-FNAME').value,
		last_name : document.getElementById('mce-LNAME').value,
		referrer_email : document.getElementById('mce-REFERRAL').value,
		date : Date.now(),
		email_hash : null,
		referrer_hash: null,
		utm_source : document.getElementById('utm_source').value,
	}

	console.log(form);

	// heap.identify({ email : email });

	$.post("/api/member_referral",form,
		function(data){
			console.log(data);
			if (data === 'error'){
				alert('Please enter a valid email');
			} else if (data === 'success') {
				window.location= "/";
			} 
		}
	)
});

$(document).ready(function(){
	console.log("Logging member pagehit");

	var form = {
		referrer_email : document.getElementById('mce-REFERRAL').value,
		date : Date.now(),
		utm_source : document.getElementById('utm_source').value
	}
	
	$.post("/api/member_pagehit",form,
		function(data) {
			console.log(data);
		})
})