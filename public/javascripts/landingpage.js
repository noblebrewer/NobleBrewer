$("#submit-email").click(function(e){
	e.preventDefault();
	var form = {
		email : document.getElementById("email").value,
		function: 'untappd'
	}

	heap.identify({ email : email });

	$.post("/api/addToMailchimp",form,
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