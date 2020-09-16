/**
  * Comunicacion con los servicios json de Lan
  * Envia dentro de una sola llamada varias peticiones a servicios
  * Utiliza el servicio /cgi-bin/json_services/receiver_demux.cgi
  *
  * 10-02-2009
  * rleonv
  **/

if (typeof JSON_Services == 'undefined')
	{
	var JSON_Services = 
		{
		Version: '0.39',
	
		service_data: Array(),
		service_items: 0,
	
		pending_requests: false,
		pending_fetchs: false,
		
		indicator: false,
	
		require: function(libraryName) 
			{
			document.write('<script type="text/javascript" src="'+libraryName+'"></script>');
			},	
		is_loaded: function(script)
			{
			return isIncluded(script);
			},
		dynamic_load: function(libraryName, postLoadHandler)
			{
			if (JSON_Services.is_loaded(libraryName))
				{
				postLoadHandler();
				return;
				}
			
			var head = document.getElementsByTagName("head")[0];
			script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = libraryName;
	
			var handler = new Object();
			handler.postLoadHandler = postLoadHandler;
			handler.element = script;
	
			// Firefox
			script.onload = JSON_Services.dynamic_postload.bind(handler);
	
			// IE
			script.onreadystatechange = JSON_Services.dynamic_postload.bind(handler);
			
			head.appendChild(script);
			},
	
		dynamic_postload: function()
			{
			// IE
			if (this.element.readyState)
				{
				if (this.element.readyState == 'loaded' || this.element.readyState == 'complete')
					{
					this.postLoadHandler();
					}
				}
			// Otros navegadores
			else
				{
				this.postLoadHandler();
				}
			},
			
		load: function()
			{
			if((typeof Prototype == 'undefined') || 
				(typeof Element == 'undefined') || 
				(typeof Element.Methods == 'undefined'))
				{
				throw("JSON_Services requiere Prototype");
				}
	
			if (parseFloat(Prototype.Version.split(".")[0] + "." +
				Prototype.Version.split(".")[1]) < 1.5)
				{
				throw("JSON_Services requiere Prototype >= 1.5.0");
				}
	
			if (typeof Object.toJSONString == 'undefined')
				{
				throw("JSON_Services requiere JSON");
				}

			// La peticion a los servicios en forma automatica
			if (!window.json_services_js_loaded)
				{
				var prev_onload = window.onload;
				window.onload = function()
					{
					if (prev_onload)
						{
						prev_onload();
						}
		
					JSON_Services.fetch_data();
					};

				window.json_services_js_loaded = 1;
				}
			},
	
		enable_indicator: function()
			{
			if (JSON_Services.indicator == false)
				{
				// El mensaje de cargando
				img_loading = new Image();
	
				if (window.location.protocol != 'https:')
					{
					img_loading.src = 'http://plane.lan.com/images/html/indicator_arrows.gif';
					}
				else
					{
					img_loading.src = '/images/html/indicator_arrows.gif';
					}
					
				img_loading.width = 16;
				img_loading.height = 16;
	
				if (document.body)
					{
					var html_loading = '<div id="json_loading"></div>';
					new Insertion.Top(document.body, html_loading);
					$('json_loading').appendChild(img_loading);
					}
				else
					{
					var html_loading = '<div id="json_loading">';
					html_loading += '<img src="' + img_loading.src + '" width="' + img_loading.width + '" height="' + img_loading.height + '">';
					html_loading += '</div>';
					document.writeln(html_loading);
					}
	
				JSON_Services.indicator = true;
				}
			else
				{
				var load_msg;
				if (load_msg = $('json_loading'))
					{
					load_msg.style.visibility = 'visible';
					}
				}
			},
		disable_indicator: function()
			{
			if (JSON_Services.indicator)
				{
				var load_msg;
				if (load_msg = $('json_loading'))
					{
					load_msg.style.visibility = 'hidden';
					}
				}
			},
	
		// Principal
		add_handled_request: function(service_name, data, handler)
			{
			var request_data = new Object;
			request_data.TYPE = 0;
			request_data.SERVICE = service_name;
			request_data.DATA = data;
			request_data.HANDLER = handler;
	
			JSON_Services.service_data[JSON_Services.service_items] = request_data;
			JSON_Services.service_items++;
			},
	
		add_container_request: function(service_name, data, container)
			{
			var request_data = new Object;
			request_data.TYPE = 1;
			request_data.SERVICE = service_name;
			request_data.DATA = data;
			request_data.CONTAINER = container;
	
			JSON_Services.service_data[JSON_Services.service_items] = request_data;
			JSON_Services.service_items++;
			},
	
		fetch_data: function (is_critical, origin, isCashierComponent, paymentMethod, interceptor, flowId)
			{
			if (JSON_Services.service_items > 0)
				{
				var url = '/cgi-bin/json_services/receiver_demux.cgi';
				var useAjaxPostBody = 0;
				var ajaxRequestHeaders = {};
				if (interceptor) {
					try {
						var interceptorJson = JSON.parse(interceptor);
						if(interceptorJson.active[paymentMethod]) {
							url  = interceptorJson.url;
							useAjaxPostBody = 1;
							if(flowId) ajaxRequestHeaders['X-Flow-Id'] = flowId;
							var sessionCookie = document.cookie.match(new RegExp('(^| )' + 'lan_session' + '=([^;]+)'));
					  		if (sessionCookie) ajaxRequestHeaders['X-LAN-Session'] = sessionCookie[2];
							var authTokenCookie = document.cookie.match(new RegExp('(^| )' + 'auth_token' + '=([^;]+)'));
					  		if (authTokenCookie) ajaxRequestHeaders['X-Auth-Token'] = authTokenCookie[2];
							var userTypeCookie = document.cookie.match(new RegExp('(^| )' + 'user_type' + '=([^;]+)'));
					  		if (userTypeCookie) ajaxRequestHeaders['X-User-Type'] = userTypeCookie[2];
						}
					}
					catch(error) {
						var pciInterceptorError = new Object();
						pciInterceptorError.description = "Error in pci interceptor flow";
						pciInterceptorError.message = error.message;
						pciInterceptorError.interceptorSwitchData = interceptor;
						JSON_Services.service_data[0].DATA.PARAMETERS_OBJECT.error = pciInterceptorError;
					}
				}

				var appendFlags = new Array();
				if (is_critical != null && is_critical == '1'){
					appendFlags[appendFlags.length] = 'critical_process=1';
					appendFlags[appendFlags.length] = 'origin=' + origin;
				}
				if(isCashierComponent != null && isCashierComponent === '1'){
					appendFlags[appendFlags.length] = 'cashier_process=1';
				}
				if(typeof paymentMethod !== "undefined") {
					appendFlags[appendFlags.length] = "payment_method="+paymentMethod;
				}
				if(flowId) {
					appendFlags[appendFlags.length] = "flowId="+flowId;
				}
				if(appendFlags.length > 0){
					url += '?' + appendFlags.join('&');
				}
				if (JSON_Services.pending_requests == false)
					{
					JSON_Services.enable_indicator();
					JSON_Services.pending_requests = true;
					JSON_Services.pending_fetchs = false;

					// La info a enviar
					var send_data = new Object();
					send_data.REQUESTS = JSON_Services.service_data;
					send_data.PAGE = window.location.protocol + '//' + window.location.host + window.location.pathname;
	
					// Respaldo la info de los servicios
					var info_servicios = JSON_Services.service_data;
					JSON_Services.service_data = new Array();
					JSON_Services.service_items = 0;
			
					var json_data = send_data.toJSONString();
					var postBodyData = escape(json_data);
					if (useAjaxPostBody) {
						postBodyData = decodeURIComponent(json_data);
					}
					new Ajax.Request(url, 
						{
						method: 'post',
						contentType: 'application/json',
						encoding: 'ISO-8859-1',
						postBody: postBodyData,
						requestHeaders: ajaxRequestHeaders,
						onFailure: function (response)
							{
							JSON_Services.pending_requests = false;
							JSON_Services.disable_indicator();
							
							for (var index = 0; index < info_servicios.length; index++)
								{
								if (info_servicios[index].TYPE == 1)
									{
									$(info_servicios[index].CONTAINER).innerHTML = '';
									}
								else if (info_servicios[index].TYPE == 0)
									{
									// Envio error y paso de vuelta los datos entregados
									info_servicios[index].HANDLER(-5, info_servicios[index].DATA);
									}
								}
	
							if (JSON_Services.pending_fetchs)
								{
								JSON_Services.fetch_data(is_critical, origin);
								}
							},
						onException: function (response)
							{
							JSON_Services.pending_requests = false;
							JSON_Services.disable_indicator();
							
							for (var index = 0; index < info_servicios.length; index++)
								{
								if (info_servicios[index].TYPE == 1)
									{
									$(info_servicios[index].CONTAINER).innerHTML = '';
									}
								else if (info_servicios[index].TYPE == 0)
									{
									// Envio error y paso de vuelta los datos entregados
									info_servicios[index].HANDLER(-5, info_servicios[index].DATA);
									}
								}
	
							if (JSON_Services.pending_fetchs)
								{
								JSON_Services.fetch_data(is_critical, origin);
								}
							},
						onSuccess: function (response) 
							{
							var json = response.responseText.parseJSON();
							JSON_Services.pending_requests = false;
							JSON_Services.disable_indicator();
			
							// Acciones al recibir la respuesta
							if (json.STATUS_VALUE > 0)
								{	
								var service_response = json.DATA;
								for (var index = 0; index < service_response.length; index++)
									{
									// Respuestas tipo HTML que se insertan en un DIV
									if (info_servicios[index].TYPE == 1)
										{
										if (service_response[index].STATUS_VALUE > 0)
											{
											var container = $(info_servicios[index].CONTAINER);
											document.writeln = document.write = function(text)
												{
												new Insertion.Bottom(container, text);
												};
											
											var new_content = document.createElement('div');
	
											if (typeof Effect != 'undefined')
												{
												Element.setOpacity(new_content, 0);
												}
	
											container.innerHTML = '';
											container.appendChild(new_content);
	
											// Esto es para que si hay javascript se ejecute correctamente
											Element.update(new_content, service_response[index].DATA);
											if (typeof Effect != 'undefined')
												{
												new Effect.Appear(new_content, {duration:1.0});
												}
											}
										else
											{
											// En caso de respuesta incorrecta
											$(info_servicios[index].CONTAINER).innerHTML = '';
											}
										}
									// Respuestas que son manejadas por una funcion
									else if (info_servicios[index].TYPE == 0)
										{
										info_servicios[index].HANDLER(service_response[index].STATUS_VALUE, service_response[index].DATA);
										}
									}
								}
							else
								{
								for (var index = 0; index < info_servicios.length; index++)
									{
									if (info_servicios[index].TYPE == 1)
										{
										$(info_servicios[index].CONTAINER).innerHTML = '';
										}
									else if (info_servicios[index].TYPE == 0)
										{
										// Envio error y paso de vuelta los datos entregados
										info_servicios[index].HANDLER(-5, info_servicios[index].DATA);
										}
									}
								}
	
							if (JSON_Services.pending_fetchs)
								{
								JSON_Services.fetch_data(is_critical, origin);
								}
							}
						});
					}
				else
					{
					JSON_Services.pending_fetchs = true;
					}
				}
			}
		}

	// Inicializo el sistema de servicios json
	JSON_Services.load();
	}

