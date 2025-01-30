var animation = animation || {};
animation.main = function() {

	var width = 300;
	var height = 250;
	var banner = animation.createElement({width: width, height: height, background: "#FFF", border: "1px solid #000", boxSizing: "border-box", overflow: "hidden", perspective: 500, cursor: "pointer", parent: document.body});
	var introFade = animation.createElement({background: "#FFF", width: width, height: height, zIndex: 1000, parent: banner});
	var colors = {
		color1: "#f8deb8",
		color2: "#e49b6a",
		color3: "#ec5fcf",
		color4: "#e15f05"
	};
	var clickTag = "http://www.google.org";
	banner.onclick = function() {
		// clicktag logic here
		window.open(clickTag, "_blank");
	};
	var circlesContainer = animation.createElement({width: 1, height: 1, zIndex: 1, parent: banner}); circlesContainer.center();
	var circles = [
		{
			centerPoint: animation.createElement({width: 1, height: 1, left: 0, right: 0, top: 0, bottom: 0, margin: "auto", parent: circlesContainer}),
			numCircles: 20,
			radius: 110,
			slice: 0,
			rotation: 0,
			rotationSpeed: -0.005,
			dotRadius: 10,
			dotScale: 1,
			randomSpeed: 0.1,
			randomFactor: 2,
			dotColor: colors.color1,
			dots: [],
			init: function () {
				this.slice = Math.PI * 2 / this.numCircles;
				this.initialRadius = this.radius;
			}
		},
		{
			centerPoint: animation.createElement({width: 1, height: 1, left: 0, right: 0, top: 0, bottom: 0, margin: "auto", parent: circlesContainer}),
			numCircles: 20,
			radius: 135,
			slice: 0,
			rotation: 0,
			rotationSpeed: -0.007,
			dotRadius: 15,
			dotScale: 1,
			randomSpeed: 0.1,
			randomFactor: 2,
			dotColor: colors.color2,
			dots: [],
			init: function () {
				this.slice = Math.PI * 2 / this.numCircles;
				this.initialRadius = this.radius;
			}
		},
		{
			centerPoint: animation.createElement({width: 1, height: 1, left: 0, right: 0, top: 0, bottom: 0, margin: "auto", parent: circlesContainer}),
			numCircles: 20,
			radius: 168,
			slice: 0,
			rotation: 0,
			rotationSpeed: -0.009,
			dotRadius: 20,
			dotScale: 1,
			randomSpeed: 0.1,
			randomFactor: 2,
			dotColor: colors.color3,
			dots: [],
			init: function () {
				this.slice = Math.PI * 2 / this.numCircles;
				this.initialRadius = this.radius;
			}
		},
		{
			centerPoint: animation.createElement({width: 1, height: 1, left: 0, right: 0, top: 0, bottom: 0, margin: "auto", parent: circlesContainer}),
			numCircles: 20,
			radius: 210,
			slice: 0,
			rotation: 0,
			rotationSpeed: -0.011,
			dotRadius: 25,
			dotScale: 1,
			randomSpeed: 0.1,
			randomFactor: 2,
			dotColor: colors.color4,
			dots: [],
			init: function () {
				this.slice = Math.PI * 2 / this.numCircles;
				this.initialRadius = this.radius;
			}
		},
	];
	var centerPoints = [];
	var dots = [];

	// create circles, all on one point
	for (var i = 0; i < circles.length; i++) {
		circles[i].init();
		createDots(circles[i]);
		centerPoints.push(circles[i].centerPoint);
		for (var j = 0; j < circles[i].dots.length; j++) {
			var dot = circles[i].dots[j];
			dot.randomFactor = 0;
			dots.push(dot);
		}
	}

	var images = [
		"lid.png",
		"ctaShine.png",
		"keurig.png",
		"cta.png",
		"txt8.png",
		"txt7.png",
		"txt6_2.png", 
		"txt6_1.png", 
		"txt5_2.png", 
		"txt5_1.png", 
		"txt4_2.png", 
		"txt4_1.png", 
		"txt3.png", 
		"txt2.png", 
		"txt1.png", 
		"logo_big.png",
		"logo.png",
		"shadow.jpg"
	];

	var imageSequence = createImageSequence(15, "frames/frame", ".jpg");
	images = images.concat(imageSequence);

	animation.preloadImages(images, function() {

		///////////////////////
		// C R E A T E  D I V S

		var endFrameDotPoint = animation.createElement({background: "red", width: 10, height: 10, x: -100, display: "none", y: 80, parent: banner}); endFrameDotPoint.center();
		var cta = animation.createElement({backgroundImage: "cta.png", left: 21, top: 148, retina: true, parent: banner});
		var ctaShine = animation.createElement({backgroundImage: "ctaShine.png", scale: 3, parent: cta});
		var txt8_1 = animation.createElement({backgroundImage: "txt8.png", left: 19, top: 96, clip: "rect(0 1000px 11px 0)", retina: true, parent: banner});
		var txt8_2 = animation.createElement({backgroundImage: "txt8.png", left: 19, top: 96, clip: "rect(11px 1000px 1000px 0)",  retina: true, parent: banner});
		var txt7 = animation.createElement({backgroundImage: "txt7.png", left: 19, top: 94, retina: true, parent: banner});
		var txt6_2 = animation.createElement({backgroundImage: "txt6_2.png", left: 79, top: 132, retina:true, parent: banner});
		var txt6_1 = animation.createElement({backgroundImage: "txt6_1.png", left: 83, top: 92, retina:true, parent: banner});
		var txt5_2 = animation.createElement({backgroundImage: "txt5_2.png", left: 89, top: 125, retina:true, parent: banner});
		var txt5_1 = animation.createElement({backgroundImage: "txt5_1.png", left: 90, top: 85, retina:true, parent: banner});
		var txt4_2 = animation.createElement({backgroundImage: "txt4_2.png", left: 86, top: 124, retina: true, parent: banner});
		var txt4_1 = animation.createElement({backgroundImage: "txt4_1.png", left: 87, top: 85, retina: true, parent: banner});
		var txt3 = animation.createElement({backgroundImage: "txt3.png", left: 60, top: 96, retina: true, parent: banner});
		var txt2 = animation.createElement({backgroundImage: "txt2.png", left: 39, top: 23, retina: true, parent: banner});
		var txt1_2 = animation.createElement({backgroundImage: "txt1.png", left: 57, top: 17, retina: true, clip: "rect(15px 1000px 50px 0)", parent: banner});
		var txt1_1 = animation.createElement({backgroundImage: "txt1.png", left: 57, top: 17, retina: true, clip: "rect(0 1000px 15px 0)", parent: banner});
		var shadow = animation.createElement({backgroundImage: "shadow.jpg", left: 122, top: 187, zIndex: 0, parent: banner});
		var keurig = animation.createElement({backgroundImage: "keurig.png", left: 86, top: 73, zIndex: 10, parent: banner});
		var smokeCanvas = animation.createElement({type: "canvas", width: 87, height: 74, left: 4, top: 36, opacity: 0, display: "none", parent: keurig});
		var lid = animation.createElement({backgroundImage: "lid.png", left: 74, top: 61, zIndex: 20, parent: banner});
		var logo_big = animation.createElement({backgroundImage: "logo_big.png", left: 20, top: 66, retina: true, parent: banner});
		var logo = animation.createElement({backgroundImage: "logo.png", left: 209, top: 230, zIndex: 100, retina: true, parent: banner});
		var smallDot = animation.createElement({background: colors.color2, width: 25, height: 25, left: 135, top: 142, borderRadius: "100%", parent: banner});

		var smoke = new animation.Sequence(smokeCanvas, imageSequence, 12, true);

		////////////////////
		// A N I M A T I O N

		function animateTextIn (txt, stagger) {
			return new TimelineLite()
			.staggerFrom(txt, 0.5, {opacity: 0, y: 20, ease: Power2.easeOut}, stagger);
		}

		function animateTextOut (txt, stagger) {
			return new TimelineLite()
			.staggerTo(txt, 0.5, {opacity: 0, y: 10, ease: Power2.easeIn}, stagger);
		}

		function animateTextIn2 (txt, stagger) {
			return new TimelineLite()
			.staggerFrom(txt, 0.3, {opacity: 0, ease: Linear.easeNone}, stagger);
		}

		function animateTextOut2 (txt, stagger) {
			return new TimelineLite()
			.staggerTo(txt, 0.3, {opacity: 0, ease: Linear.easeNone}, stagger);
		}


		keurig.in1 = new TimelineLite()
		.from(keurig, 0.6, {y: 200, opacity: 0, ease: Power2.easeOut});

		keurig.out1 = new TimelineLite()
		.to(keurig, 0.6, {y: 200, opacity: 0, ease: Power2.easeIn});

		keurig.in2 = new TimelineLite()
		.set(keurig, {width: 106, immediateRender: false}) // make the machine smaller for the endframe
		.fromTo(keurig, 1, {y: -40, x: 150, opacity: 0}, {y: -40, x: 88, opacity: 1, immediateRender: false, ease: Power2.easeInOut})
		.call(function () { smoke.timeline.play(); smokeCanvas.style.display = "block"; })
		.from(shadow, 0.5, {opacity: 0})
		.to(smokeCanvas, 0.5, {opacity: 1}, "-=0.5");

		smokeCanvas.out = new TimelineLite()
		.to(smokeCanvas, 1, {opacity: 0, display: "none"}, "+=1");

		lid.in = new TimelineLite()
		.from(lid, 0.5, {scale: 0, ease: Back.easeOut})
		.to(lid, 1, {rotationY: "+=360", ease: Power2.easeOut}, 0);

		lid.shrink = new TimelineLite()
		.to(lid, 1, {rotationY: "+=360", scale: 0.2, y: 20, ease: Power2.easeInOut})
		.to(lid, 0.1, {opacity: 0}, "-=0.1");

		smallDot.in = new TimelineLite()
		.from(smallDot, 0.1, {opacity: 0});

		txt7.in = new TimelineLite()
		.from(txt7, 0.5, {opacity: 0, y: 20, ease: Power2.easeOut});

		txt7.out = new TimelineLite()
		.to(txt7, 0.5, {opacity: 0, y: 20, ease: Power2.easeIn});

		logo.out = new TimelineLite()
		.to(logo, 0.5, {opacity: 0, ease: Linear.easeNone});

		cta.in = new TimelineLite()
		.from(cta, 0.5, {opacity: 0, y: 20, ease: Power2.easeOut})
		.fromTo(ctaShine, 1, {x: -100}, {x: 150, ease: Power2.easeInOut});

		logo_big.in = new TimelineLite()
		.from(logo_big, 0.3, {opacity: 0, y: 20, ease: Power2.easeOut});

		var dotsExplosionTimeline = new TimelineLite()
		.staggerFrom(circles, 0.7, {dotScale: 0, ease: Power2.easeInOut}, 0.05)
		.staggerFrom(circles, 0.7, {radius: 0, ease: Power2.easeInOut}, 0.05, 0)
		// .to(circlesContainer, 2, {rotation: -40}, 0)
		.to(circlesContainer, 1, {y: -80, ease: Power2.easeInOut}, 0);

		var dotsExplosion2Timeline = new TimelineLite()
		.to(circlesContainer, 0.001, {opacity: 1, y: 30})
		.add("explode");
		for (var i = 0; i < circles.length; i++) {
			dotsExplosion2Timeline.to(circles[i], 0.7, {radius: circles[i].initialRadius - 20}, "explode+=" + 0.05 * i);
		}
		dotsExplosion2Timeline.to(circlesContainer, 0.3, {y: 0}, "-=0.5")
		// .to(circlesContainer, 2, {rotation: -40}, 0)
		.to(smallDot, 0.1, {opacity: 0}, 0);

		var dotsShrinkTimeline = new TimelineLite()
		.to(circles, 1, {dotScale: 0.6, ease: Power2.easeInOut});
		for (i = 0; i < circles.length; i++) {
			dotsShrinkTimeline.to(circles[i], 0.6, {radius: "-=" + 5 * i, ease: Power2.easeInOut}, 0);
		}

		var dotsGrowTimeline = new TimelineLite()
		.to(circles, 1, {dotScale: 1.8, ease: Power2.easeInOut});
		for (i = 0; i < circles.length; i++) {
			dotsGrowTimeline.to(circles[i], 0.8, {radius: circles[i].initialRadius - 20, ease: Power2.easeInOut}, 0);
		}

		// this timeline fades out all dots except one and tweens that dot to the keurig machine
		var currentNearestDistance = 1000;
		var targetX = endFrameDotPoint.get("x");
		var targetY = endFrameDotPoint.get("y");
		var nearestDot = null;

		var dotsEndFrameTimeline = new TimelineLite()
		.to(circles, 1, {dotScale: 1, ease: Power2.easeInOut})
		.call(function () {
			for (var i = 0; i < circles.length; i++) {
				for (var j = 0; j < circles[i].dots.length; j++) {
					var dot = circles[i].dots[j];
					if (i == 1) {
						// animate this dot to end position
						var distance = animation.utils.dist(dot.get("x"), dot.get("y"), targetX, targetY);
						if (distance < currentNearestDistance) {
							currentNearestDistance = distance;
							nearestDot = dot;
						}
						// console.log(animation.utils.dist(dot.get("x"), dot.get("y"), targetX, targetY));
						// dotsEndFrameTimeline.call(function () { dot.update = false; }, [], null, 0.4);
						// dotsEndFrameTimeline.to(dot, 0.5, {x: -60, y: 80, ease: Power2.easeInOut}, 0.5);
					}
				}
			}
			for (i = 0; i < dots.length; i++) {
				if (dots[i] != nearestDot) {
					TweenLite.to(dots[i], 1, {opacity: 0});
				}
			}
			nearestDot.update = false;
			dotsEndFrameTimeline.add("animateDot")
			.to(nearestDot, 1, {x: 18, y: 79, scale: 2.5, rotationY: 180, opacity: 1, overwrite: 1, ease: Power2.easeInOut}, "animateDot")
			.to(lid, 0.001, {x: 66, y: 115, width: 53, scale: 1}, "animateDot")
			.add("lid", "-=0.42")
			.fromTo(lid, 0.2, {opacity: 0, x: "-=50", rotationY: -90}, {opacity: 1, x: "+=50", rotationY: 0}, "lid")
			.to(nearestDot, 0.1, {opacity: 0}, "lid+=0.1");
		});


		// animate nearestDot

		var dotsContractTimeline = new TimelineLite()
		.to(circles, 0.3, {radius: 0})
		.to(circlesContainer, 0.3, {y: 10}, 0)
		.to(circlesContainer, 0.001, {opacity: 0}, "-=0.05");

		var mainTimeline = new TimelineLite()
		.add("start", "+=0.5")
		.add(dotsExplosionTimeline, "start")
		.add(keurig.in1, "start+=0.2")
		
		.add("txt1", "start+=0.5")
		.add(animateTextIn([txt1_1, txt1_2], 0.1), "txt1")

		.add("keurig out", "+=0.5")
		.add(keurig.out1, "keurig out")
		.add(animateTextOut([txt1_2, txt1_1], 0.1), "keurig out")
		.add(dotsContractTimeline)

		.add("txt2", "-=0.1")
		.add(lid.in, "txt2")
		.add(animateTextIn([txt2]), "txt2")

		.add("txt3")
		.add(animateTextOut([txt2]), "txt3")
		.add(lid.shrink, "txt3")
		.add(animateTextIn([txt3]), "txt3+=0.5")
		.add(smallDot.in, "txt3+=0.8")

		.add("txt4", "+=0.5")
		.add(animateTextOut([txt3]), "txt4")
		.add(dotsExplosion2Timeline, "txt4+=0.2")
		.add(animateTextIn([txt4_1, txt4_2], 0.05), "txt4+=0.4")

		.add("txt5", "+=0.5")
		.add(animateTextOut2([txt4_1, txt4_2]), "txt5")
		.add(dotsShrinkTimeline, "txt5")
		.add(animateTextIn2([txt5_1, txt5_2]), "txt5+=0.5")

		.add("txt6", "+=0.5")
		.add(animateTextOut2([txt5_1, txt5_2]), "txt6")
		.add(dotsGrowTimeline, "txt6")
		.add(animateTextIn2([txt6_1, txt6_2]), "txt6+=0.5")

		.add("txt7", "+=0.5")
		.add(animateTextOut2([txt6_1, txt6_2]), "txt7")
		.add(dotsEndFrameTimeline, "txt7")
		.add(keurig.in2, "txt7+=0.5")
		.add(logo_big.in, "txt7+=2")
		.add(logo.out, "txt7+=2")
		.add(txt7.in, "txt7+=2.1")

		.add("txt8", "+=2")
		.add(txt7.out, "txt8")
		.add(animateTextIn([txt8_1, txt8_2], 0.1), "txt8+=0.5")
		.add(cta.in, "txt8+=0.7")
		.add(smokeCanvas.out, "txt8+=0.7");
		
		// if (animation.scrubber) animation.scrubber({mainTimeline: mainTimeline});

		TweenLite.to(introFade, 0.5, {opacity: 0, display: "none"});
		TweenLite.delayedCall(15, function () { console.log("LOOPSTOP"); });

		////////////////////////
		// I N T E R A C T I O N

		banner.onmouseenter = function () {
			TweenLite.fromTo(ctaShine, 1, {x: -100}, {x: 150, ease: Power2.easeInOut});
			TweenLite.to(cta, 0.5, {scale: 1.1, ease: Back.easeOut});
			TweenLite.to(cta, 0.5, {scale: 1, delay: 0.5, ease: Back.easeOut});
		};

	});

	TweenLite.ticker.addEventListener("tick", onUpdate);

	function onUpdate () {
		// update circle dots
		for (var i = 0; i < circles.length; i++) {
			updateDots(circles[i]);
		}
	}

	function createDots (circleObject) {
		// create circles
		for (var i = 0; i < circleObject.numCircles; i++) {
			var angle = i * circleObject.slice;
			var dot = animation.createElement({background: circleObject.dotColor, width: circleObject.dotRadius, height: circleObject.dotRadius, left: - circleObject.dotRadius / 2, top:  - circleObject.dotRadius / 2, borderRadius: "100%", x: Math.cos(angle) * circleObject.radius, y: Math.sin(angle) * circleObject.radius, parent: circleObject.centerPoint});
			dot.update = true;
			circleObject.dots.push(dot);
		}
	}

	function updateDots (circleObject) {
		for (var i = 0; i < circleObject.dots.length; i++) {
			var centerPoint = circleObject.centerPoint;
			var dot = circleObject.dots[i];
			circleObject.rotation += animation.utils.toRadians(circleObject.rotationSpeed);
			var angle = i * circleObject.slice + circleObject.rotation;
			// centerPoint.set({rotation: "+=" + circleObject.rotationSpeed});
			if (dot.update) {
				dot.randomFactor += Math.random() * circleObject.randomSpeed;
				var randomFactorX = Math.cos(dot.randomFactor) * circleObject.randomFactor;
				var randomFactorY = Math.sin(dot.randomFactor) * circleObject.randomFactor;
				dot.set({x: Math.cos(angle) * circleObject.radius + randomFactorX, y: Math.sin(angle) * circleObject.radius + randomFactorY, scale: circleObject.dotScale});
			}
		}
	}
	function createImageSequence (numImages, prefix, suffix) {
		var array = [];
		for (var i = 0; i < numImages; i++) {
			var image = prefix + i + suffix;
			array.push(image);
		}
		return array;
	}
};