(function(){
  "use strict";
  //Prototypejs overwrites getElmentsbByClassName we need to restore it 
  if (typeof HTMLDocument !== 'undefined'  && HTMLDocument.prototype.getElementsByClassName) {
    document.getElementsByClassName = HTMLDocument.prototype.getElementsByClassName;
  } else {
    document.getElementsByClassName = function(search) {
      var d = document, elements, pattern, i, results = [];
      if (d.querySelectorAll) { // IE8
        return d.querySelectorAll("." + search);
      }
      if (d.evaluate) { // IE6, IE7
        pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
        elements = d.evaluate(pattern, d, null, 0, null);
        while ((i = elements.iterateNext())) {
          results.push(i);
        }
      } else {
        elements = d.getElementsByTagName("*");
        pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
        for (i = 0; i < elements.length; i++) {
          if ( pattern.test(elements[i].className) ) {
            results.push(elements[i]);
          }
        }
      }
      return results;
    }
  }

  function getDomain () {
    var host = window.location.host,
      port = host.indexOf(':'),
      parts,
      length,
      domain;

      if( port !== -1 ) {
        host = host.slice(0, port);
      }

      parts = host.split('.');
      length = parts.length;
      domain = host;

      if( length > 1 && isNaN( parts[ length - 1 ] ) ) {
        domain = '.' + parts[ length - 2 ];
        domain += '.' + parts[ length - 1 ];
      }
      if( domain === 'localhost' ) {
        domain = '';
      }
      return ';domain=' + domain + ';path=/;';
  }

  function getCookie(cookieName) {
      var name = cookieName + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0)===' ') c = c.substring(1);
          if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
      }
      return "";
  }

  function setCookie(cookieName, cookieValue, expirationSeconds) {
      var d = new Date();
      d.setTime(d.getTime() + (expirationSeconds*1000));
      var expires = (!!expirationSeconds) ? "expires="+d.toUTCString() : "";
      document.cookie = cookieName + "=" + cookieValue + "; " + expires + getDomain();
  }

  var countrySelector = document.getElementsByClassName("countrySelector-new"),
      csFlagLink = document.getElementsByClassName("countrySelector-new-flagLink")[0],
      dropDownCs = document.getElementById('header-dropDown'),
      caret = document.getElementsByClassName("countrySelector-new-flagCaret")[0],
      toggleClick = false;

      countrySelector[0].addEventListener('mouseleave', function(e){
        openContrySelector(true,e);
      });

      csFlagLink.addEventListener('click', function(e){
          openContrySelector(false,e);
      });

  function openContrySelector(close,event) {
      if ( toggleClick === false && close !== true ) {
        //dropDownCs.className += " visible";
        caret.className = "countrySelector-new-flagCaret icon-caret-up";
        csFlagLink.setAttribute('aria-expanded', true);
        dropDownCs.setAttribute('aria-hidden', false);
        csFlagLink.firstLink.focus();
        toggleClick = true;
      } else {
        dropDownCs.className = "countrySelector-new-dropDown Sub-Menu";
        csFlagLink.setAttribute('aria-expanded', 'false');
        dropDownCs.setAttribute('aria-hidden', 'true');
        caret.className = "countrySelector-new-flagCaret icon-caret-down";
        csFlagLink.setAttribute('aria-expanded', false);
        dropDownCs.setAttribute('aria-hidden', true);
        countrySelector[0].className = countrySelector[0].className.replace('isOpen', '');
        toggleClick = false;
      }
    event.preventDefault();
  }

  function setCookieCS(valor_cookie, homeinfo) {
    var dDate = new Date();
    var pcom_date = parseInt(Date.UTC(dDate.getUTCFullYear(),dDate.getUTCMonth(),dDate.getUTCDate(),dDate.getUTCHours(),dDate.getUTCMinutes(),dDate.getUTCSeconds(),dDate.getUTCMilliseconds())/1000);
    var expiration = 60*60*24;
    setCookie('pcom', valor_cookie, expiration);
    setCookie('homeInfo', homeinfo, expiration);
    setCookie('pcom_date', pcom_date, expiration);
    setCookie('pcom_new_home1', "1", expiration);
    setCookie('pcom_new_home2', "1", expiration);
    setCookie('stop_mobi',"yes",1);
  }


  function changeCountry(e){
    var valor_cookie =e.target.getAttribute('data-pcom'),
        homeinfo = e.target.getAttribute('data-homeinfo');

    setCookieCS(valor_cookie,homeinfo)

  }

  var links =  document.getElementsByClassName('countrySelector-new-unorderedLink');
  for(var i = 0 ; i < links.length ; i++){
    links[i].addEventListener('click', function(e){
        changeCountry(e)
    });
    links[i].addEventListener('keydown', function(e){
        if( e.keyCode == 27){
            caret.className = "countrySelector-new-flagCaret icon-caret-down";
            countrySelector[0].className = countrySelector[0].className.replace('isOpen', '');
            toggleClick = false;
        }
        if(e.keyCode == 13){
           changeCountry(e);
        }
    });
  }

  function closeCountrySelector(e) {
      openContrySelector(true, e);
      toggleClick = false;
  }

  var complementaryLinks = document.getElementsByClassName('Header-complementaryLink');
  for (i = 0; i < complementaryLinks.length; i++) {
    complementaryLinks[i].addEventListener('focus', closeCountrySelector);
  }
  document.getElementById('header-flagLink').addEventListener('focus', closeCountrySelector);
})();

