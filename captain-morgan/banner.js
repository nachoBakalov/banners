var animation = animation || {};
animation.main = function() {

	var width = 300;
	var height = 250;
	var clickArea = animation.createElement({width: width, height: height, overflow: "hidden", cursor: "pointer", parent: document.body});
	var banner = animation.createElement({width: width, height: height, backgroundColor: "#c8102e", overflow: "hidden", cursor: "pointer", parent:clickArea});
	var movementEnabled = false;
	var loopstop = false;
	var images = [
		// "eye_left.png",
		// "eye_right.png",
		// "face.png",
		// "lid_left.png",
		// "lid_right.png",
		// "guide.jpg",
		"bottle.png",
		"glass.png",
		"lime.png",
		"cta.png",
		"legal.png",
		"swordRight.png",
		"swordLeft.png",
		"logoCenter.png",
		"logo.png",
		"txt_2_1.png",
		"txt_1_2.png",
		"txt_1_1.png",
		"txt_2_2.png",
		"txt_3.png",
		"flare.png",
		"glassSplash.png",
		"glassSplash2.png",
	];

	animation.preloadImages(images, function() {

		///////////////////////
		// C R E A T E  D I V S



		// var guide = animation.createElement({backgroundImage:"guide.jpg", opacity:0.5, parent:banner});

		// keep products width,height 20,20, instead use right/bottom to place it
		// the lime position(0,0) should be placed with guide background, and it's animation will make it endup on position(0,0)
		var products = animation.createElement({right:117, bottom:113, width:20, height:20, backgroundColor:"none", parent:banner})
			var drop1 = animation.createElement({backgroundColor: "#edd682", left: 30+20, top: 42, alpha:0, width:2, height:2, borderRadius: 1, parent: products});
			var drop2 = animation.createElement({backgroundColor: "#edd682", left: 26+20, top: 46, alpha:0, width:2, height:2, borderRadius: 1, parent: products});
			var drop3 = animation.createElement({backgroundColor: "#edd682", left: 36+20, top: 44, alpha:0, width:2, height:2, borderRadius: 1, parent: products});
			var bottle = animation.createElement({backgroundImage:"bottle.png", left:66, top:-107, retina:true, parent:products});
			var glassContainer = animation.createElement({left:-16, top:39, parent:products});
				var glassSplash = animation.createElement({backgroundImage:"glassSplash.png", left:48+16, top:35-39, retina:true, parent:glassContainer});
				var glassSplash2 = animation.createElement({backgroundImage:"glassSplash2.png", left:20+16, top:37-39, retina:true, parent:glassContainer});
				var glass = animation.createElement({backgroundImage:"glass.png", retina:true, parent:glassContainer});
			var lime = animation.createElement({backgroundImage:"lime.png", left:0, top:1, retina:true, parent:products});
			//edd682
			

		// fixing pivot points.
		bottle.set({transformOrigin:"50% 100%"});
		glass.set({transformOrigin:"0% 100%"});
		lime.set({transformOrigin:"50% 50%"});


		// products timeline, it's a container with the glass, bottle and lime
		// by Martin
		products.tl = new TimelineLite({paused:true})
			.add("in")
			.from(glassContainer, 0.4, {x:600, ease:Power2.easeOut}, "in")
			.to(glassContainer, 0.2, {rotation:-3, ease:Quad.easeOut}, "-=0.15") // wobble
			.to(glassContainer, 0.2, {rotation:0, ease:Quad.easeIn})
			.from(glassSplash2, 0.3, {x:6, y:5, ease:Power2.easeOut}, "in+=0.3")
			.to(glassSplash2, 0.3, {x:0, y:20, ease:Power2.easeIn}, "in+=0.6")
			.from(bottle, 0.4, {x:600, ease:Power2.easeOut}, "in+=0.3")
			.to(bottle, 0.2, {rotation:-2, ease:Quad.easeOut}, "-=0.25") // wobble
			.to(bottle, 0.2, {rotation:0, ease:Quad.easeIn})
			.add("throw")
			.set([drop1, drop2, drop3], {alpha:1}, "throw+=0.1")
			.from(lime, 0.001, {x:-500, y:-90}, 0)
			.to(lime, 0.001, {x:-500, y:-90, rotation:-25}, 0) // reset, hide lime form beginning of anim
			.to(lime, 0.2, {x:42, y:-90, ease:Linear.easeNone}, "throw") // lime hits bottle
			.add("impact")
				.call(function (argument) {
					banner.shakeAll.play(0.0);
				}, [], null, "impact-=0.09")
				.to(bottle, 0.3, {rotation:4, ease:Quad.easeOut}, "impact+=0.05") // bottle wobble from impact
				.to(bottle, 0.3, {rotation:-2, ease:Quad.easeIn})
				.to(bottle, 0.2, {rotation:1, ease:Quad.easeIn})
				.to(bottle, 0.2, {rotation:0, ease:Quad.easeIn})
			.to(lime, 0.3, {x:20, y:-150, rotation:-360*2.4, ease:Quad.easeOut}, "throw+=0.2") // bounce of bottle
			.to(lime, 0.3, {x:0, y:0, rotation:-360*4.0, ease:Quad.easeIn}, "throw+=0.5") // lands on glass
			.staggerTo([drop1, drop2, drop3], 0.3, {scaleY:1.4, y:-60, ease: Power2.easeOut}, 0.04, "throw+=0.8")
			.from(glassSplash, 0.3, {x:-6, y:5, ease:Power2.easeOut}, "throw+=0.8")
			.to(glassSplash, 0.3, {x:0, y:20, ease:Power2.easeIn}, "throw+=1.1")
			.staggerTo([drop1, drop2, drop3], 0.3, {scaleY:1, y:0, ease: Power2.easeIn}, 0.04, "throw+=1.1")
			.to(glassContainer, 0.05, {y:2, rotation:-0.5}, "throw+=0.8")
			.to(glassContainer, 0.05, {y:0, rotation:0}, "throw+=0.85")
			.to(lime, 0.2, {y:-2, rotation:-360*3.995}, "throw+=0.8")
			.to(lime, 0.2, {y:0, rotation:-360*4.002}, "throw+=1.0") // wobbles
			.to(lime, 0.2, {y:0, rotation:-360*4.0}, "throw+=1.2")
			.set([drop1, drop2, drop3], {alpha:0}, "throw+=1.7")

			.call(function (e) {
				// pause before outro
				products.tl.pause();
			}, [], null, "out-=0.05")
			.add("out") // outro animation
			.to(bottle, 0.5, {x:300, rotation:-5}, "out")
			.to(glassContainer, 0.5, {x:300, rotation:-2}, "out+=0.1")
			.to(lime, 0.5, {x:300}, "out+=0.1")


		// if(animation.scrubber) animation.scrubber({"products":products.tl});
		// return;

		// var flare = animation.createElement({backgroundImage: "flare.png", left: 28, top: 94, alpha:0.7, parent: banner, retina: true});


		var legal = animation.createElement({backgroundImage: "legal.png", left:14, bottom: 4, parent: banner, retina: true});
		// legal.centerHorizontal();

		var txt_3 = animation.createElement({backgroundImage: "txt_3.png", left: 14, top: 43, parent: banner, retina: true});

		var logoCm = animation.createElement({left: 35, top: 155, parent: banner});
			var swordRight = animation.createElement({backgroundImage: "swordRight.png", left: 105-105, top: 113-112, parent: logoCm, retina: true});
			var swordLeft = animation.createElement({backgroundImage: "swordLeft.png", left: 109-105, top: 113-112, parent: logoCm, retina: true});
			var logoCenter = animation.createElement({backgroundImage: "logoCenter.png", left: 136-105, top: 114-112, parent: logoCm, retina: true});

		var logo = animation.createElement({backgroundImage: "logo.png", left: 31, top: 8, parent: banner, retina: true});

		var txt_1_2 = animation.createElement({backgroundImage: "txt_1_2.png", top: 129, parent: banner, retina: true, transformOrigin: "center top"});
		var txt_1_1 = animation.createElement({backgroundImage: "txt_1_1.png", top: 81, parent: banner, retina: true, transformOrigin: "center bottom"});

		var txt_2_2 = animation.createElement({backgroundImage: "txt_2_2.png", top: 129, parent: banner, retina: true, transformOrigin: "center top"});
		var txt_2_1 = animation.createElement({backgroundImage: "txt_2_1.png", top: 81, parent: banner, retina: true, transformOrigin: "center bottom"});

		txt_1_1.centerHorizontal();
		txt_1_2.centerHorizontal();
		txt_2_1.centerHorizontal();
		txt_2_2.centerHorizontal();
		var ctaMask = animation.createElement({width: 100, height: 50, left: 40, top: 190, parent: banner, overflow: "hidden"});
			var cta = animation.createElement({backgroundImage: "cta.png", parent: ctaMask, retina: true});



		// it would be cool to have a shake all elements when the lime hits the bottle
		//  ---- not used, not satisfied with it ---
		// by Martin
		banner.shakeAll = new TimelineLite({paused:true})
			.to(banner, 0.2, {scale:0.99, rotation:-0.8, x:1, ease:Back.easeIn})
			.to(banner, 0.2, {scale:1.00, rotation:0, x:0, ease:Elastic.easeOut});
			// .to([logoCm, legal, cta], 0.2, {scale:0.96, rotation:0.5, y:-1, x:-1, ease:Back.easeIn})
			// .to([logo, txt_3], 0.2, {scale:0.96, rotation:-1, y:2, ease:Back.easeIn}, "-=0.2")
			// .to([logo, logoCm, legal, txt_3, cta], 0.2, {scale:1.0, rotation:0, y:0, ease:Elastic.easeOut}, "+=0.02")

		////////////////////
		// A N I M A T I O N
		var logoLTl = new TimelineLite();
		logoLTl.addLabel("start");
		logoLTl.pause()
		logoLTl.addLabel("loop");
		logoLTl.from(logoCenter, 0.5, {scale:0, ease:Back.easeOut});
		logoLTl.fromTo(swordLeft, 0.31, {rotation: 120}, {rotation: 360, ease:SlowMo.easeInOut}, "=-0.5");
		logoLTl.fromTo(swordLeft, 0.2, {scale:0, x:20}, {scale: 0.5,  x: -50, ease:Power2.easeInOut}, "=-0.31");
		logoLTl.to(swordLeft, 0.25, {y: -10, scale:0.7, ease:Power1.easeInOut}, "=-0.3");
		logoLTl.to(swordLeft, 0.31, {scale:1, y: 0, x: 3, ease:Back.easeOut}, "=-0");
		logoLTl.to(logoCenter, 0.2, {x:3}, "=-0.2");


		var logoRTl = new TimelineLite();
		logoRTl.addLabel("start");
		logoRTl.pause()
		logoRTl.addLabel("loop");
		logoRTl.fromTo(swordRight, 0.31, {rotation: -120}, {rotation: -360, ease:SlowMo.easeInOut}, "=+0.5");
		logoRTl.fromTo(swordRight, 0.2, {scale:0, x:-20}, {scale: 0.5,  x: 50, ease:Power2.easeInOut}, "=-0.31");
		logoRTl.to(swordRight, 0.25, {y: -10, scale:0.7, ease:Power1.easeInOut}, "=-0.3");
		logoRTl.to(swordRight, 0.31, {scale:1, y: 0, x: 0, ease:Back.easeOut}, "=-0");
		logoRTl.to([logoCenter, swordLeft], 0.2, {x:0}, "=-0.2");

		var shakeTl = new TimelineLite();
		shakeTl.pause()
		shakeTl.addLabel("loop");
		shakeTl.to([logo, logoCm], 0.2, {scale: 0.96, rotation:-1, y:3, ease:Back.easeIn}, "=+0.14");
		// shakeTl.staggerTo([lid_left, lid_right], 0.1, {y:5}, 0.02, "=-0.1")
		shakeTl.to([logo, logoCm], 0.2, {scale: 1, rotation:0, y:0, ease:Elastic.easeOut});

		////////////////////////////
		//M A I N T I M E L I N E //
		////////////////////////////

		var tl = new TimelineLite({onComplete: function() {tl.seek("loop"); }});
		tl.addLabel("loop");

		tl.staggerFrom([txt_1_1, txt_1_2], 0.1, {scale: 5, alpha:0.0, ease:Power0.easeNone},0.05, "=+0.5");
		tl.to([banner], 0.2, {scale: 0.98, rotation:-0.7, y:1, ease:Back.easeIn}, "=-0.18");
		tl.to([banner], 0.2, {scale: 1, rotation:0, y:0, ease:Elastic.easeOut});
		tl.staggerTo([txt_1_1, txt_1_2], 0.3, {scale: 0, alpha:0.0, ease:Power2.easeIn},0.1, "=+1.5");

		tl.staggerFrom([txt_2_1, txt_2_2], 0.1, {scale: 5, alpha:0.0, ease:Power0.easeNone},0.05, "=+0.2");
		tl.to([banner], 0.2, {scale: 0.98, rotation:0.7, y:-1, ease:Back.easeIn}, "=-0.18");
		tl.to([banner], 0.2, {scale: 1, rotation:0, y:0, ease:Elastic.easeOut});
		tl.staggerTo([txt_2_1, txt_2_2], 0.3, {scale: 0, alpha:0.0, ease:Power2.easeIn},0.1, "=+1.5");

		// tl.from(captain, 0.3, {rotation: 20, scale:0.3, alpha:0, x:-30, y:20, ease:Power2.easeOut}, "=-0.3");

		tl.from([logo, logoCm], 0.3, {scale: 0, ease:Back.easeOut}, "=-0.5");
		tl.call(function(){
			logoRTl.seek("loop");
			logoRTl.play();
			logoLTl.seek("loop");
			logoLTl.play();

			// products, bottle, glass ... play intro
			products.tl.play("in");
		}, this, "=-0.1")


		//tl.from(captain, 0.3, {rotation: 20, scale:0.3, alpha:0, x:-30, y:20, ease:Power2.easeOut}, "=-0.3");
		tl.call(function(){shakeTl.seek("loop"),shakeTl.play()})
		tl.from([txt_3], 0.1, {scale: 5, alpha:0.0, ease:Power0.easeNone}, "=+0.2");
		tl.from(ctaMask, 0.3, {width:0, ease:Power2.easeInOut}, "=+0.2");
		tl.from([legal], 0.3, {y:35, ease:Power2.easeInOut}, "=-0.3");



		// tl.to([lid_right], 0.2, {y:5, ease:Power2.easeInOut}, "=+0.2");
		// tl.from([flare], 0.3, {scale:0, rotation: 180, x: -2, ease:Power2.easeIn}, "=-0.2");
		// tl.to([lid_right], 0.2, {y:0, ease:Power2.easeInOut}, "=+0");
		// tl.to([flare], 0.5, {scale:0, rotation: -180, x: 2, ease:Power2.easeIn}, "=-0.2");



		tl.call(function(){
			if(loopstop){
				tl.pause();
			}
			else{
				loopstop = true;
			}
		})

		tl.to(ctaMask, 0.3, {width:0, ease:Power2.easeInOut}, "=+5");
		tl.staggerTo([txt_3, logoCm, logo], 0.3, {x:-width, ease:Back.easeIn.config(0.4)},0.1, "=-0.3");
		tl.to([legal], 0.3, {y:35, ease:Power2.easeInOut}, "=-0.3");

		tl.call(function (e) {
			// products, bottle glassContainer, etc. play outro
			products.tl.play("out");
		}, [], null, "-=0.6")
		// tl.to(captain, 0.3, {y:150, ease:Back.easeIn.config(0.4)}, "=-0.3");

		tl.call(function(){
			logoRTl.seek(0);
			logoLTl.seek(0);
			logoRTl.pause();
			logoLTl.pause();
		});

		// timeline debugger
		// if(animation.scrubber) animation.scrubber({"banner":tl});

		////////////////////////
		// I N T E R A C T I O N
		var mouseX = 0;
		var mouseY = 0;
			//add listener

			clickArea.addEventListener("mouseover", function(e) {
				TweenLite.to(ctaMask, 0.2, {scale:1.1, ease:Power2.easeInOut});
			});

			clickArea.addEventListener("mouseout", function(e) {
				TweenLite.to(ctaMask, 0.2, {scale:1, ease:Power2.easeInOut});
			});

		});

	banner.onclick = function() {
		// clicktag logic here
		window.open(window.clickTag, "_blank");
	};
}