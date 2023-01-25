
// Checks the received 
function isEmailValid(email) {
	var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var emailVal = $("#" + email).val();
	return pattern.test(emailVal);
}