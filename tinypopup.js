// constructor
// id - dom element id for popup
function applyStyles( el, obj ) {
	for( style in obj ) {
		if( style == 'top' || style == 'left' || style == 'width' || style == 'height' ) {
			el.style[style] = obj[style] + 'px';
		}
		else {
			el.style[style] = obj[style];
		}
	}
}

function tinypopup( id ) {
	var self = this;
	var el = document.getElementById( id );		
	this.el = el;

	applyStyles( el, { 
		backgroundColor: 'white', position: 'absolute', display: 'none' 
	} );

	this.addShadow();

	this.shadow.addEventListener( 'click', function() { self.hide(); }, false );
	window.addEventListener( 'resize', function() { self.onResize(); }, false );
}

tinypopup.prototype.onResize = function() {
	var cw = window.innerWidth, 
		ch = window.innerHeight;

	applyStyles( this.shadow, { 
		width: cw, height: ch 
	} );

	applyStyles( this.el, { 
		top: (ch-this.h)/2, left: (cw-this.w)/2, width: this.w, height: this.h 
	} );
}

tinypopup.prototype.addShadow = function() {
	var cw = window.innerWidth, 
		ch = window.innerHeight;

	var shadow = document.createElement('div');
	this.shadow = shadow;
	this.el.parentNode.appendChild(shadow);
	shadow.id = 'shadow';	

	applyStyles( shadow, {
		backgroundColor: 'grey', position: 'fixed', width: cw, height: ch, top: 0, left: 0, display: 'none' 
	} );

}


tinypopup.prototype.show = function( w, h ) {
	this.w = w;
	this.h = h;
	var el = this.el;
	console.log( el );
	el.style.display = 'block';
	var cw = window.innerWidth, ch = window.innerHeight;
	var left = (cw-w)/2;
	var top = (ch-h)/2;
	el.style.top = top + 'px';
	el.style.left = left + 'px';
	el.style.width = w + 'px';
	el.style.height = h + 'px';
	el.style.position = 'fixed';

	this.shadow.style.display = 'block';
	this.shadow.style.opacity = 0.5;
	this.el.style.zIndex = '1000';

	this.shadow.style.zIndex = parseInt( this.el.style.zIndex ) - 1;
}

tinypopup.prototype.hide = function() {
	this.el.style.display = 'none';
	this.shadow.style.display = 'none';
}

