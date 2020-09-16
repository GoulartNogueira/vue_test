if ("document" in self) {

// Full polyfill for browsers with no classList support
if (!("classList" in document.createElement("_"))) {

(function (view) {

"use strict";

if (!('Element' in view)) return;

var
    classListProp = "classList"
  , protoProp = "prototype"
  , elemCtrProto = view.Element[protoProp]
  , objCtr = Object
  , strTrim = String[protoProp].trim || function () {
    return this.replace(/^\s+|\s+$/g, "");
  }
  , arrIndexOf = Array[protoProp].indexOf || function (item) {
    var
        i = 0
      , len = this.length
    ;
    for (; i < len; i++) {
      if (i in this && this[i] === item) {
        return i;
      }
    }
    return -1;
  }
  // Vendors: please allow content code to instantiate DOMExceptions
  , DOMEx = function (type, message) {
    this.name = type;
    this.code = DOMException[type];
    this.message = message;
  }
  , checkTokenAndGetIndex = function (classList, token) {
    if (token === "") {
      throw new DOMEx(
          "SYNTAX_ERR"
        , "An invalid or illegal string was specified"
      );
    }
    if (/\s/.test(token)) {
      throw new DOMEx(
          "INVALID_CHARACTER_ERR"
        , "String contains an invalid character"
      );
    }
    return arrIndexOf.call(classList, token);
  }
  , ClassList = function (elem) {
    var
        trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
      , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
      , i = 0
      , len = classes.length
    ;
    for (; i < len; i++) {
      this.push(classes[i]);
    }
    this._updateClassName = function () {
      elem.setAttribute("class", this.toString());
    };
  }
  , classListProto = ClassList[protoProp] = []
  , classListGetter = function () {
    return new ClassList(this);
  }
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
  return this[i] || null;
};
classListProto.contains = function (token) {
  token += "";
  return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function () {
  var
      tokens = arguments
    , i = 0
    , l = tokens.length
    , token
    , updated = false
  ;
  do {
    token = tokens[i] + "";
    if (checkTokenAndGetIndex(this, token) === -1) {
      this.push(token);
      updated = true;
    }
  }
  while (++i < l);

  if (updated) {
    this._updateClassName();
  }
};
classListProto.remove = function () {
  var
      tokens = arguments
    , i = 0
    , l = tokens.length
    , token
    , updated = false
    , index
  ;
  do {
    token = tokens[i] + "";
    index = checkTokenAndGetIndex(this, token);
    while (index !== -1) {
      this.splice(index, 1);
      updated = true;
      index = checkTokenAndGetIndex(this, token);
    }
  }
  while (++i < l);

  if (updated) {
    this._updateClassName();
  }
};
classListProto.toggle = function (token, force) {
  token += "";

  var
      result = this.contains(token)
    , method = result ?
      force !== true && "remove"
    :
      force !== false && "add"
  ;

  if (method) {
    this[method](token);
  }

  if (force === true || force === false) {
    return force;
  } else {
    return !result;
  }
};
classListProto.toString = function () {
  return this.join(" ");
};

if (objCtr.defineProperty) {
  var classListPropDesc = {
      get: classListGetter
    , enumerable: true
    , configurable: true
  };
  try {
    objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
  } catch (ex) { // IE 8 doesn't support enumerable:true
    if (ex.number === -0x7FF5EC54) {
      classListPropDesc.enumerable = false;
      objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
    }
  }
} else if (objCtr[protoProp].__defineGetter__) {
  elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(self));

} else {
// There is full or partial native classList support, so just check if we need
// to normalize the add/remove and toggle APIs.

(function () {
  "use strict";

  var testElement = document.createElement("_");

  testElement.classList.add("c1", "c2");

  // Polyfill for IE 10/11 and Firefox <26, where classList.add and
  // classList.remove exist but support only one argument at a time.
  if (!testElement.classList.contains("c2")) {
    var createMethod = function(method) {
      var original = DOMTokenList.prototype[method];

      DOMTokenList.prototype[method] = function(token) {
        var i, len = arguments.length;

        for (i = 0; i < len; i++) {
          token = arguments[i];
          original.call(this, token);
        }
      };
    };
    createMethod('add');
    createMethod('remove');
  }

  testElement.classList.toggle("c3", false);

  // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
  // support the second argument.
  if (testElement.classList.contains("c3")) {
    var _toggle = DOMTokenList.prototype.toggle;

    DOMTokenList.prototype.toggle = function(token, force) {
      if (1 in arguments && !this.contains(token) === !force) {
        return force;
      } else {
        return _toggle.call(this, token);
      }
    };

  }

  testElement = null;
}());

}

}
(function(window) {
  'use strict';

  var vmm = {},
  previousElementSibling = function( el ) {
    if( el.previousElementSibling ) {
      return el.previousElementSibling;
    } else {
      while( el = el.previousSibling ) {
        if( el.nodeType === 1 ) {
          return el;
        }
      }
    }
  },
  loopElems = function( config, event, callback ,index , singleSubmenu){ // curry to pre config

      var i, j, len, subItem, menuMatrix = [],
        menuItemParent = previousElementSibling( singleSubmenu ),
        subGroups = singleSubmenu.querySelectorAll( config.subNavGroup );

      //loop throught all the elements
      for( i = 0; i < subGroups.length; i++ ) {
        menuMatrix[i] = subGroups[i]; // save the subGroup element in the matrix
        subItem = subGroups[i].querySelectorAll( config.subNavItem );
        menuMatrix[i].subItems = subItem; //save the subItem in the matrix
        for( j = 0, len = subItem.length; j < len; j++ ) {
          //add reference to the next menu and previus submenu
          //reference to the parent item added to the submenu element
          subItem[j].ParentItemMenu = menuItemParent;
          //send the elems as a matrix [i,j] where i is the subGroup position and J is the sub Item position
          subItem[j].addEventListener( event, callback.call(this, i, j, menuMatrix, singleSubmenu, config.callback) );

      }
    };
  };

  //take an array of DOM elements and attach an event to them
  vmm.clearAllHover = function( items ) {
    for( var i = 0, len = items.length; i < len; i++ ) {
      items[i].classList.remove('isHover');
    }
  };

  vmm.init = function( rootEl, callback ) {
    setTimeout( function() {
      var callback = ( callback ) ? callback : false,
        mainConfig = {
          mainItem: rootEl[0],
          mainItemSelector: '.nav-item',
          submenuSelector: '.Sub-Menu',
          submenuItemSelector: '.subnav-item',
          callback: callback
        },
        subMenus = rootEl[0].getElementsByClassName('Sub-Menu'), //capture all of the submenus
        sectionSubMenuConfig = {
          actualSection: subMenus,
          subNavGroup: '.sub-nav-group',
          subNavItem: '.subnav-item',
          callback: callback
        };

        // attach events to the Main items selectors
        vmm.attachMainEvents( vmm.eventMainHandler, 'keydown', mainConfig );
        // attach events to the sub nav items
        vmm.attachEventsSub( vmm.eventHandlerSub, 'keydown', sectionSubMenuConfig );

    }, 3000);
  };

  vmm.clearSubmenu = function( items, index ) {
    for( var i = 0, len = items.length; i < len; i++ ) {
      items[i].subMenu.classList.remove('visible'); //hide all of the sub menus
    }

    if( index ) { //index given return the focus
      items[i].focus();
    }

  };

  vmm.eventHandlerSub = function ( i, j, menuMatrix, subElem, callback ) {
    return function ( e ) {
    var key = e.keyCode;
      if ( key === 39 ) {
        //right differents options with the right arrow
        if( (menuMatrix.length - 1) === i ) {
          //the last item in the group go to the focus parent
        } else {
          menuMatrix[i+1].subItems[0].focus(); //move focus right
        }
      //move focus left sending the parent as an argument and this element
      } else if( key === 37 ) {
        // left
        if( i === 0 ){
          //es el ultimo de la fila ve al foco del padre
        } else{
          menuMatrix[i-1].subItems[0].focus(); //move focus right
        }
      //move focus down sending the parent as an argument and this element
      } else if( key === 38 ) {
        // up diferent options with the up arrow
        if( i === 0 && j === 0 ) {
          menuMatrix[i].subItems[j].ParentItemMenu.focus();
        //Move to the previus item group
        } else if( j === 0 ) {
          //capture the previus group and the length of the sub items
          var previusGroup = menuMatrix[i-1],
            previusLength = previusGroup.subItems.length;
          //set the focus to the previus element and last sub item
          previusGroup.subItems[previusLength-1].focus();
        //Normal Move to the up item
        } else {
          menuMatrix[i].subItems[j-1].focus(); //move focus right
        }
        return false;
      //move focus up sending the parent as an argument and this element
      } else if( key === 40 ) {
        e.preventDefault();
        if( ((menuMatrix.length - 1)===i) && ((menuMatrix[i].subItems.length - 1)===j) ) {
          //"ve al siguiente sub menu"
        } else if( (menuMatrix[i].subItems.length - 1) === j ) {
          //capture the previus group and the length of the sub items
          var nextGroup = menuMatrix[i+1];
          //set the focus to the previus element and last sub item
          nextGroup.subItems[0].focus();
        }
        else{
          menuMatrix[i].subItems[j+1].focus(); //move focus right
        }
        return false;
      } else if( key === 27 ) {
        // clear all the sub items and send the focus of the target
        if( callback ) {
          callback();
        }
        subElem.classList.remove("visible");
        subElem.classList.remove("isOpen");
        var parentItem = menuMatrix[i].subItems[j].ParentItemMenu;
        parentItem.focus();
        parentItem.classList.remove("isHover");
      } else if( key === 13 ) {
        //else if enter is pressed
        menuMatrix[i].subItems[j].click();
        if( e.target.tagName !== 'SELECT' ){
          subElem.classList.remove("visible");
        }
      } else {
        return true;
      }
    };
  };

  vmm.attachEventsSub = function( callback, event, config ) {

    for( var i = 0; i < config.actualSection.length ; i++ ) {
      loopElems( config, event, callback, i,config.actualSection[0]);
    }
  };

  vmm.attachMainEvents = function( callback, event, config ) {
    var i, len, menuArray = [],
      mainItems = config.mainItem.querySelectorAll( config.mainItemSelector );

    //loop throught all the elements
    for( i = 0, len = mainItems.length; i < len; i++ ) {
      //look for the first link of the sub menu and add it to the DOM element Object
      var subMenuEl = mainItems[i].parentNode.querySelector( config.submenuSelector );
      //submenu added as a part of DOM Element
      mainItems[i].firstLink = subMenuEl.querySelector( config.submenuItemSelector );
      //first menu item added as a part of DOM Element
      mainItems[i].subMenu = subMenuEl;
      //save the mainItems element in the array
      menuArray[i] = mainItems[i];
      menuArray[i].addEventListener( event, callback.call( this, i, menuArray, config.mainItem, config.callback ) );

    }
  };

  vmm.eventMainHandler = function( i, menuArray, elem, callback ) {
    return function ( e ) {
      if( callback ) {
        callback();
      }
      var key = e.keyCode;
      if( key === 39 ) {
        vmm.clearAllHover( menuArray );
        //right differents options with the right arrow
        vmm.clearSubmenu( menuArray );
        if( (menuArray.length - 1) === i ) {
          //"the last item in the group go to the focus parent"
        } else {
          menuArray[i+1].focus(); //move focus right
        }
        return false;
      } else if( key === 13 ) {
        // enter key
        vmm.clearSubmenu( menuArray );
        var subMenu = menuArray[i].subMenu,
          firstLink = menuArray[i].firstLink;

        if( subMenu && firstLink ) { // if not is a one level menu
          menuArray[i].classList.add('isHover');
          subMenu.classList.add('visible');
          firstLink.focus();
        }
        return false;
        //move focus left sending the parent as an argument and this element
      } else if ( key === 37 ) {
        //left
        vmm.clearSubmenu( menuArray );
        vmm.clearAllHover( menuArray );
        if( i === 0 ) {
          //"es el ultimo de la fila ve al foco del padre"
        } else {
          menuArray[i-1].focus(); //move focus right
        }
        return false;
      } else if ( key === 38 ) {
        //up
        vmm.clearSubmenu( menuArray );
        menuArray[i].classList.remove('isHover');
        return false;
        // up diferent options with the up arrow
        // no hay eventos en el app del menu principal
        //move focus down sending the parent as an argument and this element
      } else if( key === 40 || key === 32 ) {
        //down arrow
        e.preventDefault();
        vmm.clearSubmenu( menuArray );
        var subMenu = menuArray[i].subMenu,
          firstLink = menuArray[i].firstLink;
          if( subMenu && firstLink ){ // if not is a one level menu
             menuArray[i].classList.add('isHover');
             subMenu.classList.add('visible');
             firstLink.focus();
          }
        return false;
      //Esc pressed
      } else if ( key === 27 ) {
        // clear all the sub items and send the focus of the target
        vmm.clearSubmenu( menuArray );
        menuArray[i].classList.remove('isHover');
        var subMenu = menuArray[i].subMenu;
        return false;
      } else {
        //debug the key pressed
      }
    };
  };

    window.initAccess = function() {
        var els = document.getElementsByClassName("menu-access"),
            el,
            change,
            callback;
        for (var i = 0 ; i < els.length ; i++) {
            change = els[i].getAttribute('data-change');
            callback = change ? change : false;
            vmm.init( els, callback );
        }
    };

    document.addEventListener('DOMContentLoaded', function() {
        initAccess();
    });

})(window);

