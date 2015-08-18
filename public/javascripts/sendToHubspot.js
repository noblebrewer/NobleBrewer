$("#submit").click(function(e){
	e.preventDefault();
	var form = {
		name:document.getElementById("name").value,
		email :document.getElementById("email").value,
		location :document.getElementById("location").value,
		reason :document.getElementById("reason").value,
		recipe :document.getElementById("recipe").value,
		awards: document.getElementById("awards").value
	}
	$.post("/api/hubspot",form,
		function(data){
			console.log(data);
		}
	);
});
