var animation = animation || {};
animation.main = function() {

	var width = 300;
	var height = 250;
	var banner = animation.createElement({width: width, height: height, overflow: "hidden", cursor: "pointer", parent: document.body});

	var gradient = animation.createElement({ width: width, height: height, backgroundColor: "rgba(255,204,0,1)",
					background: "-moz-radial-gradient(top right, ellipse cover, rgba(255,204,0,1) 0%, rgba(255,153,0,1) 30%, rgba(255,102,0,1) 100%)",
					background: "-webkit-gradient(radial, top right, 0px,  top right, 100%, color-stop(0%, rgba(255,204,0,1)), color-stop(30%, rgba(255,153,0,1)), color-stop(100%, rgba(255,102,0,1)))",
					background: "-webkit-radial-gradient(top right, ellipse cover, rgba(255,204,0,1) 0%, rgba(255,153,0,1) 30%, rgba(255,102,0,1) 100%)",
					background: "-o-radial-gradient(top right, ellipse cover, rgba(255,204,0,1) 0%, rgba(255,153,0,1) 30%, rgba(255,102,0,1) 100%)",
					background: "-ms-radial-gradient(top right, ellipse cover, rgba(255,204,0,1) 0%, rgba(255,153,0,1) 30%, rgba(255,102,0,1) 100%)",
					background: "radial-gradient(at top right, rgba(255,204,0,1) 0%, rgba(255,153,0,1) 30%, rgba(255,102,0,1) 100%)",
					filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffcc00', endColorstr='#ff6600', GradientType=1 )", parent:banner});

	var txt_1, txt_2, txt_3, logo, duck, cta, splash;

	var images = [	
		"duck_neck.png", 
		"duck_head.png", 
		"duck_symbol_car.png", 
		"duck_symbol_palmtrees.png", 
		"duck_symbol_drill.png", 
		"duck_glow.png", 
		"duck_eyelids_1.png", 
		"duck_eyelids_2.png", 			
		"cta_txt.png", 
		"txt_3.png", 
		"txt_2.png", 
		"txt_1.png",
		"logo.png",
		"splash_txt.png",
	];

	animation.preloadImages(images, function() {
		createElements();
		createMainTimeline();
 	});



	///////////////////////////////
 	// C R E A T E  E L E M E N T S

	function createElements() {
		createDuck();
		logo = animation.createElement({backgroundImage: "logo.png", right:10, top: 10, parent: banner});
		createTxts();		
		createCTA();
		createSplash();
	}

	function createTxts() {
		txt_1 = animation.createElement({backgroundImage: "txt_1.png", left: 133, top: 57, parent: banner});
		txt_2 = animation.createElement({backgroundImage: "txt_2.png", left: 133+27, top: 57, parent: banner});
		txt_3 = animation.createElement({backgroundImage: "txt_3.png", left: 133, top: 57, parent: banner});

		addInOut(txt_1);
		addInOut(txt_2);
		addInOut(txt_3);

		function addInOut(txt) {
			txt.in_tl = new TimelineLite()
			.from(txt, 0.4, {opacity: 0, immediateRender: true, ease: Power3.easeInOut});
			txt.out_tl = new TimelineLite()
			.to(txt, 0.4, {opacity: 0, ease: Power3.easeInOut})
		}
	}

	function createCTA() {
		var ctaTxt = animation.createElement({backgroundImage: "cta_txt.png", cursor: "pointer", right:10, top: 227,   retina: true, parent: banner})
		ctaTxt.addEventListener("mouseenter", function() {ctaTxt.to(0.05, {scale: 0.95});});
		ctaTxt.addEventListener("mouseleave", function() {ctaTxt.to(0.3, {scale: 1.00});});
	}

	function createSplash() {


		//////////////////
		// splash elements

		var splash = animation.createElement({parent: banner,left: 187, top: 160});
		var splashPetals = [];
		var radius = 30;
		var circ = 2 * radius * Math.PI;
		var numPetals = 8;
		var petalRadius = (circ / numPetals) * 1.2;
		var center = animation.createElement({parent: splash, width: radius * 2, height: radius * 2, scale: 0, left: -radius, top: -radius, backgroundColor: "white", borderRadius: "100%"});
		for(var i = 0; i < numPetals; ++i) {
			var petal = animation.createElement({rotationZ: 0.01, x: -petalRadius/2, y: -petalRadius/2, width: petalRadius, scale: 0, height: petalRadius, parent: splash, backgroundColor: "white", borderRadius: "100%"});
			petal._scale = 0;
			splashPetals.push(petal);
		}
		var splash_txt = animation.createElement({backgroundImage: "splash_txt.png", retina: true, opacity: 0, parent: splash});
		splash_txt.set({left: -splash_txt.get("width")/2-1, top: -splash_txt.get("height")/2});

		//////////////////
		// splash timeline

		// splash in
 		splash_in_tl = new TimelineLite();
		splash_in_tl.fromTo(center, 0.4, {scale: 0}, {scale: 1, ease: Power2.easeOut});
 		splash_in_tl.fromTo(splash_txt, 1.1, {scale: 0.8, opacity: 0}, {scale: 1, opacity: 1, ease: Elastic.easeOut.config(1.05, 0.3)}, 0.5);
 		for(var i = 0; i < numPetals; ++i) {
 			var petal = splashPetals[i];
 			splash_in_tl.fromTo(petal, 1.0, {_scale: 0}, {_scale: 1, ease: Elastic.easeOut.config(1.1, 0.5)}, i * 0.05);
 		}
 		// splash out
 		splash_out_tl = new TimelineLite();
 		splash_out_tl.fromTo(splash_txt, 0.5, {scale: 1, opacity: 1}, {scale: 0.5, opacity: 0, ease: Back.easeIn, immediateRender: false});
 		splash_out_tl.fromTo(center, 0.3, {scale: 1}, {scale: 0, ease: Power2.easeIn, immediateRender: false}, 0.4);
 		for(var i = 0; i < numPetals; ++i) {
 			var petal = splashPetals[i];
 			splash_out_tl.fromTo(petal, 0.5, {_scale: 1}, {_scale: 0, ease: Back.easeIn, immediateRender: false}, 0.2 + i * 0.005);
 		}

 		////////////////
 		// splash update

		var a = 0;
		TweenLite.ticker.addEventListener("tick", function() {
			// splash animation
			a += 0.2;
			for(var i = 0; i < numPetals; ++i) {
				var petal = splashPetals[i];
				var scale = petal._scale;
				petal.set({
					scale: animation.utils.map(Math.sin(a + (i/numPetals) * Math.PI), -1, 1, scale, scale * 1.1),
					x: Math.cos((i/numPetals) * Math.PI * 2 + a * 0.025) * radius * scale - petalRadius * 0.5,
					y: Math.sin((i/numPetals) * Math.PI * 2 + a * 0.025) * radius * scale - petalRadius * 0.5
				});
			}
		});

		return splash;
	}

	function createDuck() {


		////////////////
		// duck elements

		duck = animation.createElement({left: 12, top: 27, width: 272, height: 449, transformOrigin: "80px 100%", parent: banner});
			var duck_neck = animation.createElement({backgroundImage: "duck_neck.png", left: 39, top: 135, parent: duck});
			var duck_head =  duck.head = animation.createElement({backgroundImage: "duck_head.png",  transformOrigin: "80px 277px", parent: duck});
				var duck_symbol_1 = animation.createElement({backgroundImage: "duck_symbol_car.png", left: 25, top: 100, parent: duck_head});
				var duck_symbol_2 = animation.createElement({backgroundImage: "duck_symbol_drill.png", left: 25, top: 97, parent: duck_head});
				var duck_symbol_3 = animation.createElement({backgroundImage: "duck_symbol_palmtrees.png", left: 27, top: 95, parent: duck_head});
				var duck_glow = animation.createElement({backgroundImage: "duck_glow.png", left: 26, top: 90, parent: duck_head});
				var duck_eyelids_1 = animation.createElement({backgroundImage: "duck_eyelids_1.png",left: 19, top: 78, parent: duck_head});
				var duck_eyelids_2 = animation.createElement({backgroundImage: "duck_eyelids_2.png",left: 18, top: 77, parent: duck_head});

		var symbols = duck.symbols = [duck_symbol_1, duck_symbol_2, duck_symbol_3];
		duck._rotation = 0;
		duck._y = 0;
		duck_head._rotation = 0;
		duck_head._y = 0;

		////////////////
		// duck timeline

		duck.blink_1_tl = blinkTo(0);
		duck.blink_2_tl = blinkTo(1);
		duck.blink_3_tl = blinkTo(2);

		function blinkTo(symbolIndex) {
			var tl = new TimelineLite()
			.to(duck_eyelids_1, 0.01, {opacity: 1})
			.to(duck_eyelids_2, 0.01, {opacity: 1, onComplete: function() {
				for(var i = 0; i < symbols.length; ++i) {
					symbols[i].set({opacity: 0});
				}
				symbols[symbolIndex].set({opacity: 1});

			}}, "+=0.025")
			.to(duck_eyelids_2, 0.01, {opacity: 0}, "+=0.1")
			.to(duck_eyelids_1, 0.01, {opacity: 0}, "+=0.025")
			return tl;
		}		

		duck.in_tl = new TimelineLite()
		.from(duck, 0.3, {_y: 200, x: 200, ease: Power2.easeOut})
		.from(duck, 0.9, {_rotation: 120, ease: Elastic.easeOut.config(0.5, 0.6)}, 0)
		.from(duck_head, 0.5, {_rotation: -150, ease: Elastic.easeOut.config(0.8, 0.6)}, 0)

		duck.out_tl = new TimelineLite()
		.to(duck, 0.7, {_y: 200, x: -200, ease: Power2.easeIn})
		.to(duck, 0.5, {_rotation: -120, ease: Back.easeIn.config(2)}, 0)
		.to(duck_head, 0.5, {_rotation: 80, ease: Back.easeIn.config(2)}, 0)
		
		var blink_interval = 1.2;
		duck.blink_tl = new TimelineLite()
		.add([duck.blink_1_tl, duck.blink_2_tl, duck.blink_3_tl], "+=0", "normal", blink_interval)
		.call(function() {duck.blink_tl.seek(0)}, [], null, "+=" + blink_interval)

		//////////////
		// duck update

		var c = 0;
		var d = 0;
		var n = 0;
		var r = 0;
		TweenLite.ticker.addEventListener("tick", function() {
			// duck swag
			r = Math.sin(c+=0.04) * 0.5;
			n = Math.sin(d+=0.03);
			duck.set({force3D: true, y: duck._y + animation.utils.map(n, -1, 1, 0, 2.5), scaleY: animation.utils.map(n, -1, 1, 1, 0.995), scaleX: animation.utils.map(n, 1, -1, 1, 0.995), rotation: duck._rotation + r});
			duck.head.set({force3D: true, y: duck.head._y + n * 1, rotation: duck.head._rotation - r});
			TweenLite.set(duck.symbols, {force3D: true, x: animation.utils.map(r, -0.5, 0.5, 0.25, -0.25), y: animation.utils.map(n, -1, 1, 0.5, -0.5)})
		});
		
		return duck;
	}

	////////////////////////////
	// M A I N   T I M E L I N E

	function createMainTimeline() {
		
		// txts + blinking
		var views = new TimelineLite()
		.add("view_1", 0)
		.add("view_2", "view_1+=3.2")
		.add("view_3", "view_2+=3.2")

		.add(txt_1.in_tl, "view_1")
		.add(txt_1.out_tl, "view_1+=3.0")
		.add(txt_2.in_tl, "view_2")		
		.add(txt_2.out_tl, "view_2+=3.0")
		.add(txt_3.in_tl, "view_3")		
		.add(txt_3.out_tl, "view_3+=3.0")

		// main
		var main_tl = new TimelineLite({delay: 0.5, onComplete: function() {main_tl.seek(0);}})
    	.add(duck.in_tl)
    	.add(splash_in_tl, "-=0.5")
    	.add(views, "-=1")
    	.add(splash_out_tl, "-=0.5")
    	.add(duck.out_tl)
	}

	//////////////////
	// C L I C K T A G
	
	banner.onclick = function() {		
		var clickTAGvalue = dhtml.getVar('clickTAG', 'http://www.example.com');
		var landingpagetarget = dhtml.getVar('landingPageTarget', '_blank');
		window.open(clickTAGvalue, landingpagetarget);
	};		
}