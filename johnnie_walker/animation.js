var animation = {
	image_cache : {},

	createElement : function(_settings) {

		// default settings
		var settings = _settings || {};
		settings.type = settings.type || "div";
		settings.position = settings.position || "absolute";

		var element = document.createElement(settings.type);
		element._settings = settings.constructor();
	    for (var key in settings) element._settings[key] = settings[key];
	    	
		switch(settings.type) {
			case "canvas" :
				element.width = settings.width;
				element.height = settings.height;
			break;
		}

		// handle image
		if(settings.backgroundImage) {

			element.style.backgroundSize = settings.backgroundSize || "contain";
			element.style.backgroundRepeat = settings.backgroundRepeat || "no-repeat";

			loadImg(settings.backgroundImage, true);	
			
		} else {
			applySettings();
		}
		
		function applySettings() {
			if(settings.id) element.id = settings.id;			
			if(settings.parent) settings.parent.appendChild(element);
			if(settings.innerHTML) element.innerHTML = settings.innerHTML;
			delete settings.innerHTML;
			delete settings.retina;
			delete settings.parent;
			delete settings.id;
			delete settings.type;
			TweenLite.set(element, settings);
		}

		function loadImg(src, doSetImage) {
			var img = animation.image_cache[src];
			if (img) { // if preloaded
				if(doSetImage) setImage.apply(img);
			} else {
				img = document.createElement("img");
				img.src = src;
				if(doSetImage) img.onload = setImage;
				animation.image_cache[src] = img;
			}
		}

		function setImage() {			
			var isSVG = this.src.slice(-4) == ".svg";
			if(isSVG) document.body.appendChild(this); // IE fix
			settings.width =  Math.round(settings.width || (settings.retina ? this.width / 2 : this.width));
			settings.height = Math.round(settings.height || (settings.retina ? this.height / 2 : this.height));
			settings.backgroundImage = "url(" + this.src + ")";
			applySettings();
			if(isSVG) document.body.removeChild(this); // IE fix
		}

		// functions	
		element.appendChildren = function(children) { for(var i = 0; i < children.length; ++i) this.appendChild(children[i]); };
		element.set = function(settings) { TweenLite.set(this, settings); };
		element.to = function(time, settings) { TweenLite.to(this, time, settings); };
		element.from = function(time, settings) { TweenLite.from(this, time, settings); };
		element.fromTo = function(time, from, to) { TweenLite.fromTo(this, time, from, to); };
		element.get = function(property) { return ((this._gsTransform && this._gsTransform[property]) || (this._gsTransform && this._gsTransform[property] === 0)) ? this._gsTransform[property] : (this.style[property].slice(-2) == "px") ? parseFloat(this.style[property]) : this.style[property]; };
		element.centerHorizontal = function() { TweenLite.set(this, {left: 0, right: 0, marginLeft: "auto", marginRight: "auto"}); };
		element.centerVertical = function() { TweenLite.set(this, {top: 0, bottom: 0, marginTop: "auto", marginBottom: "auto"}); };
		element.center = function() { TweenLite.set(this, {top: 0, left: 0, right: 0, bottom: 0, margin: "auto"}); };
		element.getOriginal = function(property){ return element._settings[property] || 0};

		return element; 
	},

	preloadImages : function(images, callback, scope) {
		var numImages = images.length;
		var loadedImages = 0;
		var img = null;
		for(var i = 0; i < numImages; ++i) {
 			img = document.createElement("img");
			img.src = img.shortSrc = images[i];
			img.onload = function() {
				loadedImages++;
				animation.image_cache[this.shortSrc] = this;
				if(loadedImages == numImages) {
					if (scope) {
						callback.call(scope);
					} else {
						callback();
					}
				}
			};
		}
	}
};