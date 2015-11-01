$("#submit-email").click(function(e){
	e.preventDefault();
	var form = {
		email : document.getElementById("email").value,
		source: 'homebrewer_vote'
	}

	heap.identify({ email : email });

	$.post("/api/addToMailchimp",form,
		function(data){
			console.log(data);
			if (data === 'error'){
				alert('Please enter a valid email');
			} else if (data === 'success') {
				window.location= "/";
			} else {
				alert('Something went wrong - please try again')
			}
		}
	)
});