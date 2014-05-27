var Tinypopup = (function(window) {

	function listen(el, name, callback) {
    if(el.addEventListener) {
      el.addEventListener(name, callback, false);
    }
    else {
      el.attachEvent('on' + name, callback);
    }
	}
	
	/* 
	* constructor function 
	*	id - dom element id for popup
	*/
	function tinypopup( id ) {
		var self = this;
		var el = document.getElementById( id );		
		this.el = el;
		this.w = 0;
		this.h = 0;

		applyStyles( el, { 
			position: 'fixed', display: 'none', zIndex: 1000 
		} );

		addShadow.apply(this);

		listen(this.shadow, 'click', function() { self.hide(); });
		listen(window, 'resize', function() { resize.apply(self); });
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
		var cw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, 
			ch = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
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
