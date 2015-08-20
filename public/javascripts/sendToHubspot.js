$("#homebrewer-submit").click(function(e){
	e.preventDefault();
	var form = {
		firstname : document.getElementById("first_name").value,
		lastname : document.getElementById("last_name").value,
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
				alert('oops, an error');
			}
			window.location= '/success';
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
				alert('oops, an error');
			}
		}
	);
});

$("#submit-registration").click(function(e){
	alert('OHAI');
	e.preventDefault();
	var form = {
		firstname : document.getElementById("first_name").value,
		lastname : document.getElementById("last_name").value,
		email : document.getElementById("email").value,
		birthdate : document.getElementById("birthdate").value,
		function: 'registration'
	}
	console.log(form);
	$.post("http://localhost:3000/api/hubspot",form,
		function(data){
			console.log(data);
			if (data.status === 'error'){
				alert('oops, an error');
			}
			window.location= '/success';
		}
	);
	
});
