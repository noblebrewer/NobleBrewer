$("#submit-email").click(function(e){
	console.log("New member referral waiting list signup");
	e.preventDefault();
	var form = {
		email : "caitlin@noblebrewerbeer.com",
		first_name : "Caitlin",
		last_name : "Mohnike",
		referrer_email : "claude@noblebrewer.com",
		date : Date.now(),
		email_hash : null,
		referrer_hash: null,
		utm_source : "email",
	}

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