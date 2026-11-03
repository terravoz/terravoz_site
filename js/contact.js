$(document).ready(function(){
	var endpoint = "https://formsubmit.co/ajax/info@terravoz.net";

	$("#ajax-contact-form").submit(function() {
		var form = $(this);
		var name = $.trim(form.find('[name=name]').val());
		var email = $.trim(form.find('[name=email]').val());
		var message = $.trim(form.find('[name=message]').val());
		var error = '';

		if(!name) {
			error += 'Please enter your name.<br />';
		}
		if(!email) {
			error += 'Please enter an e-mail address.<br />';
		} else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			error += 'Please enter a valid e-mail address.<br />';
		}
		if(message.length < 10) {
			error += 'Please enter your message. It should have at least 10 characters.<br />';
		}

		if(error) {
			$('#note').html('<div class="notification_error">' + error + '</div>');
			return false;
		}

		$('#note').empty();
		$.ajax({
			type: "POST",
			url: endpoint,
			data: form.serialize(),
			dataType: "json",
			success: function(res) {
				if(res && (res.success === true || res.success === "true")) {
					$("#fields").hide();
					$('#note').html('<div class="notification_ok">Your message has been sent. Thank you!</div>');
				} else {
					showFailure();
				}
			},
			error: showFailure
		});
		return false;
	});

	function showFailure() {
		$('#note').html('<div class="notification_error">Sorry, your message could not be sent. Please write to us at <a href="mailto:info@terravoz.net">info@terravoz.net</a> instead.</div>');
	}
});
