/*jslint browser: true */

/**
 * Tiny Popup - minimal popup dialog
 *
 * Copyright (c) 2012 Dan Newcome
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

var Tinypopup = (function (window, document) {
    'use strict';

    /**
     * utility for applying multiple css styles to an element
     * allows assignment of of dimensions using numeric values
     */
    function applyStyles(el, obj) {
        var style;
        for (style in obj) {
            if (obj.hasOwnProperty(style)) {
                if (style === 'top' || style === 'left' || style === 'width' || style === 'height') {
                    el.style[style] = obj[style] + 'px';
                } else {
                    el.style[style] = obj[style];
                }
            }
        }
    }

    /**
     * construct the shadow
     */
    function addShadow() {
        /*jshint validthis:true */
        this.shadow = document.createElement('div');
        this.shadow.id = 'tinypopup-shadow';
        this.el.parentNode.appendChild(this.shadow);

        var zIndex = parseInt(this.el.style.zIndex, 10) - 1;
        applyStyles(this.shadow, {
            backgroundColor: 'gray',
            position: 'fixed',
            top: 0,
            left: 0,
            display: 'none',
            opacity: 0.5,
            zIndex: zIndex,
            filter: 'progid:DXImageTransform.Microsoft.Alpha(opacity=50)'
        });
    }

    /**
     * small abstraction for downlevel browsers
     */
    function listen(el, name, callback) {
        if (el.addEventListener) {
            el.addEventListener(name, callback, false);
        } else {
            el.attachEvent('on' + name, callback);
        }
    }

    /**
     * simple function binding
     */
    function bind(el, evt, context, callback) {
        if (el) {
            listen(el, evt, (function () {
                return function () {
                    callback.apply(context);
                };
            }(context)));
        }
    }

    /*
     * constructor function
     *  id - dom element id for popup
     */
    function tinypopup(el) {
        /*jshint validthis:true */
        if (!el.nodeName) {
            el = document.getElementById(el);
        }
        this.el = el;
        this.w = 0;
        this.h = 0;
        this.scrollOffset = 0;

        applyStyles(el, {
            position: 'fixed',
            visibility: 'none',
            zIndex: 1000,
            opacity: 0
        });

        addShadow.apply(this);

        bind(this.shadow, 'click', this, this.hide);
        bind(window, 'resize', this, this.resize);
        bind(window, 'scroll', this, this.scroll);
        this.attachCloseButton();
    }

    /**
     * attach the close button if one is provided in the popup content
     */
    tinypopup.prototype.attachCloseButton = function () {
        this.closeButton = this.el.querySelector('.tinypopup-closebutton');
        bind(this.closeButton, 'click', this, this.hide);
    };
    tinypopup.prototype.scroll = function() {
        this.scrollOffset += window.pageYOffset; 
        console.log('scrolling');
        this.resize();
    }

    /**
     * show the popup, centered in the viewable client area
     * with given width/height
     */
    tinypopup.prototype.show = function (w, h, content) {

        this.scrollOffset = window.pageYOffset;
        this.w = w;
        this.h = h;
        if (content) {
            this.el.innerHTML = '';
            this.el.appendChild(content);
        }
        // this.el.style.display = 'block';
        this.el.style.visibility = 'visible';
        this.shadow.style.display = 'block';
        this.el.style.opacity = 1;
        this.attachCloseButton();
        this.resize();
    };

    /**
     * hide the popup
     */
    tinypopup.prototype.hide = function () {
        // this.el.style.display = 'none';
        this.el.style.visibility = 'hidden';
        this.shadow.style.display = 'none';
        this.el.style.opacity = 0;
    };

    /**
     * internal method for calculating/recalculating sizes of
     * popup window and its shadow
     */
    tinypopup.prototype.resize = function () {
        var cw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            ch = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        applyStyles(this.shadow, {
            width: cw,
            height: ch
        });
        console.log(this.scrollOffset);
        applyStyles(this.el, {
            top: ((ch - this.h) / 2) - window.pageYOffset,
            left: (cw - this.w) / 2,
            width: this.w,
            height: this.h
        });
    };


    // return the constructor function from module
    return tinypopup;
}(window, document));
