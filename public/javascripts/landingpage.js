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
			source: document.getElementById("source-id").innerHTML,
			function: 'email',
			state: $("#state option:selected").val()
		}

		console.log(form);

		// var location = document.getElementById('untappd-location').innerHTML
		// var version = document.getElementById('untappd-version').innerHTML
		// var source = document.getElementById('untappd-source').innerHTML

		if (form.source == 'untappd'){
			ga('send', {
			  hitType: 'event',
			  eventCategory: 'email',
			  eventAction: 'submit',
			  eventLabel: 'untappd'
			});
		}

		// console.log(location, version, source);

		heap.identify({ email : document.getElementById("email").value });
		// heap.track('untappd', {
		// 	location : location,
		// 	source : source,
		// 	version : version });

		$.post("/api/addToMailchimp",form,
			function(data){
				console.log(data);
				if (data === 'error'){
					alert('Please enter a valid email');
				} else if (data === 'success') {
					 $('#ageModal').modal('hide');
				}
			}
		);
	}
});

$("#submit-email-homepage").click(function(e){
	console.log(document.getElementById("email").value);
	e.preventDefault();
	if ($('#age-confirm').prop('checked') === false) {
		alert('Please verify you are over 21')
	} else if ($('#email').val() === '') {
		alert('You must include an email')
	} else {
		e.preventDefault();
		var form = {
			email : document.getElementById("email").value,
			source: 'homepage',
			function: 'email',
			state: $("#state option:selected").val()
		}

		// var location = document.getElementById('untappd-location').innerHTML
		// var version = document.getElementById('untappd-version').innerHTML
		// var source = document.getElementById('untappd-source').innerHTML

		// ga('send', {
		//   hitType: 'event',
		//   eventCategory: 'email',
		//   eventAction: 'submit',
		//   eventLabel: 'facebook'
		// });

		// console.log(location, version, source);

		heap.identify({ email : document.getElementById("email").value });
		// heap.track('untappd', {
		// 	location : location,
		// 	source : source,
		// 	version : version });

		$.post("http://www.noblebrewer.com/api/addToMailchimp",form,
			function(data){
				console.log(data);
				if (data === 'error'){
					alert('Please enter a valid email');
				} else if (data === 'success') {
					$('#ageModal').modal('hide');
					document.cookie="access=Yes; expires=Fri, 18 Apr 2017 12:00:00 UTC; path=/";
					document.cookie="email="+document.getElementById("email").value+"; expires=Fri, 18 Apr 2017 12:00:00 UTC; path=/";
					console.log(document.cookie);
				}
			}
		);
	}
});