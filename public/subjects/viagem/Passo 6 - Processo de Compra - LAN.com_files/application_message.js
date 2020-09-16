ApplicationMessage = function() {
	var lightbox = [];

	function show(json) {
		if (json.length <= 0)
			return;

		var messages = [];
		try {
			messages = eval(Base64.decode(json));
		}
		catch(e) {
			//console.log("Can't eval json");
		}
	

		for (var i=0; i < messages.length; ++i) {
			if (messages[i].lightbox == 1) {
				lightbox.push(messages[i].message);
			}
			else {
				showMessage(messages[i].message);
			}
		}

		if (lightbox.length > 0) 
			showLightBox(lightbox);
	}

	function hide() {
		hideLightBox();
		hideMessage();
	}

	function showLightBox(content) {
		document.getElementById('contenido_lightbox').innerHTML = content.join(" <br/> ");
		document.getElementById('application_message').style.display = 'block';
		document.getElementById('fade').style.display = 'block';
		var selects = document.getElementsByTagName("select");
		for (var i=0; i < selects.length; i++) {
			selects[i].style.visibility = "hidden";
		}
		document.getElementById('close_lightbox').onclick = hideLightBox;
	}

	function hideLightBox() {
		document.getElementById('application_message').style.display = 'none';
		document.getElementById('fade').style.display = 'none';
		var selects = document.getElementsByTagName("select");
		for (var i=0; i < selects.length; i++) {
			selects[i].style.visibility = "visible";
		}
		return false;
	}

	function showMessage(message) {
		document.getElementById('application_message_div').innerHTML = message;
		document.getElementById('application_message_div').style.display = 'block';
		document.getElementById('application_message_div').style.marginBottom = '10px';
	}

	function hideMessage() {
		document.getElementById('application_message_div').style.display = 'none';
	}

	return {
		show : show,
		hide : hide
	};
}();
