// ==UserScript==
// @match http://sports.yahoo.com/*
// ==/UserScript==

/*
 * User script file that works in Chrome and only activates on Yahoo 
 * Sports page. Install by dragging and dropping file onto Chrome and
 * allowing it to be installed as an extension.
 */


/* 
 * begin tiny-popup script
 * original author: Dan Newcome
 * source: https://github.com/dnewcome/tiny-popup 
 */
var Tinypopup = (function(window) {

	/* 
	* constructor function 
	*	id - dom element id for popup
	*/
	function tinypopup( id ) {
		var self = this;
		var el = document.getElementById( id );		
		this.el = el;

		applyStyles( el, { 
			position: 'fixed', display: 'none', zIndex: 100000 
		} );

		addShadow.apply(this);

		this.shadow.addEventListener( 'click', function() { self.hide(); }, false );
		window.addEventListener( 'resize', function() { resize.apply(self); }, false );
	}

	/**
	* show the popup, centered in the viewable client area
	* with given width/height
	*/
	tinypopup.prototype.show = function( w, h, content ) {
		this.w = w;
		this.h = h;
		if( content ) {
			this.el.innerHTML = '';
			this.el.appendChild( content );
		}
		this.el.style.display = 'block';
		this.shadow.style.display = 'block';
		resize.apply(this);	
	}

	/**
	* hide the popup
	*/
	tinypopup.prototype.hide = function() {
		this.el.style.display = 'none';
		this.shadow.style.display = 'none';
	}

	/**
	* internal method for calculating/recalculating sizes of
	* popup window and its shadow
	*/
	function resize() {
		var cw = window.innerWidth, 
			ch = window.innerHeight;
		applyStyles( this.shadow, { 
			width: cw, height: ch 
		} );
		applyStyles( this.el, { 
			top: (ch-this.h)/2, left: (cw-this.w)/2, width: this.w, height: this.h 
		} );
	}

	/**
	* construct the shadow
	*/
	function addShadow() {
		var shadow = this.shadow = document.createElement( 'div' );
		this.el.parentNode.appendChild( shadow );
		shadow.id = 'tinypopup-shadow';	

		var zIndex = parseInt( this.el.style.zIndex ) - 1;
		applyStyles( shadow, {
			backgroundColor: 'grey', position: 'fixed', top: 0, left: 0, 
			display: 'none', opacity: 0.5, zIndex: zIndex
		} );

	}

	/**
 	* utility for applying multiple css styles to an element
 	* allows assignment of of dimensions using numeric values
 	*/
	function applyStyles( el, obj ) {
		for( style in obj ) {
			if( style == 'top' || style == 'left' || 
				style == 'width' || style == 'height' ) {
				el.style[style] = obj[style] + 'px';
			}
			else {
				el.style[style] = obj[style];
			}
		}
	}

	// return the constructor function from module
	return tinypopup;

})(window);
/*
 * End included tiny-popup library script
 */


function showPopup(evt) {
    evt.stopPropagation();	
    tp.show( 400, 200 );
}

// inject popup markup and button to invoke it on top left corner of the page
var addEl = document.createElement('div');
addEl.innerHTML = '<div style="z-index: 99999; position: absolute; top: 0px"><button id="popupButton">Test</button><div id="popup" style="background-color: white">Test content</div></div>';
document.body.insertBefore(addEl, document.body.firstChild);

var tp = new Tinypopup( 'popup' );			
document.getElementById('popupButton').addEventListener('click', showPopup, true);
