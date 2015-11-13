$("#submit-email").click(function(e){
	e.preventDefault();
	if ($('#age-confirm').prop('checked') === false) {
		alert('Please verify you are over 21')
	} else if ($('#email').val() === '') {
		alert('You must include an email')
	} else {
		e.preventDefault();
		var form = {
			email : document.getElementById("email").value,
			source: 'untappd'
		}

		var location = document.getElementById('untappd-location').innerHTML
		var version = document.getElementById('untappd-version').innerHTML
		var source = document.getElementById('untappd-source').innerHTML

		ga('send', {
		  hitType: 'event',
		  eventCategory: 'email',
		  eventAction: 'submit',
		  eventLabel: 'untappd'
		});

		// console.log(location, version, source);

		heap.identify({ email : email });
		heap.track('untappd', {
			location : location,
			source : source,
			version : version });

		$.post("/api/addToMailchimp",form,
			function(data){
				console.log(data);
				if (data === 'error'){
					alert('Please enter a valid email');
				} else if (data === 'success') {
					window.location= "/";
				}
			}
		);
	}
});