// todo: resize with browser window
//
// constructor
// id - dom element id for popup
function tinypopup( id ) {
	var self = this;
	var el = document.getElementById( id );		
	this.el = el;
	this.addShadow();
	this.shadow.addEventListener( 'click', function() { self.hide(); }, false );
	window.addEventListener( 'resize', function() { self.onResize(); }, false );
	this.addCss( id );
}

tinypopup.prototype.onResize = function() {
	this.shadow.style.width = window.innerWidth + 'px';
	this.shadow.style.height = window.innerHeight + 'px';

	var cw = window.innerWidth, ch = window.innerHeight;
	var left = (cw-this.w)/2;
	var top = (ch-this.h)/2;
	this.el.style.top = top + 'px';
	this.el.style.left = left + 'px';
	this.el.style.width = this.w + 'px';
	this.el.style.height = this.h + 'px';
}

tinypopup.prototype.addShadow = function() {
	console.log('adding shadow');
	var shadow = document.createElement('div');
	this.el.parentNode.appendChild(shadow);
	shadow.id = 'shadow';	
	shadow.style.backgroundColor = 'grey';	
	shadow.style.position = 'fixed';
	shadow.style.width = window.innerWidth + 'px';
	shadow.style.height = window.innerHeight + 'px';
	shadow.style.top = '0px';
	shadow.style.left = '0px';
	shadow.style.display = 'none';
	this.shadow = shadow;

}

console.log( 'loading tiny popup' );

tinypopup.prototype.show = function( w, h ) {
	this.w = w;
	this.h = h;
	console.log('showing popup');
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

/*
 * Bare minimum embedded css to make the popup work 
 * correctly. Additional styling should be added via
 * external css rules.
 */
tinypopup.prototype.addCss = function( id ) {
	console.log('adding css');
	var el = document.createElement('style');		
	el.innerHTML = '#' + id + 
		'{background-color:white;position:absolute;display:none}';
	document.head.appendChild( el );
}

