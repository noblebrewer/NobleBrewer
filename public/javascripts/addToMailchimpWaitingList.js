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