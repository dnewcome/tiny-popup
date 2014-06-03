var Tinypopup=function(window){function tinypopup(el){var self=this;if(!el.nodeName){el=document.getElementById(el)}this.el=el;this.w=0;this.h=0;applyStyles(el,{position:"fixed",visibility:"none",zIndex:1e3,opacity:0});addShadow.apply(this);bind(this.shadow,"click",this,this.hide);bind(window,"resize",this,this.resize);this.attachCloseButton()}tinypopup.prototype.attachCloseButton=function(){this.closeButton=this.el.querySelector(".tinypopup-closebutton");bind(this.closeButton,"click",this,this.hide)};tinypopup.prototype.show=function(w,h,content){this.w=w;this.h=h;if(content){this.el.innerHTML="";this.el.appendChild(content)}this.el.style.visibility="visible";this.shadow.style.display="block";this.el.style.opacity=1;this.attachCloseButton();this.resize()};tinypopup.prototype.hide=function(){this.el.style.visibility="hidden";this.shadow.style.display="none";this.el.style.opacity=0};tinypopup.prototype.resize=function(){var cw=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,ch=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;applyStyles(this.shadow,{width:cw,height:ch});applyStyles(this.el,{top:(ch-this.h)/2,left:(cw-this.w)/2,width:this.w,height:this.h})};function addShadow(){var shadow=this.shadow=document.createElement("div");this.el.parentNode.appendChild(shadow);shadow.id="tinypopup-shadow";var zIndex=parseInt(this.el.style.zIndex)-1;applyStyles(shadow,{backgroundColor:"gray",position:"fixed",top:0,left:0,display:"none",opacity:.5,zIndex:zIndex,filter:"progid:DXImageTransform.Microsoft.Alpha(opacity=50)"})}function applyStyles(el,obj){for(style in obj){if(style=="top"||style=="left"||style=="width"||style=="height"){el.style[style]=obj[style]+"px"}else{el.style[style]=obj[style]}}}function listen(el,name,callback){if(el.addEventListener){el.addEventListener(name,callback,false)}else{el.attachEvent("on"+name,callback)}}function bind(el,evt,context,callback){if(el){listen(el,evt,function(self){return function(){callback.apply(context)}}(context))}}return tinypopup}(window);