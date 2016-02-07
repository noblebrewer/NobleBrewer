$("#submit-email").click(function(e){
	console.log("INFO: Submit email via homebrewer vote");
	e.preventDefault();
	var form = {
		email : document.getElementById("email").value,
		source: 'homebrewer_vote',
		function: 'email'
	}

	heap.identify({ email : email });

	$.post("/api/addToMailchimp",form,
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

$("#homebrewer-submit").click(function(e){
	console.log("INFO: Submit homebrewer application");
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
	heap.identify({ email : email });
	console.log(form);
	$.post("/api/addToMailchimp",form,
		function(data){
			console.log(data);
			if (data === 'error'){
				alert('Please enter a valid email');
			} else if (data === 'success') {
				window.location= "/success/homebrewersubmission";
			} 
		}
	);
	
});

$('#signup-newsletter').click(function(e){
	console.log("INFO: Sign up for newsletter");
	e.preventDefault();
	var form = {
		email : document.getElementById("email").value,
		function: 'email'
	}
	heap.identify({ email : email });
	$.post("/api/addToMailchimp",form,
		function(data){
			console.log(data);
			if (data === 'error'){
				alert('Please enter a valid email');
			} else {
				window.location = '/success/emailsignup';
			}
		}
	);
});

$("#submit-registration").click(function(e){
	console.log("INFO: Register for account");
	var fullname = document.getElementById("first_name").value+" "+document.getElementById("last_name").value
	var form = {
		firstname : document.getElementById("first_name").value,
		lastname : document.getElementById("last_name").value,
		fullname : fullname,
		email : document.getElementById("email").value,
		birthdate : document.getElementById("birthdate").value,
		function: 'registration'
	}
	heap.identify({ email : email });
	console.log(form);
	hostname = "http://www.noblebrewer.com";
	$.post(hostname+"/api/addToMailchimp",form,
		function(data){
			console.log(data);
			if (data === 'error'){
				alert('Please enter a valid email');
			} else {
				// window.location= '/collections/beer';
			}
		}
	);
	
});


$("#drop-a-hint-submit").click(function(e){
	console.log("INFO: Drop a hint");
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
	heap.identify({ email : email });
	$.post("/api/addToMailchimp",form,
		function(data){
			console.log(data);
			if (data === 'error'){
				alert('Please include an email address');
			} else {
				window.location = '/success/dropahint';
			}
		}
	);
});

$('#submit-email-digg').click(function(e){
	console.log("INFO: Submit email via digg page");
	console.log("digg");
	e.preventDefault();
	heap.identify({ email: document.getElementById('email').value });
	var form = {
		email : document.getElementById("email").value,
		function: 'email',
		source: 'digg'
	}

	heap.identify({ email : email });

	$.post("/api/addToMailchimp",form,
		function(data){
			console.log(data);
			if (data === 'error'){
				alert('Please include an email address');
			} else {
				$('#diggModal').modal('hide');
				$('#promoModal').modal('show');
			}
		}
	);
})

$("#submit-email-beerfest").click(function(e){
	console.log("INFO: Submit email via SF Beer Festival");
	e.preventDefault();
	var form = {
		email : document.getElementById("email").value,
		source: 'sfbeerfestival',
		function: 'email'
	}

	heap.identify({ email : email });

	$.post("/api/addToMailchimp",form,
		function(data){
			console.log(data);
			if (data === 'error'){
				alert('Please enter a valid email');
			} else if (data === 'success') {
				$('#main').toggleClass("hidden");
				$('#confirmation').toggleClass('hidden');
			} 
		}
	)
});

$("#submit-email-welcome-two").click(function(e){
	console.log("INFO: Submit email via Welcome Sampler Two");
	e.preventDefault();
	var form = {
		email : document.getElementById("form-email-2").value,
		source: 'welcome-sampler',
		function: 'email',
		state: document.getElementById("state2").value
	}

	heap.identify({ email : form.email });
	console.log(form);

	$.post("/api/addToMailchimp",form,
		function(data){
			console.log(data);
			if (data === 'error'){
				alert('Please enter a valid email');
			} else if (data === 'success') {
				window.location = '/sampler'
			} 
		}
	)
});

$("#submit-email-welcome-one").click(function(e){
	console.log("INFO: Submit email via Welcome Sampler One");
	console.log(document.getElementById("form-email-1").value);
	e.preventDefault();
	var form = {
		email : document.getElementById("form-email-1").value,
		source: 'welcome-sampler',
		function: 'email',
		state: document.getElementById("state1").value
	}

	console.log(form);

	heap.identify({ email : form.email });

	$.post("/api/addToMailchimp",form,
		function(data){
			console.log(data);
			if (data === 'error'){
				alert('Please enter a valid email');
			} else if (data === 'success') {
				window.location = '/sampler'
			} 
		}
	)
});


