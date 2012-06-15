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
			backgroundColor: 'white', position: 'fixed', display: 'none', zIndex: 1000 
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
