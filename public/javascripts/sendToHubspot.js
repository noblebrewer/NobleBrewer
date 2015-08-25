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
	console.log(form);
	$.post("/api/hubspot",form,
		function(data){
			console.log(data);
			if (data.status === 'error'){
				alert('Shoot, something went wrong. Please try to submit again');
			} else if (data.status === 'email') {
				console.log('no email');
				alert('Please include an email address');
			} else {
				window.location= "/success/homebrewersubmission";
			}
		}
	);
	
});

$('#signup-newsletter').click(function(e){
	e.preventDefault();
	var form = {
		email : document.getElementById("email").value,
		function: 'email'
	}
	$.post("/api/hubspot",form,
		function(data){
			console.log(data);
			if (data.status === 'error'){
				alert('Shoot, something went wrong. Please try to submit again');
			} else {
				window.location = '/success/emailsignup';
			}
		}
	);
});

$("#submit-registration").click(function(e){
	e.preventDefault();
	var fullname = document.getElementById("first_name").value+" "+document.getElementById("last_name").value
	var form = {
		firstname : document.getElementById("first_name").value,
		lastname : document.getElementById("last_name").value,
		fullname : fullname,
		email : document.getElementById("email").value,
		birthdate : document.getElementById("birthdate").value,
		function: 'registration'
	}
	console.log(form);
	hostname = keystone.get('hostname');
	$.post(hostname+"/api/hubspot",form,
		function(data){
			console.log(data);
			if (data.status === 'error'){
				alert('Shoot, something went wrong. Please try to submit again');
			} else if (data.status === 'email') {
				console.log('no email');
				alert('Please include an email address');
			} else {
				window.location= '/collections/beer';
			}
		}
	);
	
});
