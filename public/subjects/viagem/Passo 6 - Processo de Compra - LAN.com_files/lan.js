
var W3C = document.getElementById? true : false; // IE5+, Netscape 6+, Opera 5+, Konqueror 2.1+, Mozilla and various Mozilla/Gecko-based browsers.
var NN4 = document.layers? true : false; //Netscape Navigator 4.x.
var IE4 = document.all? true : false; // IE version 4 (and above).

function valida_email(txt)
	{
	var idx_at,tstr,idx_dot;

	idx_at = txt.indexOf("@",0);
	tstr = txt.substring(idx_at+1);
	idx_dot = tstr.indexOf(".",0);
	var emailRegEx = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");

	if(idx_at < 1 || idx_dot < 1 || idx_dot > tstr.length-3 || !emailRegEx.test(txt.toLowerCase()))
		{
		return(false);
		}
	return(true);
	}
// isAlpha2: devuelve verdadero si la cadena contiene solo caracteres alfabeticos o espacios m�s acentos
function isAlpha2(value)
	{
	var pattern=new RegExp("^[�-��-��-��-�a-zA-Z��'\\-\\s]+$");
	return value.match(pattern);
	}

// isAlpha: devuelve verdadero si la cadena contiene solo caracteres alfabeticos o espacios
function isAlpha(value)
	{
	var pattern=new RegExp("^[a-zA-Z��'\\-\\s]+$");
	return value.match(pattern);
	}

// isPhone: devuelve verdadero si la cadena contiene solo caracteres validos de telefono
function isPhone(value)
  {
  var pattern=new RegExp("^[0-9\\(\\)\\-\\s]+$");
  return value.match(pattern);
  }

// isAlphaDigit: devuelve verdadero si la cadena contiene solo caracteres alfabeticos o numeros
function isAlphaDigit(value)
	{
	var pattern=new RegExp("^[a-zA-Z0-9]+$");
	return value.match(pattern);
	}


function LTrim(value)
	{
	var pattern=new RegExp("^\\s+", "g")
	return value.replace(pattern, "");
	}

function RTrim(value)
	{
	var pattern=new RegExp("\\s+$", "g")
	return value.replace(pattern, "");
	}

function Trim(value)
	{
	return RTrim(LTrim(value));
	}



function mClk(src)
	{
	if (typeof event == 'undefined')
		{
		return;
		}
	if (event && event.srcElement && event.srcElement.tagName == 'TD')
		{
		src.children.tags('A')[0].click();
		}
	}


function getElemById(id)
	{
	var elem = document.all ? document.all[id] : document.getElementById(id);

	if (!elem)
		{
		return;
		}

	return elem;
	}

function show_layer(layerId)
	{
	if (W3C)
		{
		document.getElementById(layerId).style.visibility = "visible";
		}
	else if (IE4)
		{
		document.all[layerId].style.visibility = "visible";
		}
	else if(NN4)
		{
		document.layers[layerId].visibility = "show";
		}
	}


function hide_layer(layerId)
	{
	if (W3C)
		{
		document.getElementById(layerId).style.visibility = "hidden";
		}
	else if (IE4)
		{
		document.all[layerId].style.visibility = "hidden";
		}
	else if(NN4)
		{
		document.layers[layerId].visibility = "hidden";
		}
	}

function display_block_layer(layerId)
	{
	if (W3C)
		{
		document.getElementById(layerId).style.display = "block";
		}
	else if (IE4)
		{
		document.all[layerId].style.display = "block";
		}
	else if(NN4)
		{
		document.layers[layerId].display = "block";
		}
	}


function display_none_layer(layerId)
	{
	if (W3C)
		{
		document.getElementById(layerId).style.display = "none";
		}
	else if (IE4)
		{
		document.all[layerId].style.display = "none";
		}
	else if(NN4)
		{
		document.layers[layerId].display = "none";
		}
	}

function setRadioValue (radioButtonOrGroup, valor)
	{
	var b;
	if (radioButtonOrGroup.length)
		{
		for (b = 0; b < radioButtonOrGroup.length; b++)
			{
			if (radioButtonOrGroup[b].value == valor)
				{
				radioButtonOrGroup[b].checked = true;
				}
			}
		}
	else if (radioButtonOrGroup.value == valor)
		{
		radioButtonOrGroup.checked = true;
		}
	}

function setSelectValue (dropDownMenu, valor)
	{
	for (var i=0; i < dropDownMenu.length; i++) 
		{
		if (dropDownMenu[i].value == valor) 
			{
			dropDownMenu[i].selected = true;
			}
		}
	}

function getRadioValue (radioButtonOrGroup)
	{
	if (typeof(radioButtonOrGroup) == 'undefined')
		{
		return null;
		}
	
	var value = null;
	var b;
	if (radioButtonOrGroup.length)
		{
		for (b = 0; b < radioButtonOrGroup.length; b++)
			{
			if (radioButtonOrGroup[b].checked)
				{
				value = radioButtonOrGroup[b].value;
				}
			}
		}
	else if (radioButtonOrGroup.checked)
		{
		value = radioButtonOrGroup.value;
		}
	return value;
	}

function mover(){
if (screen.availWidth == 640) window.moveTo(5,5);
if (screen.availWidth == 800) window.moveTo(5,5);
if (screen.availWidth == 1024) window.moveTo(5,5);
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);

function MM_showHideLayers() { //v3.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v='hide')?'hidden':v; }
    obj.visibility=v; }
}

function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

function tmt_findObj(n){
	var x,t; if((n.indexOf("?"))>0&&parent.frames.length){t=n.split("?");
	x=eval("parent.frames['"+t[1]+"'].document.getElementById('"+t[0]+"')");
	}else{x=document.getElementById(n)}return x;
}

function mOvr(src,clrOver){
	if (!event)
		{
		return;
		}
	if (!src.contains(event.fromElement)){
		src.style.cursor = 'default';
		src.bgColor = clrOver;
	}
}
function mOut(src,clrIn){
	if (!event)
		{
		return;
		}
	if (!src.contains(event.toElement)){
		src.style.cursor = 'default';
		src.bgColor = clrIn;
	}
}

function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}

function tmt_showhideAll(c){
	var v = (document.layers) ? ".visibility" : ".style.visibility";
	var arr = (document.layers) ? document.layers : (document.all) ? document.all.tags("DIV") : document.getElementsByTagName("DIV");
	for(var i=0;i<arr.length;i++){eval("arr["+i+"]"+v+"='"+c+"'");}
}

function MM_goToURL() { //v3.0
  var i, args=MM_goToURL.arguments; document.MM_returnValue = false;
  for (i=0; i<(args.length-1); i+=2) eval(args[i]+".location='"+args[i+1]+"'");
}

// Empty: devuelve verdadero si value es vacio
function Empty(value) {
	var pattern=new RegExp("\^[ ]*$");
	return value.match(pattern);
}

function IsRut(theRut)
	{
	rut = theRut;
	var tmpstr = "";
	largo = rut.length;
	for ( i=0; i < largo; i++ )
		{
		if ( rut.charAt(i) != ' ' && rut.charAt(i) != '.' && rut.charAt(i) != '-' )
			{
			tmpstr = tmpstr + rut.charAt(i);
			}
		}
	rut = tmpstr;
	largo = rut.length;
	if ( largo < 2 )
		{
		return false;
		}

	for (i=0; i < largo ; i++ )
		{
		if ( rut.charAt(i) !="0" && rut.charAt(i) != "1" && rut.charAt(i) !="2" && rut.charAt(i) != "3" && rut.charAt(i) != "4" && rut.charAt(i) !="5" && rut.charAt(i) != "6" && rut.charAt(i) != "7" && rut.charAt(i) !="8" && rut.charAt(i) != "9" && rut.charAt(i) !="k" && rut.charAt(i) != "K" )
			{
			return false;
			}
		}
	var dtexto = "";
	cnt = 0;
	for ( i=largo-1, j=largo-1+3; i>=0; i--, j-- )
		{
		if ( cnt == 3 )
			{
			dtexto = rut.charAt(i) + dtexto;
			dtexto = '.' + dtexto;
			cnt = 1;
			}
		else
			{
			dtexto = rut.charAt(i) + dtexto;
			if( cnt == 0 )
				{
				dtexto = '-' + dtexto;
				}
			cnt++;
			}
		}
	return checkDV(rut);
	}


function checkDV( crut )
	{
	largo = crut.length;
	if ( largo > 2 )
		{
		rut = crut.substring(0, largo - 1);
		}
	else
		{
		rut = crut.charAt(0);
		}

	dv = crut.charAt(largo-1);
	if ( rut == null || dv == null )
		{
		return 0;
		}

	var dvr = '0';
	suma = 0;
	mul  = 2;
	for (i = rut.length - 1 ; i >= 0; i--)
		{
		suma += rut.charAt(i) * mul;
		if (mul == 7)
			{
			mul = 2;
			}
		else
			{
			mul++;
			}
		}
	res = suma % 11;
	if (res == 1)
		{
		dvr = 'k';
		}
	else if (res == 0)
		{
		dvr = '0';
		}
	else
		{
		dvi = 11-res;
		dvr = dvi + "";
		}

	if ( dvr != dv.toLowerCase() )
		{
		return false;
		}

	return true;
	}

// isInteger: devuelve verdero si value es un entero
function isInteger(value)
	{
	var pattern=new RegExp("^[0-9]+$");
	return value.match(pattern);
	}

// isIcluded: devuelve verdadero si script ha sido incluido
function isIncluded(script)
	{
	// Acepta nombres especificos o genericos
	var re_name = new RegExp("^(?:https?\\:\\/\\/[^\\/]+\\/)?(.+)(\\.js)?");
	var resp = script.match(re_name);
	
	if (resp[1])
		{
		script = resp[1];
		}
	else
		{
		return false;
		}
	
	// Los que estan directamente como tag en el codigo
	var scripts = document.getElementsByTagName('script');
	if (!scripts)
		{
		return false;
		}
	var re = new RegExp(script + "(-...)?(-[A-Za-z]{2}-[A-Za-z]{2})?(\\.js)?(\\?.*)?$");
	for (var s = 0; s < scripts.length; ++s)
		{
		if (scripts[s].src && scripts[s].src.match(re))
			{
			return true;
			}
		}

	// Los que fueron cargados dentro de un paquete
	if (!window.loaded_files)
		{
		return false;
		}
	for (var s = 0; s < window.loaded_files.length; ++s)
		{
		if (window.loaded_files[s] && window.loaded_files[s].match(re))
			{
			return true;
			}
		}
	
	return false;
	}

// Esta funcion devuelve los valores de los parametros pasados a la pagina
function query_param(arg_name)
	{
	var query = window.location.search.substring(1);
	var parms = query.split('&');
	
	for (var i=0; i < parms.length; i++) 
		{
		var pos = parms[i].indexOf('=');
		if (pos > 0) 
			{
			var key = parms[i].substring(0,pos);
			var val = parms[i].substring(pos+1);
			if (key == arg_name)
				{
				return unescape(val);
				}
			}
		}

	return '';
	}

// Esta funcion manda a la pagina de loggeo, y despues devuelve a donde estaba
function redirect_to_login_page()
	{
	var curr_location = window.location.href;
	var return_path = window.location.pathname + window.location.search;

	var pattern = new RegExp("^http://([^/\.]+)\.dev\.lan\.com/");
	if (curr_location.match(pattern))
		{
		window.location = '/cgi-bin/site_login.cgi?page=' + escape(return_path);
		}
	else
		{
		window.location = 'https://ssl.lan.com/cgi-bin/site_login.cgi?page=' + escape(return_path);
		}
	}

/////////////////////////////
// Funciones para evitar que Internet Explorer bloquee los flash y Macromedia.
//v1.0
//Copyright 2006 Adobe Systems, Inc. All rights reserved.
function AC_AddExtension(src, ext)
{
  if (src.indexOf('?') != -1)
    return src.replace(/\?/, ext+'?'); 
  else
    return src + ext;
}

function AC_Generateobj(objAttrs, params, embedAttrs) 
{ 
  var str = '<object ';
  for (var i in objAttrs)
    str += i + '="' + objAttrs[i] + '" ';
  str += '>';
  for (var i in params)
    str += '<param name="' + i + '" value="' + params[i] + '" /> ';
  str += '<embed ';
  for (var i in embedAttrs)
    str += i + '="' + embedAttrs[i] + '" ';
  str += ' ></embed></object>';

  document.write(str);
}

function AC_FL_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_SW_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".dcr", "src", "clsid:166B1BCA-3F9C-11CF-8075-444553540000"
     , null
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    

    switch (currArg){	
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":	
        args[i+1] = AC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblClick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "width":
      case "height":
      case "align":
      case "vspace": 
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "id":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}


function validar_cpf(cpf)
	{
	var resultado_multiplicacion = 0;
	var resto = 0;
	var primer_digito_verificador = 0;
	var segundo_digito_verificador = 0;
	var digitos_verificadores_calculados = '';
	var digitos_verificadores = cpf.substring(9, 11);
	var cpf_corto = cpf.substring(0, 9);
	var multiplicador = 10;
	var vector_cpf = [];

	for (i = 0; i < 11; i++)
		{
		vector_cpf[i] = cpf.charAt(i);
		
		if (i < 9)
			{
			resultado_multiplicacion += vector_cpf[i] * multiplicador;
			multiplicador--;
			}
		}
	
	resto = resultado_multiplicacion % 11;
	if (resto < 2)
		{
		primer_digito_verificador = 0;
		}
	else
		{
		primer_digito_verificador = 11 - resto;
		}
		
	resultado_multiplicacion = 0;
	multiplicador = 11;

	for (j = 0; j < 9; j++)
		{
		resultado_multiplicacion +=  vector_cpf[j] * multiplicador;
		multiplicador--;
		}
	resultado_multiplicacion += primer_digito_verificador * 2;

	resto = resultado_multiplicacion % 11;	
	if (resto < 2)
		{
		segundo_digito_verificador = 0;
		}
	else
		{
		segundo_digito_verificador = 11 - resto;
		}
	
	if (vector_cpf[9] == primer_digito_verificador && vector_cpf[10] == segundo_digito_verificador)
		{
		return (1);
		}
	
	return (0);
	}


// Fin Dreamweaver Active-content
/////////////////////////////////

/******************************************************************************/
/* WAITING */
function processing_layer(layer_to_hide, interval)
	{
	if (document.getElementById('waiting'))
		{
		document.getElementById(layer_to_hide).style.display = 'none';
		document.getElementById('waiting').style.display = 'block';
		/*if (interval == null)
			{
			interval = 3000;
			}
		window.setInterval('test()', interval)*/
		}
	}

/******************************************************************************/
/* FUNCIONES SITIO 2K8 */
function getElementsByClassName(className, tag, elm)
	{
	var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++)
		{
		current = elements[i];
		if(testClass.test(current.className))
			{
			returnElements.push(current);
			}
		}
	return returnElements;
	}

function navegar(modulo,vinculo)
	{
	cuerpos=getElementsByClassName("modulo");
	var menu_navegacion = document.getElementById("menu_navegacion");
	if (menu_navegacion == null)
		{
		menu_navegacion = document.getElementById("menu_navegacion_programas");
		}
	vinculos = menu_navegacion.getElementsByTagName("td");
	//reiniciar
	var vinculoName = "";
	var cuerposName = "";
	for(i=0;i<vinculos.length;i++)
		{
		vinculos[i].className="";
		}
	for(i=0;i<cuerpos.length;i++)
		{
		if (typeof(cuerpos[i]) != 'undefined')
			{
			cuerpos[i].className="modulo";
			}
		}

	if (!$(modulo))
		{
		return;
		}

	$(vinculo).className="seleccionado";
	$(modulo).className+=" visible";
	// add-on para cargar mis-reservas
	var lan_session = document.cookie.match(new RegExp('(^|;)\\s*' + escape('lan_session') + '=([^;\\s]*)'));
	if (modulo == 'mis_reservas' && lan_session && typeof(Dynamic_Components) != 'undefined')
		{
		if (!window.mis_reservas_loaded)
			{
			window.mis_reservas_loaded = 1;
			
			// mensaje de cargando
			if (document.getElementById("mis_reservas_loading"))
				{
				document.getElementById("mis_reservas").innerHTML = document.getElementById("mis_reservas_loading").innerHTML;
				}

			// cargo la componente
			Dynamic_Components.refresh_component(
				"mis_reservas",
				"99",
				null,
				null,
				function()
					{
					window.mis_reservas_loaded = 0;
					//alert('Error al cargar mis reservas');
					}
				);
			}		
		}
	if (modulo == 'estado_cuenta' && lan_session && typeof(Dynamic_Components) != 'undefined')
		{
		if (!window.estado_cuenta_loaded)
			{
			window.estado_cuenta_loaded = 1;
			
			// mensaje de cargando
			if (document.getElementById("estado_cuenta_loading"))
				{
				document.getElementById("estado_cuenta").innerHTML = document.getElementById("estado_cuenta_loading").innerHTML;
				}

			// cargo la componente
			Dynamic_Components.refresh_component(
				"estado_cuenta",
				"101",
				null,
				null,
				function()
					{
					window.estado_cuenta_loaded = 0;
					//alert('Error al cargar Estado de cuenta');
					}
				);
			}		
		}
//en home cl se ocupa el mismo componente caja_hotel_auto para los vinculos hotel, auto y hotel_auto	
	if (vinculo == 'vinculo_hotel')
		{
		document.getElementById('bloque_vuelo_auto').style.display = 'none';
		document.getElementById('bloque_vuelo_hotel').style.display = 'none';
		document.getElementById('bloque_vuelo_auto_hotel').style.display = 'none';
		document.getElementById('bloque_solo_auto').style.display = 'none';
		document.getElementById('bloque_solo_hotel').style.display = 'block';
		document.getElementById('bloque_texto_titulo_hotel').style.display = 'block';
		document.getElementById('bloque_texto_titulo_auto').style.display = 'none';
		document.getElementById('bloque_texto_titulo_vacaciones').style.display = 'none';
		document.paso1_ezrez.tipo_compra_ezrez[2].checked = 'true';
		muestra_campos(document.paso1_ezrez);
		habilita_lista_destino();
		}
	else if (vinculo == 'vinculo_auto')
		{
		document.getElementById('bloque_vuelo_auto').style.display = 'none';
		document.getElementById('bloque_vuelo_hotel').style.display = 'none';
		document.getElementById('bloque_vuelo_auto_hotel').style.display = 'none';
		document.getElementById('bloque_solo_auto').style.display = 'block';
		document.getElementById('bloque_solo_hotel').style.display = 'none';
		document.getElementById('bloque_texto_titulo_hotel').style.display = 'none';
		document.getElementById('bloque_texto_titulo_auto').style.display = 'block';
		document.getElementById('bloque_texto_titulo_vacaciones').style.display = 'none';
		document.paso1_ezrez.tipo_compra_ezrez[3].checked = 'true';
		muestra_campos(document.paso1_ezrez);
		habilita_lista_destino();
		}
	else if (vinculo == 'vinculo_hotel_auto')
		{
		document.getElementById('bloque_vuelo_auto').style.display = 'none';
		document.getElementById('bloque_vuelo_hotel').style.display = 'none';
		document.getElementById('bloque_vuelo_auto_hotel').style.display = 'none';
		document.getElementById('bloque_solo_auto').style.display = 'block';
		document.getElementById('bloque_solo_hotel').style.display = 'block';
		document.paso1_ezrez.tipo_compra_ezrez[2].checked = 'true';
		muestra_campos(document.paso1_ezrez);
		habilita_lista_destino();
		}
	else if (vinculo == 'vinculo_vacaciones')
		{
		document.getElementById('bloque_vuelo_auto').style.display = 'block';
		document.getElementById('bloque_vuelo_hotel').style.display = 'block';
		document.getElementById('bloque_vuelo_auto_hotel').style.display = 'block';
		document.getElementById('bloque_solo_auto').style.display = 'none';
		document.getElementById('bloque_solo_hotel').style.display = 'none';
		document.getElementById('bloque_texto_titulo_hotel').style.display = 'none';
		document.getElementById('bloque_texto_titulo_auto').style.display = 'none';
		document.getElementById('bloque_texto_titulo_vacaciones').style.display = 'block';
		document.paso1_ezrez.tipo_compra_ezrez[0].checked = 'true';
		muestra_campos(document.paso1_ezrez);
		deshabilita_lista_destino();
		}	

	}

	
function noticias(tipo,txt)
	{
	if(txt) 
		{
		if(txt==" ") 
			{ 
			contenido=""; 
			}
		else
			{ 
			contenido='<div id="'+tipo+'"><img src="/images/common/ico_alerta.gif" alt="">'+txt+'</div>'; 
			}
		
		document.getElementById("info").innerHTML=contenido;
		}
	else 
		{
		document.getElementById("info").innerHTML=contenido_inicial;
		}
	}

function abrir(obj, tiene_hijos)
	{
	vinculos=document.getElementsByClassName("stretch");
	estado=0;
	
	//reiniciar
	for(i=0;i<vinculos.length;i++)
		{
		css=vinculos[i].className;
		if(css.substr(css.length-2) == "on")
			{
			if(vinculos[i].id==obj) 
				{ 
				estado=1; 
				}

			vinculos[i].className=css.substr(0,css.length-2);
			}
		}
	
	if(tiene_hijos && estado==0)
		{	
		document.getElementById(obj).className+=" on";
		}
	}

function a_external()
	{
	var a,l,i,d = document;
	if (!d.getElementsByTagName) return;
	a = d.getElementsByTagName("a");
	for (i = 0; i < a.length; i++)
		{
		l = a[i];
		if (l.getAttribute("href") && l.getAttribute("rel") == "external")
			{
			l.target = "_blank";
			}
		}
	}

function cerrarStretchersInteriores(padre)
	{
	for(i=0;i<myStretcher.length;i++)
		{
		if(padre=='todos' && myStretcher[i].offsetHeight>0)
			{
			myStretch[i].className="stretch cerrado";
			myAccordion.fxa[i].toggle();
			}
		else
			{
			if(myStretcher[i].parentNode==padre && myStretcher[i].offsetHeight>0)
				{
				myStretch[i].className="stretch cerrado";
				myAccordion.fxa[i].toggle();
				}
			}
		}
	}

function esInterior(id)
	{
	var interior=true;
	if(myStretcher[id].parentNode.id=="despliegues") interior=false;
	return interior;
	}

function destacar(objeto)
	{
	var inactivo="stretch abrierto";
	var activo="stretch cerrado";
	for(i=0;i<myStretcher.length;i++)
		{
		x=myStretcher[i];
		if(x!=objeto)
			{
			x.className=inactivo;
			}
		}

	if(objeto.className==activo)
		{
		objeto.className=inactivo;
		}
	else
		{
		objeto.className=activo;
		}
	}


// Cierro menus verticales y otros detalles luego de cargar la pagina
if (!window.lan_js_loaded)
	{
	var prev_onload = window.onload;

	window.onload = function()
		{
		if (prev_onload)
			{
			prev_onload();
			}

		// Cambia los links externos
		a_external();

		// La noticia en la barra debajo del menu
		if (document.getElementById("info"))
			{
			contenido_inicial = document.getElementById("info").innerHTML;
			}
		
		// Setup del menu acordeon
		var myStretch = getElementsByClassName('stretch');
		var myStretcher = getElementsByClassName('stretcher');
		if(myStretch != "" && typeof(fx.Accordion) != 'undefined')
			{
			fi = typeof fadeIn!="undefined"?true:false;
			du = typeof segundosDeDuracion!="undefined"?segundosDeDuracion*1000:500;
			mi = typeof mostradoInicial!="undefined"?mostradoInicial:"undefined";
			di = typeof desplegadoInicial!="undefined"?desplegadoInicial:"undefined";
			fca = typeof funcionarComoAcordeon!="undefined"?funcionarComoAcordeon:1;

			//setea las propiedades para el acordeon
			myAccordion = new fx.Accordion(myStretch, myStretcher, {
				opacity: fi,
				duration: du,
				show: mi,
				display: di
				});
			}
		};
		
	window.lan_js_loaded = 1;
	}


//borra texto que este en un edit con un click
function borra_texto_edit(input, default_txt)
	{
	if(input.value == default_txt)
		{
		input.value = '';
		}
	}

if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){  
	var ieversion=new Number(RegExp.$1)  
} 

var focusedElementBeforeModal;

function showLightbox_espera_procesa_pago(layer) { 

	// guarda foco
	focusedElementBeforeModal = document.activeElement;

	window.scrollTo(0,0); 
	document.getElementById(layer).style.display='block'; 

	// pasar el foco a la modal
	document.getElementById(layer).firstElementChild.focus();

	document.getElementById('fade_layer_espera').style.display='block'; 
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) 
	{ 
		if (ieversion>=6) 
			selects = document.getElementsByTagName("select"); 
		for (i = 0; i != selects.length; i++) { 
			selects[i].style.visibility = "hidden"; 
		} 
	} 

	// Sale con ESC
	if( document.getElementById('layer_general') !== null) {
		document.getElementById('layer_general').onkeydown = function(event) {
            		if (event.keyCode == 27) {
                        	hideLightbox_espera_procesa_pago(this.getAttribute('id'));
            		}
        			// Navega con TAB dentro de la modal
					if (event.keyCode == 9 ) {
						trapTabKeyFare(jQuery(this),event);
					}
    		};
	}
}

function trapTabKeyFare(obj,evt) {
	
	// if tab or shift-tab pressed
	if ( evt.which == 9 ) {
		
		// get list of all children elements in given object
		var o = obj.find('*');

		// get list of focusable items
		var focusableItems;
		focusableItems = o.filter(focusableElementsString).filter(':visible')

		// get currently focused item
		var focusedItem;
		focusedItem = jQuery(':focus');

		// get the number of focusable items
		var numberOfFocusableItems;
		numberOfFocusableItems = focusableItems.length

		// get the index of the currently focused item
		var focusedItemIndex;
		focusedItemIndex = focusableItems.index(focusedItem);

		if (evt.shiftKey) {
			//back tab
			// if focused on first item and user preses back-tab, go to the last focusable item
			if(focusedItemIndex==0){
				focusableItems.get(numberOfFocusableItems-1).focus();
				evt.preventDefault();
			}
			
		} else {
			//forward tab
			// if focused on the last item and user preses tab, go to the first focusable item
			if(focusedItemIndex==numberOfFocusableItems-1){
				focusableItems.get(0).focus();
				evt.preventDefault();				
			}
		}
	}

}


function hideLightbox_espera_procesa_pago(layer) { 
	if (document.getElementById('content_layer_espera_proceso')) {
		document.getElementById('content_layer_espera_proceso').innerHTML = "<div style='text'<br><img src='/images/cajero/wait_pago.gif'><br>";
	}

	document.getElementById(layer).style.display='none'; 
	document.getElementById('fade_layer_espera').style.display='none'; 
	
    // set focus back to element that had it before the modal was opened
    focusedElementBeforeModal.focus();

	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) 
	{ 

		selects = document.getElementsByTagName("select"); 
		for (i = 0; i != selects.length; i++) { 
			selects[i].style.visibility = "visible"; 
		} 
	} 
}

function trapEscapeKeyTarifa(obj, evt) {

    // if escape pressed
    if (evt.which == 27) {
		hideLightbox_espera_procesa_pago(obj.attr('id'));
    }

}

/***********************************************
 * Dynamic Ajax Content- © Dynamic Drive DHTML code library (www.dynamicdrive.com)
 * This notice MUST stay intact for legal use
 * Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code
 ***********************************************/

var loadedobjects=""
var rootdomain='http://' + window.location.hostname

function ajaxpage(url, containerid){
	var page_request = false
		if (window.XMLHttpRequest) // if Mozilla, Safari etc
			page_request = new XMLHttpRequest()
		else if (window.ActiveXObject){ // if IE
			try {
				page_request = new ActiveXObject("Msxml2.XMLHTTP")
			} 
			catch (e){
				try{
					page_request = new ActiveXObject("Microsoft.XMLHTTP")
				}
				catch (e){}
			}
		}
		else
			return false
				page_request.onreadystatechange=function(){
					loadpage(page_request, containerid)
				}
	page_request.open('GET', url, true)
		page_request.send(null)
}

function loadpage(page_request, containerid) {
	if (page_request.readyState == 4 && (page_request.status==200 || window.location.href.indexOf("http")==-1)) {
		document.getElementById(containerid).innerHTML=page_request.responseText
	}
}

function loadobjs() {
	if (!document.getElementById) {
		return
	}
	for (i=0; i<arguments.length; i++) {
		var file=arguments[i]
			var fileref=""
			if (loadedobjects.indexOf(file)==-1) { //Check to see if this object has not already been added to page before proceeding
				if (file.indexOf(".js")!=-1) { //If object is a js file
					fileref=document.createElement('script')
						fileref.setAttribute("type","text/javascript");
					fileref.setAttribute("src", file);
				}
				else if (file.indexOf(".css")!=-1) { //If object is a css file
					fileref=document.createElement("link")
						fileref.setAttribute("rel", "stylesheet");
					fileref.setAttribute("type", "text/css");
					fileref.setAttribute("href", file);
				}
			}
		if (fileref!="") {
			document.getElementsByTagName("head").item(0).appendChild(fileref)
				loadedobjects+=file+" " //Remember this object as being already added to page
		}
	}
}


////////////// TOOL-TIP 
// // Simple follow the mouse script
// copyright Stephen Chapman, 30th September 2005
// you may copy this script provided that you retain the copyright notice

var divName = 'following_tooltip'; // div that is to follow the mouse
var offX = 15;         // X offset from mouse position
var offY = 25;         // Y offset from mouse position
var impuestos_ida, impuestos_vuelta;
var total_q = 0;

// no changes required below this line
function mouseX(evt)
	{
	if (!evt) evt = window.event; 
	if (evt.pageX) return evt.pageX; 
	else if (evt.clientX)return evt.clientX + (document.documentElement.scrollLeft ?  document.documentElement.scrollLeft : document.body.scrollLeft); 
	else return 0;
	}
function mouseY(evt)
	{
	if (!evt) evt = window.event; 
	if (evt.pageY) return evt.pageY; 
	else if (evt.clientY)return evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop); 
	else return 0;
	} 
function follow(evt)
	{
	if (document.getElementById)
		{
		var obj = document.getElementById(divName).style; 
		obj.visibility = 'visible'; 
		obj.left = (parseInt(mouseX(evt))+offX) + 'px';
		obj.top = (parseInt(mouseY(evt))+offY) + 'px';
		}
	} 

function activa_ttip(id_ttip, id_class, divNameOptional,idContentLayer)
	{
	if (divNameOptional) {
		divName = divNameOptional;
	}
	else {
		divName = 'following_tooltip';
	}
	if (idContentLayer) {
		var zIndexNew=parseInt(jQuery('#'+idContentLayer).css('zIndex'))+1;
		document.getElementById(divName).style.zIndex=zIndexNew;
	}
	var obj = document.getElementById(divName);
	obj.innerHTML = document.getElementById(id_ttip).innerHTML;
	obj.className = id_class;
	obj.style.visibility='visible';
	document.onmousemove = follow;
	}
function desactiva_ttip()
	{
	var obj = document.getElementById(divName);
	obj.className="";
	obj.innerHTML="";
	obj.style.visibility = 'hidden';
	document.onmousemove = '';
	}

function limpia_input_buscador(input) 
	{
		var valor;
		$(input).focus(function() {
			valor = $(input).val();
			if (valor == 'Buscador') {
				$(input).val("");
				$(input).attr("class", "default_text_buscador_focus input_busuqeda_aplicacion");
			}
		});
		
		$(input).blur(function() {
			valor = $(input).val();
			if (valor == "") {
				$(input).val("Buscador");
				$(input).attr("class", "default_text_buscador input_busuqeda_aplicacion");
			}
		});
	}

function limpia_buscador_form() 
	{
		$("#inputBuscador").val("Buscador");
		$("#inputBuscador").attr("class", "default_text_buscador input_busuqeda_aplicacion");
	}

function clean_menu_header() {
	$(document).ready(function(){
		var linkArray = $('a');
		var cont = 0;
		$(linkArray).each(function(){
			var hrefVal = $(this).attr("href");
			if (hrefVal == "") {
				$(this).attr("href", "javascript:void(null);");
			}
		});
	});
}
