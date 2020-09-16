
var W3C = document.getElementById? true : false; // IE5+, Netscape 6+, Opera 5+, Konqueror 2.1+, Mozilla and various Mozilla/Gecko-based browsers.
var NN4 = document.layers? true : false; //Netscape Navigator 4.x.
var IE4 = document.all? true : false; // IE version 4 (and above).

var current_calendar_layer;
var current_calendar_image;
var current_calendar_month;
var current_calendar_year;
var current_calendar_num;
var g_fecha_min, g_fecha_max;


function getElemById(id)
	{
	var elem = document.all ? document.all[id] : document.getElementById(id);

	if (!elem)
		{
		return;
		}

	return elem;
	}

//////////////////////////////////////////////////////////////////////////////
// This functions allow temporary deactivation of buttons
//
// You have to configure disabledButtonTimeout and disabledButton[]
// before you can use these functions, on the relevant javascript
// portion in your HTML

var disabledButtonTimeout = 20000;
var disabledButtonColor = '#CCCCCC';
var disabledButton = new Array(10);
var tid = new Array(10);
var pfgc = new Array(10);

function reenableButton(index)
	{
	if (tid[index])
		{
		clearTimeout(tid[index]);
		tid[index] = 0;
		}
	if (disabledButton[index])
		{
		// If it's more than 1 button associated with this index....
		if (disabledButton[index].length)
			{
			for (var i = 0; i < disabledButton[index].length; i++)
				{
				if (disabledButton[index][i].style)
					{
					disabledButton[index][i].style.color = pfgc[index];
					}
				}
			}
		else if (disabledButton[index].style)
			{
			disabledButton[index].style.color = pfgc[index];
			}
		}
	}

function buttonDisabled(index)
	{
	if (tid[index])
		{
		return true;
		}

	tid[index] = setTimeout("reenableButton(" + index + ")",disabledButtonTimeout);

	if (disabledButton[index])
		{
		// If it's more than 1 button associated with this index....
		if (disabledButton[index].length)
			{
			if (disabledButton[index][0].style)
				{
				pfgc[index] = disabledButton[index][0].style.color;
//				alert("ohoh0:" + pfgc[index]);
				}
			else
				{
//				alert("ohoh1");
				}
			for (var i = 0; i < disabledButton[index].length; i++)
				{
				if (disabledButton[index][i].style)
					{
//					alert("ohoh2["+i+"]:" + disabledButton[index][i].style.color);
					disabledButton[index][i].style.color = disabledButtonColor;
					}
				else
					{
//					alert("ohoh3:" + i);
					}
				}
			}
		else if (disabledButton[index].style)
			{
			pfgc[index] = disabledButton[index].style.color;
			disabledButton[index].style.color = disabledButtonColor;
			}
		}
	return false;
	}

//////////////////////////////////////////////////////////////////////////////


function just_refresh_paso_n(n, paso_actual, session_id)
	{
	// Cuando n es la url de la promocion
	var promo_name = document.getElementById('url_promo');
	if (n == 1 && promo_name != null && promo_name.value != '') {
		document.location = promo_name.value;
		return;
	}

	// Revisar el indice del buttonDisabled
	if ((paso_actual <= n) || buttonDisabled(9))
		{
		return;
		}

	// Despliega encuesta en caso de que escapes del paso 4 o 5, clickeando los nros arriba
	//hay que modificar esto si alguna vez dejamos la encuesta en el paso 3
	if(paso_actual == 4 || paso_actual == 5 )
		{
		abrir_encuesta();
		}

	var server_redirect = '';
	var i = script_name.indexOf('/paso' + paso_actual + '.cgi');
	var aplicacion = script_name.substr(9,i-9);
	if (server_name == 'www.lan.com')
		{
		if (aplicacion == 'compra' && (n == 4 || n == 5 || n == 6))
			{
			server_redirect = 'https://ssl.lan.com' + script_name.substr(0, i+1);
			}
		}
	else if(server_name == 'ssl.lan.com')
		{
		if (aplicacion == 'compra' && (n == 1 || n == 2 || n == 3))
			{
			server_redirect = 'http://booking.lan.com' + script_name.substr(0, i+1);
			}
		}

	document.location = server_redirect + 'paso' + n + '.cgi?session_id=' + session_id + '&just_refresh=1';
	}

function just_refresh_paso_2_new(paso_actual, url_params)
{
	// Revisar el indice del buttonDisabled
	if ((paso_actual <= 2) || buttonDisabled(9))
	{
		return;
	}

	// Despliega encuesta en caso de que escapes del paso 4 o 5, clickeando los nros arriba
	//hay que modificar esto si alguna vez dejamos la encuesta en el paso 3
	if(paso_actual == 4 || paso_actual == 5 )
	{
		abrir_encuesta();
	}

	var server_redirect = 'https://www.latam.com';
	var aplicacion = 'booking';
	var home = get_pais().replace("-", "_");
	var portal = get_lan_cookie("sitio");

	//Nuevo para branded fare
	if ((typeof brandedFare != 'undefined') && (typeof portalbrandedFare != 'undefined'))
	{
		portal = portalbrandedFare;
	}

	//Nuevo para determinar portal
	if (typeof step2Portal != 'undefined' && step2Portal > ''){
		portal = step2Portal;
	}

	document.location = server_redirect + "/" + home + '/apps/' + portal + "/" + aplicacion + "?"  + url_params;
}


function just_refresh_paso_n_reserva(n, paso_actual, session_id)
	{
	// Agregar la parte el button disabled
	if (paso_actual <= n)
		{
		return;
		}

	var server_redirect = '';
	var i = script_name.indexOf('/paso' + paso_actual + 'r.cgi');
	if (server_name == 'www.lan.com' && (n == 3 || n == 4))
		{
		server_redirect = 'https://ssl.lan.com' + script_name.substr(0, i+1);
		}
	else if(server_name == 'ssl.lan.com' && (n == 1 || n == 2))
		{
		server_redirect = 'http://www.lan.com' + script_name.substr(0, i+1);
		}

	document.location = server_redirect + 'paso' + n + 'r.cgi?session_id=' + session_id + '&just_refresh=1';
	}

function acciones_combo_origen_destino(f, combo, num_segmento, tipo)
	{
	var x;
	x = check_select_for_otros_destinos(combo, num_segmento, tipo);

	if (!x && tipo == 'destino')
		{
		pre_select_next_combo(f, combo, num_segmento);
		}
	}

function pre_select_next_combo(f, combo, num_segmento)
	{
	var pre_selected, origen, seg;

	seg = parseInt(num_segmento, 10);

	if (!combo || combo.type != 'select-one')
		{
		return;
		}

	pre_selected = combo.options[combo.selectedIndex].value;
	pre_select_by_value(f, 'from_city' + (seg + 1), pre_selected);

	origen = f.elements['from_city1'];
	if (!origen)
		{
		return;
		}
	pre_selected = origen.options[origen.selectedIndex].value;
	pre_select_by_value(f, 'to_city' + (seg + 1), pre_selected);
	}

function activate_calendar(num, ano, mes)
	{
	var obj, dim, today;
	if (current_calendar_layer)
		{
		hide_layer(current_calendar_layer);
		}

	today = new Date();
	today.setDate(today.getDate() + 14);

	if (!ano)
		{
		ano = new String(today.getFullYear ? today.getFullYear() : today.getYear());
		while (ano.length < 4)
			{
			ano = '0' + ano;
			}
		}
	if (!mes)
		{
		mes = new String(today.getMonth() + 1);
		while (mes.length < 2)
			{
			mes = '0' + mes;
			}
		}
	show_layer('layer_calendario' + num);
	obj = MM_findObj('calendario' + num);
	dim = getDim(obj);
	if (num == 1)
		{
		dd.elements['layer_calendario' + num].moveTo(dim.x - 15, dim.y - 44);
		}
	else if (num == 2)
		{
		dd.elements['layer_calendario' + num].moveTo(dim.x - 15, dim.y - 78);
		}
	else
		{
		dd.elements['layer_calendario' + num].moveTo(dim.x,dim.y - 40);
		}
	current_calendar_num = num;
	current_calendar_layer = 'layer_calendario' + num;
	current_calendar_image = 'imagen_calendario' + num;
	current_calendar_year = ano;
	current_calendar_month = mes;
	set_calendario('imagen_calendario' + num, current_calendar_month, current_calendar_year);
	}

function hide_current_calendar()
	{
	hide_layer(current_calendar_layer);
	}

function selmes(x)
	{
	var m, y, mt, yt;

	m = parseInt(current_calendar_month, 10) + parseInt(x, 10);
	y = parseInt(current_calendar_year, 10);

	while (m > 12)
		{
		m -= 12;
		y += 1;
		}

	while (m < 1)
		{
		m += 12;
		y -= 1;
		}

	mt = new String(m);
	yt = new String(y);

	while (mt.length < 2)
		{
		mt = '0' + mt;
		}

	while (yt.length < 4)
		{
		yt = '0' + yt;
		}


	if ((yt + '-' + mt + '-32') < g_fecha_min)
		{
		return;
		}

	if ((yt + '-' + mt + '-01') > g_fecha_max)
		{
		return;
		}

	current_calendar_month = mt;
	current_calendar_year = yt;

	MM_swapImage(current_calendar_image,'','/images/html/calendarios/cal_' + current_calendar_month + current_calendar_year + '.png');
	}

function selday(x)
	{
	var my_date, first_week_day, days_in_month;

	my_date = new Date(current_calendar_year, current_calendar_month - 1, 1);
	first_week_day = my_date.getDay();
	if (first_week_day == 0)
		{
		first_week_day = 7;
		}
	my_date.setMonth(my_date.getMonth() + 1);
	my_date.setDate(0);
	days_in_month = my_date.getDate();

	x = x - first_week_day + 1;

	if (x > days_in_month)
		{
		return;
		}
	set_fecha_from_calendar(current_calendar_num, current_calendar_year, current_calendar_month, x);
	hide_current_calendar();
	}

function set_calendario(id_calendario, mes, ano)
	{
	MM_swapImage(id_calendario,'','/images/html/calendarios/cal_' + mes + ano + '.png');
	}

function show_layer(layerName)
	{
	if (W3C)
		{
		document.getElementById(layerName).style.visibility = "visible";
		}
	else if (IE4)
		{
		document.all[layerName].style.visibility = "visible";
		}
	else if(NN4)
		{
		document.layers[layerName].visibility = "show";
		}
	}


function hide_layer(layerName)
	{
	if(document.getElementById('layerName'))
		{
		if (W3C)
			{
			document.getElementById('layerName').style.visibility = "hidden";
			}
		else if (IE4)
			{
			document.all[layerName].style.visibility = "hidden";
			}
		else if(NN4)
			{
			document.layers[layerName].visibility = "hidden";
			}
		}
	}

function activar_paso(paso)
	{
	var elem;

	if (!paso)
		{
		return;
		}

	if (document.getElementById)
		{
		elem = document.getElementById('td_paso' + paso);
		}
	else if (document.all)
		{
		elem = eval("document.all.td_paso" + paso);
		}
	else
		{
		return
		}
	if (elem)
		{
		elem.className = 'paso-activo';
		}

	if (document.getElementById)
		{
		elem = document.getElementById('a_paso' + paso);
		}
	else if (document.all)
		{
		elem = eval("document.all.a_paso" + paso);
		}
	else
		{
		return
		}
	if (elem)
		{
		elem.className = 'link-paso-activo';
		}

	if (document.getElementById)
		{
		elem = document.getElementById('txt_paso' + paso);
		}
	else if (document.all)
		{
		elem = eval("document.all.txt_paso" + paso);
		}
	else
		{
		return
		}
	if (elem)
		{
		elem.className = 'txt-paso-activo';
		}
	}

function desactivar_paso(paso)
	{
	var elem;

	if (!paso)
		{
		return;
		}

	if (document.getElementById)
		{
		elem = document.getElementById('td_paso' + paso);
		}
	else if (document.all)
		{
		elem = eval("document.all.td_paso" + paso);
		}
	else
		{
		return
		}
	if (elem)
		{
		elem.className = 'paso-inactivo';
		}

	if (document.getElementById)
		{
		elem = document.getElementById('a_paso' + paso);
		}
	else if (document.all)
		{
		elem = eval("document.all.a_paso" + paso);
		}
	else
		{
		return
		}
	if (elem)
		{
		elem.className = 'link-paso-inactivo';
		}

	if (document.getElementById)
		{
		elem = document.getElementById('txt_paso' + paso);
		}
	else if (document.all)
		{
		elem = eval("document.all.txt_paso" + paso);
		}
	else
		{
		return
		}
	if (elem)
		{
		elem.className = 'txt-paso-inactivo';
		}
	}

function change_class_for_id(id, clase)
	{
	var elem = document.all ? document.all[id] : document.getElementById(id);

	if (!elem)
		{
		return;
		}

	elem.className = clase;
	}

function change_bg_for_id(id, tipo_bg)
	{
	var elem = document.all ? document.all[id] : document.getElementById(id);

	if (!elem)
		{
		return;
		}
	if (!elem.style)
		{
		//comentado por jmcaracci
		//alert("Trato de cambiar style inexistente de : " + id);
		return;
		}
	if (tipo_bg == 'ok')
		{
		if ((elem.nodeName === 'INPUT' || elem.nodeName === 'SELECT') && !elem.disabled) {
			elem.setAttribute("aria-invalid", "false");
		}else{
			for (var i = 0, len = elem.childNodes.length; i < len; i++) {
				if ((elem.childNodes[i].nodeName === 'INPUT' || elem.childNodes[i].nodeName === 'SELECT') && elem.childNodes[i].type !== 'hidden' && !elem.childNodes[i].disabled) {
					elem.childNodes[i].setAttribute("aria-invalid", "false");
				}
			}
		}
		if (!elem.disabled) {
			elem.className = elem.className.replace(/lan_formularios_paso4_error/i, '');
			elem.style.backgroundColor = '#ffffff';
		}
		}
	else
		{
		if ((elem.nodeName === 'INPUT' || elem.nodeName === 'SELECT') && !elem.disabled) {
			elem.setAttribute("aria-invalid", "true");
			elem.focus();
		}else{
			for (var i = 0, len = elem.childNodes.length; i < len; i++) {
				if ((elem.childNodes[i].nodeName === 'INPUT' || elem.childNodes[i].nodeName === 'SELECT') && elem.childNodes[i].type !== 'hidden' && !elem.childNodes[i].disabled) {
					elem.childNodes[i].setAttribute("aria-invalid", "true");
				}
			}
		}
		if (!elem.disabled) {
			elem.className = elem.className.replace(/lan_formularios_paso4_error/i, '');
			elem.className += ' lan_formularios_paso4_error';
			elem.style.backgroundColor = '#eedddd';
		}
		}
	}

function pre_select_by_value(f,nombre_combo, valor)
	{
	var elemento, i;

	if (valor.length == 0)
		{
		return;
		}
	elemento = eval("f.elements['" + nombre_combo + "']");
	if (!elemento)
		{
		return;
		}
	if (elemento.type == 'select-one')
		{
		for (i = 0; i< elemento.options.length; i++)
			{
			if (elemento.options[i].value == valor)
				{
				elemento.options.selectedIndex = i;
				return;
				}
			}
		}
	else if (elemento.type == 'hidden' || elemento.type == 'text')
		{
		elemento.value = valor;
		}
	}

function pre_select_combo(f, combo, previous)
	{
	var pre_selected, master;

	master = eval("f.elements['to_city" + previous + "']");
	if (!master)
		{
		return;
		}

	pre_selected = master.options[master.selectedIndex].value;
	pre_select_by_value(f, 'to_city' + previous, pre_selected);
	}

function txt2amadeus_txt(text_input)
	{
	var newStr = "";
	var oldStr = String(text_input.value);
	var theLength = oldStr.length;
	for(pos = 0; pos < theLength; pos++)
		{
		switch( oldStr.charAt(pos) )
			{
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
			case '0':
			case '.':
			newStr += ''; break;
			case ' ':
			newStr += ''; break;
			case '\'':
			case '"':
			case '´´':
			newStr += ''; break;
			case '#':
			case '°':
			newStr += ' '; break;
			case 'á':
			case 'Á':
			case 'à':
			case 'À':
			case 'â':
			case 'Â':
			newStr += 'a';  break;
			case 'é':
			case 'É':
			case 'è':
			case 'È':
			case 'ê':
			case 'Ê':
			newStr += 'e';  break;
			case 'í':
			case 'Í':
			case 'ì':
			case 'Ì':
			case 'î':
			case 'Î':
			newStr += 'i';  break;
			case 'ó':
			case 'Ó':
			case 'ò':
			case 'Ò':
			case 'ô':
			case 'Ô':
			newStr += 'o';  break;
			case 'ú':
			case 'Ú':
			case 'ù':
			case 'Ù':
			case 'û':
			case 'Û':
			newStr += 'u';  break;
			case 'ñ':
			case 'Ñ':
			newStr += 'n';  break;
			default:
			newStr += oldStr.charAt(pos);
			}
		}
	//text_input.value = newStr.toUpperCase();
	text_input.value = newStr;
	return;
	}

function txt2sabre_txt(text_input)
	{
	// do the substitution via Unicode

	var newStr = text_input.value;
	var subtChars = new RegExp(/[\u00C0-\u00F6\u00F8-\u00FF]/g);
	if ( subtChars.test( newStr ) ) {

	// Characters that have replacements
		newStr = newStr.replace( /[\u00E0-\u00E5]/g, "a" );
		newStr = newStr.replace( /[\u00C0-\u00C5]/g, "A" );
		newStr = newStr.replace( /[\u00E8-\u00EB]/g, "e" );
		newStr = newStr.replace( /[\u00C8-\u00CB]/g, "E" );
		newStr = newStr.replace( /[\u00EC-\u00EF]/g, "i" );
		newStr = newStr.replace( /[\u00CC-\u00CF]/g, "I" );
		newStr = newStr.replace( /[\u00F2-\u00F6\u00F8]/g, "o" );
		newStr = newStr.replace( /[\u00D2-\u00D6\u00D8]/g, "O" );
		newStr = newStr.replace( /[\u00F9-\u00FC]/g, "u" );
		newStr = newStr.replace( /[\u00D9-\u00DC]/g, "U" );
		newStr = newStr.replace( /\u00F1/g, "n" );
		newStr = newStr.replace( /\u00D1/g, "N" );
		newStr = newStr.replace( /\u00E6/g, "ae" );
		newStr = newStr.replace( /\u00C6/g, "AE" );
		newStr = newStr.replace( /\u00E7/g, "c" );
		newStr = newStr.replace( /\u00C7/g, "C" );
		newStr = newStr.replace( /\u00F0/g, "d" );
		newStr = newStr.replace( /\u00D0/g, "D" );
		newStr = newStr.replace( /[\u00FD\u00FF]/g, "y" );
		newStr = newStr.replace( /\u00DD/g, "Y" );
		newStr = newStr.replace( /\u00FE/g, "th" );
		newStr = newStr.replace( /\u00DE/g, "Th" );
		newStr = newStr.replace( /\u00DF/g, "ss" );
		newStr = newStr.replace( /\u00D7/g, "x" );

	}

	newStr = newStr.replace( /[^a-zA-Z0-9]/g, " " );
	newStr = newStr.replace( /\s{2,}/g, " " );
	newStr = newStr.replace( /^\s/, "" );
	newStr = newStr.replace( /\s$/, "" );

	text_input.value = newStr;
	return;
	}

function cleanPaxNamesBeforeSubmit(vForm) {
       var regPattern = new RegExp("pax_[A-Z]{3}_[0-9]_(nombre|primer_apellido)");
       for (x = 0; x < vForm.length; x++) {
               strId = vForm.elements[x].getAttribute("id");

               if (regPattern.test(strId)) {
                       txt2sabre_txt(document.getElementById(strId));
               }
       }
}

function getDim(el)
	{
	for (var lx = 0, ly = 0; el != null; lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
	return{x:lx,y:ly};
	}


function add_select_item(combo, item)
	{
	var i;
	if (!combo || combo.type != 'select-one')
		{
		return;
		}
	for (i=0; i<combo.options.length; i++)
		{
		if (combo.options[i].value == item.value)
			{
			combo.options.selectedIndex = i;
			return;
			}
		}
	combo.options[combo.options.length] = item;
	}

function real_add_city(codigo, nombre, num_segmentos, tipo, num)
        {
	var elem, item, i, f;

	f = eval("document.paso1");

	elem = f.otras_ciudades;
	if (elem)
                {
		if (elem.value.length == 0)
			{
			elem.value = codigo;
			}
		else
			{
			elem.value = elem.value + ',' + codigo;
			}
                }

	elem = f.to_city1;
	if (elem)
                {
		item = new Option(nombre, codigo);
		add_select_item(elem, item);
                }
	for (i = 2; i <= num_segmentos; i++)
		{
		elem = eval("document.paso1.from_city" + i);
		if (elem)
                	{
			item = new Option(nombre, codigo);
			add_select_item(elem, item);
                	}
		elem = eval("document.paso1.to_city" + i);
		if (elem)
                	{
			item = new Option(nombre, codigo);
			add_select_item(elem, item);
                	}
		}
	elem = f.to_city1;
	if (elem && num == 1 && tipo == 'destino')
		{
		pre_select_by_value(f, elem.name, item.value)
		pre_select_next_combo(f, elem, num);
		}
	for (i = 2; i <= num_segmentos; i++)
		{
		elem = eval("document.paso1.from_city" + i);
		if (elem && num == i && tipo == 'origen')
			{
			pre_select_by_value(f, elem.name, item.value)
			}
		elem = eval("document.paso1.to_city" + i);
		if (elem && num == i && tipo == 'destino')
			{
			pre_select_by_value(f, elem.name, item.value)
			pre_select_next_combo(f, elem, num);
			}
		}
	}

function fecha_valida_iso(fecha_iso)
	{
	var dia, mes, ano, fecha_test;

	if (fecha_iso.length != 10)
		{
		return false;
		}

	ano = fecha_iso.substring(0,4);
	mes = fecha_iso.substring(5,7);
	dia = fecha_iso.substring(8,10);

	// nueva validacion
	return isDate(fecha_iso);

	// validacion antigua
	//fecha_test = new Date(ano,mes - 1, dia);
	//if (dia != fecha_test.getUTCDate())
	//{
	//	return false;
	//}
	//	return true;
	}

/**
 * DHTML date validation script. Courtesy of SmartWebby.com (http://www.smartwebby.com/dhtml/)
 * Fixed & enhanced by Horacio Gonzalez (hgonzalezl@lanchile.cl)
 */
// Declaring valid date character, minimum year and maximum year
var dtCh = "-";
var minYear = 1901;
var maxYear = 2070;

function isInteger(s)
	{
	var i;
	for (i = 0; i < s.length; i++)
		{
     // Check that current character is number.
		var c = s.charAt(i);
		if (((c < "0") || (c > "9")))
			{
			return false;
			}
   	}
	// All characters are numbers.
	return true;
	}

function stripCharsInBag(s, bag)
	{
	var i;
	var returnString = "";
	// Search through string's characters one by one.
	// If character is not in bag, append to returnString.
	for (i = 0; i < s.length; i++)
		{
		var c = s.charAt(i);
		if (bag.indexOf(c) == -1)
			{
			returnString += c;
			}
		}
	return returnString;
	}

function daysInFebruary (year)
	{
	// February has 29 days in any year evenly divisible by four,
	// EXCEPT for centurial years which are not also divisible by 400.
	return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
	}

function DaysArray(n)
	{
	for (var i = 1; i <= n; i++)
		{
		this[i] = 31;
		if (i == 4 || i == 6 || i == 9 || i == 11)
			{
			this[i] = 30;
			}
		if (i == 2)
			{
			this[i] = 29;
			}
   	}
   return this;
	}

function isDate(dtStr)
	{
	var daysInMonth = new DaysArray(12);
	var pos1 = dtStr.indexOf(dtCh);
	var pos2 = dtStr.indexOf(dtCh, pos1 + 1);
	var strYear = dtStr.substring(0, pos1);
	var strMonth = dtStr.substring(pos1 + 1, pos2);
	var strDay = dtStr.substring(pos2 + 1);
	strYr = strYear;
	if (strDay.charAt(0) == "0" && strDay.length>1)
		{
		strDay=strDay.substring(1);
		}
	if (strMonth.charAt(0)=="0" && strMonth.length>1)
		{
		strMonth=strMonth.substring(1);
		}
	for (var i = 1; i <= 3; i++)
		{
		if (strYr.charAt(0)=="0" && strYr.length>1)
			{
			strYr=strYr.substring(1);
			}
		}
	month = parseInt(strMonth);
	day = parseInt(strDay);
	year = parseInt(strYr);
	if (pos1 == -1 || pos2 == -1)
		{
		//formato de fecha incorrecto
		return false;
		}
	if (strMonth.length < 1 || month < 1 || month > 12)
		{
		//mes invalido o fuera de rango
		return false;
		}
	if (strDay.length < 1 || day < 1 || day > 31 || (month == 2 && day > daysInFebruary(year)) || day > daysInMonth[month])
		{
		//dia invalido o fuera de rango
		return false;
		}
	if (strYear.length != 4 || year == 0 || year < minYear || year > maxYear)
		{
		//formato de ano incorrecto o invalido o fuera de rango
		return false;
		}
	if (dtStr.indexOf(dtCh, pos2 + 1) != -1 || isInteger(stripCharsInBag(dtStr, dtCh)) == false)
		{
		//formato de fecha incorrecto
		return false;
		}
	return true;
}

function currency_format (monto, moneda)
	{
	var i;
	var symbol;
	var cents;
	if (moneda == 'CLP')
		{
		monto = monto.toFixed(0);
		monto = monto.toString();
		cents = '';
		symbol = '.';
		}
	else if (moneda == 'MILLAS')
        {
        monto = monto.toFixed(0);
        monto = monto.toString();
        cents = '';
        symbol = '.';
        }
	else if (moneda == 'COP')
		{
		monto = monto.toFixed(0);
		monto = monto.toString();
		cents = '';
		symbol = ',';
		}
	else
		{
		monto = monto.toFixed(2);
		monto = monto.toString();
		var vals = monto.split(".");
		monto = vals[0];
		cents = '.' + vals[1];
		symbol = ',';
		}

	for (var i = 0; i < Math.floor((monto.length-(1+i))/3); i++)
		{
		monto = monto.substring(0,monto.length-(4*i+3)) + symbol + monto.substring(monto.length-(4*i+3));
		}
	return monto + cents;
	}


function currency_round_tax(number, currency, tax_code)
	{
	var nf;
	var factor;
	var potencia;
	var resultado;

	if (!tax_code) {
		tax_code = '';
	}

	if (!currency)
		{
		currency = 'CLP';
		}

	if (number >= 0)
		{
		factor = 1;
		}
	else
		{
		factor = -1;
		}

	number = parseFloat(number);

	// ROUNDING OF OTHER CHARGES TO NEAREST 0.01 USD
	// ROUNDING OF OTHER CHARGES TO NEAREST 0.01 CAD
	if (currency == 'USD' || currency == 'CAD')
		{
		resultado = parseFloat(number * 100 + factor * 0.5);
		resultado = Math.floor(resultado);
		resultado = resultado / 100;
		nf = resultado.toFixed(2);
		}
	// ROUNDING OF OTHER CHARGES TO NEAREST 0.10 ARS
	// ROUNDING OF OTHER CHARGES TO NEAREST 0.10 GBP
	else if (currency == 'ARS' || currency == 'GBP')
		{
		resultado = parseFloat(number * 10 + factor * 0.5);
		resultado = Math.floor(resultado);
		resultado = resultado / 10;
		nf = resultado.toFixed(2);
		}
	// ROUNDING OF OTHER CHARGES UP TO 0.10 AUD
	// ROUNDING OF OTHER CHARGES UP TO 0.10 PEN
	// ROUNDING OF OTHER CHARGES UP TO 0.10 NZD
	else if (currency == 'AUD' || currency == 'PEN' || currency == 'NZD')
		{
		number = truncate_value_amadeus(number, 2);
		resultado = parseFloat(number * 10);
		resultado = Math.ceil(resultado);
		resultado = resultado / 10;
		nf = resultado.toFixed(2);
		}
	// ROUNDING OF OTHER CHARGES UP TO 0.01 EUR
	else if (currency == 'EUR' )
		{
		number = truncate_value_amadeus(number, 3);
		resultado = parseFloat(number * 100);
		resultado = Math.ceil(resultado);
		resultado = resultado / 100;
		nf = resultado.toFixed(2);
		}
	// ROUNDING OF OTHER CHARGES DOWN TO 0.01 BRL
	else if (currency == 'BRL')
		{
		resultado = parseFloat(number * 100);
		resultado = Math.floor(resultado);
		resultado = resultado / 100;
		nf = resultado.toFixed(2);
		}
	// ROUNDING OF OTHER CHARGES UP TO 1 CLP
	// ROUNDING OF OTHER CHARGES UP TO 1 BOB
	// ROUNDING OF OTHER CHARGES UP TO 1 DOP
	// ROUNDING OF OTHER CHARGES UP TO 1 MXN
	else if (currency == 'MXN'|| currency == 'CLP' || currency == 'BOB' || currency == 'DOP')
		{
		number = truncate_value_amadeus(number, 1);
		nf = parseInt(Math.ceil(number));
		if (currency != 'CLP' && currency != 'DOP')
			{
			nf = nf.toFixed(2);
			}
		}
	// ROUNDING OF OTHER CHARGES UP TO 0.50 CHF
	else if (currency == 'CHF')
		{
		var decimales = number.match(/[0-9]*\.([0-9]{2})/);
		var decimal = decimales[1];
		if (decimal > 0 && decimal < 50)
			{
			resultado = Math.floor(number);
			resultado = resultado + 0.5;
			}
		else if (decimal >= 50)
			{
			resultado = Math.ceil(number);
			}
		else
			{
			resultado = number;
			}
		nf = resultado.toFixed(2);
		}
	// ROUNDING OF OTHER CHARGES TO NEAREST 0.01 VEF
	else if (currency == 'VEF')
		{
		nf = number.toFixed(2);
		}
	// ROUNDING OF OTHER CHARGES UP TO 100 COP
	else if (currency == 'COP')
		{
			// ** VAT (YS) IS ROUNDED TO NEAREST COP 10 **
			if (tax_code == 'YS') {
				var num = number/10;
				var decimales = num.toString().match(/[0-9]*\.([0-9]{1})/);
				var decimal;
				if (decimales) {
					decimal = decimales[1];
				}
				else {
					decimal = 0;
				}

				if (decimal < 5){
					resultado = Math.floor(number/10);
				}
				else {
					resultado = Math.ceil(number/10);
				}
				resultado = resultado * 10;
				nf = parseInt(resultado);
			}
			else {
				resultado = Math.ceil(number/100);
				resultado = resultado * 100;
				nf = parseInt(resultado);
			}
		}
	// ROUNDING OF OTHER CHARGES UP TO 10 XPF
	else if (currency == 'XPF')
		{
		number = truncate_value_amadeus(number, 1);
		resultado = Math.ceil(number/10);
		resultado = resultado * 10;
		nf = parseInt(resultado);
		}
	// ROUNDING OF OTHER CHARGES UP TO 1 XXX
	else
		{
		nf = parseInt(Math.ceil(number));
		}

	return(parseFloat(nf));
	}


function currency_round_fare(number, currency)
	{
	var nf;
	var factor;

	if (!currency)
		{
		currency = 'CLP';
		}

	if(number >= 0)
		{
		factor = 1;
		}
	else
		{
		factor = -1;
		}

	var potencia;
	var resultado;
	number = parseFloat(number);

	// ROUNDING OF FARES TO NEAREST 1.00 USD
	// ROUNDING OF FARES TO NEAREST 1.00 ARS
	// ROUNDING OF FARES TO NEAREST 1.00 CAD
	// ROUNDING OF FARES TO NEAREST 1.00 GBP
	// ROUNDING OF FARES TO NEAREST 1 BOB
	if (currency == 'USD' || currency == 'ARS' || currency == 'CAD' || currency == 'GBP' || currency == 'BOB')
		{
		nf = parseInt(number + (factor * 0.5));
		if (currency != 'BOB')
			{
			nf = parseFloat(nf);
			nf = nf.toFixed(2);
			}
		}
	// ROUNDING OF FARES UP TO 0.10 PEN
	else if (currency == 'PEN')
		{
		resultado = parseFloat(number * 10);
		resultado = Math.ceil(resultado);
		resultado = resultado / 10;
		nf = resultado.toFixed(2);
		}
	// ROUNDING OF FARES DOWN TO 0.01 BRL
	else if (currency == 'BRL')
		{
		resultado = parseFloat(number * 100);
		resultado = Math.floor(resultado);
		resultado = resultado / 100;
		nf = resultado.toFixed(2);
		}
	// ROUNDING OF FARES UP TO 1 CLP
	// ROUNDING OF FARES UP TO 1 DOP
	// ROUNDING OF FARES UP TO 1.00 EUR
	// ROUNDING OF FARES UP TO 1.00 AUD
	// ROUNDING OF FARES UP TO 1.00 MXN
	// ROUNDING OF FARES UP TO 1.00 NZD
	// ROUNDING OF FARES UP TO 1.00 CHF
	else if (currency == 'CLP' || currency == 'EUR' || currency == 'AUD' || currency == 'MXN' || currency == 'NZD' || currency == 'CHF' || currency == 'DOP')
		{
		number = truncate_value_amadeus(number, 1);
		nf = parseInt(Math.ceil(number));
		if (currency != 'CLP' && currency != 'DOP')
			{
			nf = parseFloat(nf);
			nf = nf.toFixed(2);
			}
		}
	// ROUNDING OF FARES TO NEAREST 100 COP
	else if (currency == 'COP')
		{
		resultado = number/100 + (factor * 0.5);
		resultado = parseInt(resultado);
		nf = resultado * 100;
		}
	// ROUNDING OF FARES TO NEAREST 0.01 VEF
	 else if (currency == 'VEF')
		{
		nf = number.toFixed(2);
		}
	// ROUNDING OF FARES UP TO 100 XPF
	else if (currency == 'XPF')
		{
		resultado = Math.ceil(number/100);
		resultado = resultado * 100;
		nf = parseInt(resultado);
		}
	// ROUNDING OF FARES TO NEAREST 1.00 XXX
	else
		{
		nf = parseInt(number + (factor * 0.5));
		}

	return(nf);
	}


function truncate_value_amadeus(number, precision)
	{
	var result=new Array();
	var numero_s = number.toString();
	var patron = "([0-9]*)\\.([0-9]{" + precision + "})";
	result = numero_s.match(patron);
	var new_number;
	if (result != null)
		{
		new_number =  result[1] + '.' + result[2];
		return parseFloat(new_number);
		}
	else
		{
		return number;
		}
	}

// Funcion permite cambiar el boton de submit por un modelo temporal para
// la espera
function toggle_waiting_button(id)
	{
	var boton = document.getElementById(id);
	if (boton)
		{
		var w = boton.clientWidth + 'px';
		var h = boton.clientHeight + 'px';
		boton.className = 'waiting';
		boton.value = '';
		boton.style.width = w;
		boton.style.height = h;
		boton.disabled = true;
		}
	}

function open_centered_window(url, name, width, height) {
	var y = window.screenTop != undefined ? window.screenTop : window.screenY;
	var x = window.screenTop != undefined ? window.screenLeft: window.screenX;

	var left = parseInt((screen.availWidth/2) - (width/2));
	var top = parseInt((screen.availHeight/2) - (height/2));

	if(x > 0) {
		left = left + x;
	}
	if(y > 0) {
		top = top + y;
	}

	var features = "width=" + width + ",height=" + height + ",status=no,resizable=yes,menubar=no,titlebar=no,left=" + left + ",top=" + top + "screenX=" + left + ",screenY=" + top;
	window.open(url, name, features);
}

function removeCharactersInPhones(f)
	{
		var phoneTypes = ["casa", "celular", "oficina"];
		for(i=0; i<phoneTypes.length;i++)
		{
			removeCharacters(f,phoneTypes[i]);
		}
	}

function removeCharacters(f,tipo)
	{
		var phone = eval("f.elements['telefono_"+ tipo +"_numero']");
		var cityCode = eval("f.elements['telefono_"+ tipo +"_codigo_ciudad']");
		var countryCode = eval("f.elements['telefono_"+ tipo +"_codigo_pais']");

		if (phone) {
			phone.value = replaceCharacters(phone.value);
		}

		if (cityCode) {
			cityCode.value = replaceCharacters(cityCode.value);
		}

		if (countryCode) {
			countryCode.value = replaceCharacters(countryCode.value);
		}

		if(tipo == 'celular') {
			cityCode = eval("f.elements['telefono_"+ tipo +"_codigo_ciudad_aux']");
			if (cityCode) {
				cityCode.value = replaceCharacters(cityCode.value);
			}
		}
	}

function replaceCharacters(value)
	{
	value = value.replace( /[^0-9]/g , '' );
	return value;
	}

function currencyRound( amount, currency ) {
	var amountRounded;
	if ( !currency ) {
		currency = 'CLP';
	}

	if ( currency === 'CLP' || currency === 'COP' ) {
		amountRounded = Math.round(amount);
	}
	else {
		amountRounded = amount.toFixed(2);
	}

	return amountRounded;
}

function apply_other_foid_type_by_home_country(element, pax_type, pax_number, home_country, optional_foid_type, label_optional_foid) {
	var country_selected = element.value;
	var foid_type_select = document.getElementById("pax_"+pax_type+"_"+pax_number+"_foid_tipo");
	if(country_selected != home_country){
		addValueInOption(foid_type_select.options, optional_foid_type, label_optional_foid);
	}
	else{
		removeValueInOption(foid_type_select.options, optional_foid_type);
	}
}

function removeValueInOption(options, value){
	for(var index = 0;index < options.length; index++){
		if(options[index].value === value){
			options.remove(index);
			break;
		}
	}
}

function addValueInOption(options, value, label){
	var exist = false;
	for(var index = 0;index < options.length; index++){
		if(options[index].value === value){
			exist = true;
			break;
		}
	}
	if(!exist){
		var newOption = document.createElement("option");
		newOption.value = value;
		newOption.text = label;
		options.add(newOption);
	}
}

function get_lan_cookie(name)
{
	if (document.cookie.length>0)
	{
		c_start = document.cookie.indexOf(name + "=");
		if (c_start != -1)
		{
			c_start = c_start + name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1)
			{
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}

