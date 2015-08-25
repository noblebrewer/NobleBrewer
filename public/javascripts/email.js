$("#homebrewer-submit").click(function(e){
	e.preventDefault();
	var fullname = document.getElementById("first_name").value+" "+document.getElementById("last_name").value
	var form = {
		firstname : document.getElementById("first_name").value,
		lastname : document.getElementById("last_name").value,
		fullname : fullname,
		email : document.getElementById("email").value,
		location : document.getElementById("location").value,
		reason : document.getElementById("reason").value,
		recipe : document.getElementById("recipe").value,
		awards: document.getElementById("awards").value,
		function: 'homebrewer'
	}
	$.post("/api/email",form,
		function(data){
			console.log(data);
			if (data.status === 'error'){
				alert('Shoot, something went wrong. Please try to submit again');
			} else if (data.status === 'email') {
				console.log('no email');
				alert('Please include an email address');
			} else {
			}
		}
	);
});

$("#contact-homebrewer").click(function(e){
	e.preventDefault();
	var email = $('#contact-homebrewer').attr('href').split(':');
	email = email[1];
	console.log(email);
	var form = {
		brewerEmail : "caitlin@tradecrafted.com",
		messageContents : document.getElementById("message-to-hb").value,
		function: 'contact-homebrewer'
	}
	$.post("/api/email",form,
		function(data){
			console.log(data.status);
			if (data.status === 'error'){
				alert('Shoot, something went wrong. Please try to submit again');
			} else if (data.status === 'email') {
				console.log('no email');
				alert('Please include an email address');
			} else {
				window.location="/success/emailhomebrewer"
			}
		}
	);
});