/**
  * Componentes dinamicas
  * Carga componentes en background via AJAX
  * Utiliza el servicio /cgi-bin/json_services/components.cgi
  *
  * 03-07-2009
  * rleonv
  **/

if (typeof Dynamic_Components == 'undefined')
	{
	var Dynamic_Components = 
		{
		Version: '0.16',	

		numero_componentes: 0,
		containers: Array(),
		post_load_handlers: Array(),
		post_failure_handlers: Array(),
	
		load: function() 
			{
			if (typeof JSON_Services == 'undefined')
				{
				throw("Dynamic_Components requiere JSON_Services >= 0.18");
				}
			},
	
		dummy_function: function(id)
			{
			alert("Funcion de prueba para " + id);
			},
	
		// Esta encola la peticion en JSON_Services
		add_component: function(container, componente, parametros, post_load_handler, post_failure_handler)
			{
			var data = new Object();
			data.COMPONENT = componente;
	
			if (parametros)
				{
				if (typeof(parametros) == 'object')
					{
					data.PARAMETERS_OBJECT = parametros;
					}
				else
					{
					data.PARAMETERS = escape(parametros);
					}
				}
	
			data.ID = Dynamic_Components.numero_componentes;
			data.CONTAINER = container;
	
			Dynamic_Components.containers[data.ID] = container;

			// Los handlers post recibir componente
			if (post_load_handler)
				{
				Dynamic_Components.post_load_handlers[data.ID] = post_load_handler;
				}
			else
				{
				Dynamic_Components.post_load_handlers[data.ID] = ''; 
				}
	
			if (post_failure_handler)
				{
				Dynamic_Components.post_failure_handlers[data.ID] = post_failure_handler;
				}
			else
				{
				Dynamic_Components.post_failure_handlers[data.ID] = '';
				}

			// Pido la componente
			JSON_Services.add_handled_request('components', data, Dynamic_Components.draw_component);
			
			Dynamic_Components.numero_componentes++;
			if (Dynamic_Components.numero_componentes > 65534)
				{
				Dynamic_Components.numero_componentes = 0;
				}
			},
	
		// Esta obliga a hacer la peticion al servicio inmediatamente
		refresh_component: function(container, componente, parametros, post_load_handler, post_failure_handler, is_critical, origin, isCashierComponent)
			{
			Dynamic_Components.add_component(container, componente, parametros, post_load_handler, post_failure_handler);
			JSON_Services.fetch_data(is_critical, origin, isCashierComponent, parametros.medio_pago_regular, parametros.interceptor, parametros.flowId);
			},
	
		// Esta dibuja la componente cuando es recibida
	 	draw_component: function(status, detalles_componente)
			{
			if (status > 0)
				{
				var component_data = unescape(detalles_componente.COMPONENT_DATA);
	
				var preload_libs;
				if (detalles_componente.LIBS_PRELOAD)
					{
					preload_libs = detalles_componente.LIBS_PRELOAD;
					}
					
				var id = detalles_componente.ID;	
			
				var new_content = document.createElement('div');
				
				var container = $(Dynamic_Components.containers[id]);
				if (container && (typeof(container) != 'undefined'))
					{
					// Para compatibilidad con document.write
					document.writeln = document.write = function(text)
						{
						new Insertion.Bottom(container, text);
						};	
				
					container.innerHTML = '';
					container.appendChild(new_content);
					}
	
				// Esto es para que si hay javascript externo se ejecute correctamente
				if (preload_libs)
					{
					var numero_librerias = preload_libs.length;
					var librerias_cargadas = 0;
					
					for (var index = 0; index < numero_librerias; index++)
						{
						var libreria_js = preload_libs[index];
	
						JSON_Services.dynamic_load(libreria_js, function()
							{
							librerias_cargadas++;
	
							if (librerias_cargadas == numero_librerias)
								{
								Element.update(new_content, component_data);
	
								}
							});
						}
					}
				else
					{
					Element.update(new_content, component_data);
					}
	
				// Esto sirve para ejecutar cosas despues que se recibe la componente
				if (Dynamic_Components.post_load_handlers[id])
					{
					Dynamic_Components.post_load_handlers[id]();
					}
				}
			else
				{
				if (detalles_componente)
					{
					var id = detalles_componente.ID;
					if (Dynamic_Components.post_failure_handlers[id])
						{
						Dynamic_Components.post_failure_handlers[id]();
						}
					else
						{
						var container = $(Dynamic_Components.containers[id]);
						if (typeof(container) != 'undefined')
							{
							container.innerHTML = '';
							}
						}
					}
				}
			}
		}

	Dynamic_Components.load();
	}

