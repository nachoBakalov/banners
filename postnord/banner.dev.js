var animation = animation || {};
animation.main = function() {

	// get browser
	var browser = detectBrowser();

	// banner format
	var width = 320;
	var height = 320;

	// product position
	var productLeft = 95;
	var productTop = 10;

	// box size
	var boxWidth = 285;
	var boxHeight = boxWidth / 2.15;
	var boxDepth = 140;

	// camera perspective
	var perspective = 600;
	var perpectiveOrigin = "50% 40%";

	// banner container
	var banner = animation.createElement({width: width, height: height, backgroundColor: "black", overflow: "hidden", cursor: "pointer", parent: document.body});

	// vars
	var bg;
	var product;
	var copy1;
	var copy2;
	var logo;
	var border;

	var boxOuter;
	var boxInner;
	var boxWallTop;
	var boxWallTopRotation = -90;			// For browser specific bug fixes (in safari the plane needs to rotate a bit more to completely shut).
	var boxWallLeft;
	var boxWallRight;
	var boxWallBack;
	var boxWallFront;
	
	// images
	var productAsset = "product.png";
	var logoAsset = "logo_@2x.png";
	var copy1Asset = "copy1_@2x.png";
	var copy2Asset = "copy2_@2x.png";

	// load images
	var images = [productAsset, logoAsset, copy1Asset, copy2Asset];
	animation.preloadImages(images, function() {

		// images loaded
		console.log("BB -- " + images + " loaded");

		// create elements
		bg = animation.createElement({id: "bg", backgroundColor: "#fff", width: width, height: height, parent: banner});
		copy1 = animation.createElement({backgroundImage: copy1Asset, top: 32, retina: true, parent: banner});
		copy2 = animation.createElement({backgroundImage: copy2Asset, top: 255, retina: true, parent: banner});
		border = animation.createElement({id: "border", width: width, height: height, parent: banner});
		
		// box elements
		boxOuter = animation.createElement({width: boxWidth, height: boxHeight, parent: banner});
		boxInner = animation.createElement({width: boxWidth, height: boxHeight, top: 0, parent: boxOuter});

		boxWallLeft = animation.createElement({backgroundColor: "#0099ba", width: boxHeight, height: boxHeight,
			left: 0,
			rotationY: 90,
			rotationZ: 0,
			transformOrigin: "left bottom",
			boxShadow: "inset 0 0 100px 100px rgba(0, 0, 0, 0.6)",
			parent: boxInner
		});

		boxWallRight = animation.createElement({backgroundColor: "#0099ba", width: boxHeight, height: boxHeight,
			right: 0,
			rotationY: -90,
			rotationZ: 0,
			transformOrigin: "right bottom",
			boxShadow: "inset 0 0 100px 100px rgba(0, 0, 0, 0.6)",
			parent: boxInner
		});

		boxWallBack = animation.createElement({backgroundColor: "#0099ba", width: boxWidth, height: boxHeight,
			rotationX: 0,
			rotationZ: 0,
			z: -boxHeight,
			transformOrigin: "center bottom",
			boxShadow: "inset 0 0 100px 100px rgba(0, 0, 0, 0.4)",
			parent: boxInner
		});

		boxWallTop = animation.createElement({backgroundColor: "#0099ba", width: boxWidth, height: boxHeight * 0.9, top: -boxHeight * 0.89,
			rotationX: 0,
			rotationZ: 0,
			transformOrigin: "center bottom",
			boxShadow: "inset 0 0 100px 100px rgba(0, 0, 0, 0)",
			parent: boxWallBack
		});

		product = animation.createElement({backgroundImage: productAsset, left: productLeft, top: productTop, parent: boxInner});

		boxWallFront = animation.createElement({backgroundColor: "#0099ba", width: boxWidth, height: boxHeight,
			rotationX: 0,
			rotationZ: 0,
			transformOrigin: "center bottom",
			boxShadow: "inset 0 0 50px 50px rgba(0, 0, 0, 0.1)",
			parent: boxInner
		});

		logo = animation.createElement({backgroundImage: logoAsset, retina: true, parent: boxWallFront});
		

		// position elements
		logo.centerHorizontal();
		logo.centerVertical();
		copy1.centerHorizontal();
		copy2.centerHorizontal();
		boxOuter.centerHorizontal();
		boxOuter.centerVertical();

		// Browser specific
		switch (browser) {
			case "Firefox" :
				console.log("Hi, I am Firefox");

				TweenLite.set(boxInner, {perspective: perspective, perspectiveOrigin: perpectiveOrigin});
				TweenLite.set(boxWallBack, {perspective: perspective, perspectiveOrigin: perpectiveOrigin});
				break;

			case "Safari" :
				console.log("Hi, I am Safari");
				boxWallTopRotation = -98;

				TweenLite.set(boxOuter, {perspective: perspective, perspectiveOrigin: perpectiveOrigin});
				TweenLite.set(boxWallBack, {perspective: perspective, perspectiveOrigin: perpectiveOrigin});
				break;

			default :
				console.log("Hi, I am Default");

				TweenLite.set(boxOuter, {perspective: perspective, perspectiveOrigin: perpectiveOrigin});
				TweenLite.set(boxWallBack, {perspective: perspective, perspectiveOrigin: perpectiveOrigin});
				break;
		}

		// start here
		animate();
	});

	// animations
	function animate() {
		
		// copy1
		copy1.in_tl = new TimelineLite()
		.from(copy1, 0.7, {opacity: 0, ease: Power2.easeInOut});

		copy1.out_tl = new TimelineLite()
		.to(copy1, 0.5, {left: 320, ease: Power2.easeIn});

		// copy2
		copy2.in_tl = new TimelineLite()
		.from(copy2, 0.7, {opacity: 0, ease: Power2.easeInOut});

		copy2.out_tl = new TimelineLite()
		.to(copy2, 0.5, {left: 320, ease: Power2.easeIn});

		product.in_tl = new TimelineLite()
		.from(product, 0.7, {x: -width, ease: Power2.easeOut});

		// box wall back
		boxWallBack.in_tl = new TimelineLite()
		.from(boxWallBack, 1, {opacity: 0, scaleY: 0, ease: Power3.easeInOut})
		.from(boxWallBack, 1, {rotationX: 90, boxShadow: "inset 0 0 100px 100px rgba(0, 0, 0, 0)", ease: Power3.easeInOut}, "-= 0.9");
		
		// box wall right
		boxWallRight.in_tl = new TimelineLite()
		.from(boxWallRight, 0.7, {opacity: 0, scaleY: 0, ease: Power3.easeInOut})
		.from(boxWallRight, 0.7, {rotationZ: 90, boxShadow: "inset 0 0 100px 100px rgba(0, 0, 0, 0)", ease: Power3.easeInOut}, "-= 0.6");
		
		// box wall left
		boxWallLeft.in_tl = new TimelineLite()
		.from(boxWallLeft, 0.7, {opacity: 0, scaleY: 0, ease: Power3.easeInOut})
		.from(boxWallLeft, 0.7, {rotationZ: -90, boxShadow: "inset 0 0 100px 100px rgba(0, 0, 0, 0)", ease: Power3.easeInOut}, "-= 0.6");
		
		// box wall top
		boxWallTop.in_tl = new TimelineLite()
		.to(boxWallTop, 2, {rotationX: boxWallTopRotation, boxShadow: "inset 0 0 100px 100px rgba(0, 0, 0, 0.5)", ease: Power3.easeInOut})
		.to(boxWallTop, 0, {opacity: 0}, "-= 0.3");
		
		// box wall front
		boxWallFront.in_tl = new TimelineLite()
		.from(boxWallFront, 0.7, {opacity: 0, scaleY: 0, ease: Power3.easeInOut})
		.from(boxWallFront, 0.7, {rotationX: -90, boxShadow: "inset 0 0 100px 100px rgba(0, 0, 0, 0.6)", ease: Power3.easeInOut}, "-= 0.6");

		// box wall back
		boxInner.out_tl = new TimelineLite()
		.to(boxInner, 0.6, {left: 350, ease: Power3.easeIn});

		var tl = new TimelineLite({onComplete: function() { tl.seek("loop"); }});

		tl.addLabel("loop")
		.add(product.in_tl)
		.addLabel("start")
		.add(copy1.in_tl, "-= 0.1")
		.add(boxWallBack.in_tl)
		.add(boxWallTop.in_tl, "-= 1.55")
		.add(boxWallRight.in_tl, "-= 1.2")
		.add(boxWallLeft.in_tl, "-= 1.1")
		.add(boxWallFront.in_tl, "-= 0.9")
		.add(copy2.in_tl, "-= 0.1")
		.add(copy1.out_tl, "+= 2.2")
		.add(boxInner.out_tl, "-= 0.5")
		.add(copy2.out_tl, "-= 0.45");

		tl.seek("start");
	}

	function detectBrowser() {
		var browsers = ["Chrome", "Firefox", "Safari", "Internet", "Opera"];
		var browser;

		for (var i = 0; i < browsers.length; i++) {
			if (navigator.userAgent.search(browsers[i]) > 0) {
				browser = browsers[i];
				break;
			}
		}

		return browser;
	}
};