if(typeof SkipToContent == 'undefined') {
    // Prototype.js overwrites getElmentsbByClassName we need to restore it 
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

    SkipToContent = {
        init: function() {
            var self = this;
            var sktcs = document.getElementsByClassName('lan-skip-to-content');
            if(sktcs.length > 0) { 
		var sktc = sktcs[0];
                if(sktc) {
                    sktc.addEventListener('focus', function(e) {
                        self.loopHeader('add');
                    }, true);
                    sktc.addEventListener('blur', function(e) {
                        self.loopHeader('remove');
                    }, true);
                    sktc.addEventListener('click', function(e) {
                        e.preventDefault();
                        self.loopHeader('remove');
                        var soc = document.getElementById('start-of-content') || document.getElementById('contenido-proceso');
                        if(soc) {
                            if(/webkit/.test(navigator.userAgent.toLowerCase())) {
                                window.location.href = window.location.href.replace(/#[a-zA-Z0-9_-]+/g,'') + '#' + soc.id;
                            } else {
                                window.location.hash = '#' + soc.id;
                            }
                            soc.setAttribute('tabindex',-1);
                            soc.focus();
			    soc.removeAttribute('tabindex');
                        }
                    }, true);
                }
            }
        },
        hasClass: function(e, c) {
            return (e.className.split(' ').filter(function(n){ return typeof n != 'undefined' }).indexOf(c) != -1);
        },
        addClass: function(e, c) {
            e.className = e.className.split(' ').filter(function(n){ return typeof n != 'undefined' }).concat([c]).join(' ');
        },
        removeClass: function(e, c) {
            e.className = e.className.split(' ').filter(function(n){ return (typeof n != 'undefined' && n != c) }).join(' ');
        },
        loopHeader: function (option) {
            var self = this;
            var arr = ['.stickSkipBar', '.headerLan', '.stickyBar', '#body-hf'];
            for(var i = 0; i < arr.length; i++) {
                var elements = document.querySelectorAll(arr[i]);
                for(var j = 0; j < elements.length; j++) {
                    if(typeof elements[j] != 'undefined' && elements[j] != null) {
                        if (option === 'add') {
                            self.addClass(elements[j],'showSkip');
                        } else {
                            self.removeClass(elements[j],'showSkip');
                        }    
                    }
                }
            }
        }
    };
    SkipToContent.init();
}
