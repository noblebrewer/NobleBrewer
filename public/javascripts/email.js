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
			console.log(message);.log(data);
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
		brewerEmail : email,
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

$("#drop-a-hint-submit").click(function(e){
	console.log('email');
	e.preventDefault();
	var fullname = document.getElementById("first_name").value+" "+document.getElementById("last_name").value
	var form = {
		firstname : document.getElementById("first_name").value,
		lastname : document.getElementById("last_name").value,
		fullname : fullname,
		email : document.getElementById("email").value,
		friend : document.getElementById("friend_email").value,
		excited : document.getElementById("excited_because").value,
		gift : document.getElementById("secret").value,
		function: 'dropahint'
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
				window.location = '/success/dropahint';
			}
		}
	);
});

