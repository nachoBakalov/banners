var animation = animation || {};
animation.main = function() {

	var width = 300;
	var height = 250;
	var banner = animation.createElement({width: width, height: height, backgroundColor: "#870C4F", overflow: "hidden", boxSizing: "border-box", border: "1px solid #000000", cursor: "pointer", parent: document.body});

	var images = [
	];

	animation.preloadImages(images, function () {
		// var guide = animation.createElement({backgroundImage: "guide2.jpg", parent: banner});
		var dnaCircleContainer = animation.createElement({left: 65, top: 20, scale: 0.79, parent: banner});
		var dnaCircle = animation.createElement({width: 200, height: 200, border: "5px solid #E81E63", overflow: "hidden", borderRadius: "100%", parent: dnaCircleContainer});
		var dnaStrains = animation.createElement({innerHTML: animation.svg.dna, top: 55, width: 200, height: 90, parent: dnaCircle});
		var arrow1 = animation.createElement({innerHTML: animation.svg.arrow, left: 50, top: 28, width: 35, height: 20, borderRadius: "100%", parent: dnaCircle}); arrow1.centerHorizontal();
		var arrow2 = animation.createElement({innerHTML: animation.svg.arrow, left: 50, bottom: 28, width: 35, height: 20, borderRadius: "100%", scaleX: -1, parent: dnaCircle}); arrow2.centerHorizontal();
		var logo = animation.createElement({innerHTML: animation.svg.logo, left: 84, top: 210, parent: banner});
		var texts = animation.createElement({innerHTML: animation.svg.text, parent: banner});
		var cta = animation.createElement({innerHTML: animation.svg.cta, left: 98, top: 169, width: 102, height: 30, parent: banner});
		var ctaSVG = document.getElementById("cta");
		var dnaYellow = document.getElementById("dnaYellow");
		var dnaGreen = document.getElementById("dnaGreen");
		var dnaBlue = document.getElementById("dnaBlue");
		var dnaGreen2 = document.getElementById("dnaGreen2");
		var dnaLong = document.getElementById("dnaLong");
		var dnaShort = document.getElementById("dnaShort");
		var dnaShortBlue = document.getElementById("dnaShortBlue");
		var dnaShortRed = document.getElementById("dnaShortRed");
		var dnaYellow2 = document.getElementById("dnaYellow2");
		TweenLite.set([dnaLong, dnaShortBlue, dnaShortRed], {display: "none"});

		function textIn (txt, stagger) {
			return new TimelineLite()
			.staggerFrom(txt, 1, {opacity: 0, ease: Power1.easeInOut}, stagger);
		}

		arrow1.slide = new TimelineLite()
		.fromTo(arrow1, 1.2, {x: 105}, {x: -105, ease: SlowMo.ease.config(0.5, 0.7, false)});

		arrow2.slide = new TimelineLite()
		.fromTo(arrow2, 1.2, {x: -105}, {x: 105, ease: SlowMo.ease.config(0.5, 0.7, false)});

		dnaCircle.shrink = new TimelineLite()
		.to(dnaCircle, 1, {scale: 0.53, y: -58, ease: Power1.easeInOut});

		cta.in = new TimelineLite()
		.from(cta, 1, {rotationX: -90, transformOrigin: "50% 50%", ease: Back.easeOut.config(2)});

		arrow1.slide2 = new TimelineLite()
		.fromTo(arrow1, 0.5, {x: 105}, {x: 0, ease: Power2.easeOut});

		arrow2.slide2 = new TimelineLite()
		.fromTo(arrow2, 0.5, {x: -105}, {x: 0, ease: Power2.easeOut});

		logo.in = new TimelineLite()
		.from("#logo-circle", 0.5, {drawSVG: 0, ease: Power2.easeInOut})
		.from("#logo-arrow", 0.5, {x: -20, opacity: 0, ease: Power2.easeInOut}, "-=0.3")
		.add("txt", "-=0.1")
		.from("#logo-cure", 0.5, {opacity: 0, ease: Power1.easeInOut}, "txt")
		.from("#logo-forward", 0.5, {opacity: 0, ease: Power1.easeInOut}, "txt+=0.1");

		dnaCircle.in = new TimelineLite()
		.add("start")
		.fromTo(dnaCircle, 2, {scale: 0}, {scale: 1, ease: Elastic.easeOut.config(0.5, 0.4)})
		.add("dna in", "start+=0.2")
		.from(dnaYellow, 1, {drawSVG: 0, ease: Power2.easeInOut}, "dna in")
		.from(dnaGreen, 1, {drawSVG: 0, ease: Power2.easeInOut}, "dna in+=0.1")
		.add("pan", "-=0.5")
		.add(arrow1.slide, "pan")
		.add(arrow2.slide, "pan")
		.set(dnaShort, {display: "none"}, "pan")
		.set(dnaLong, {display: "block"}, "pan")
		.to(dnaLong, 2, {x: -456, ease: Power2.easeInOut}, "pan")
		.set(dnaShortBlue, {display: "block"})
		.set(dnaLong, {display: "none"})
		.add("shrink")
		.add([arrow1.slide2, arrow2.slide2], "shrink")
		// .to([dnaGreen2, dnaBlue], 1, {drawSVG: "95% 5%"}, "shrink")
		.to(dnaStrains, 0.5, {scale: 0.8, ease: Power2.easeInOut}, "shrink")
		.add("change", "shrink-=0.1")
		.set(dnaShortRed, {display: "block"}, "change")
		.to([dnaBlue], 1, {drawSVG: 0, ease: Power1.easeIn}, "change")
		.to([dnaGreen2], 1, {drawSVG: "0 0", ease: Power1.easeIn}, "change")
		.fromTo([dnaYellow2], 1, {drawSVG: "100% 100%"}, {drawSVG: "0% 100%", immediateRender: false, ease: Power1.easeIn}, "change")
		.fromTo([dnaRed], 1, {drawSVG: "100% 100%"}, {drawSVG: "0% 100%", immediateRender: false, ease: Power1.easeIn}, "change")

		.add("change2")
		.fromTo([dnaYellow2], 1, {drawSVG: "0% 100%"}, {drawSVG: "0% 0%", immediateRender: false, ease: Power1.easeOut}, "change2")
		// .fromTo([dnaRed], 1, {drawSVG: "100% 0"}, {drawSVG: "100% 100%", immediateRender: false, ease: Power1.easeOut}, "change2")
		.fromTo([dnaBlue], 1, {drawSVG: "100% 100%"}, {drawSVG: "0 100%", immediateRender: false, ease: Power1.easeOut}, "change2")
		.fromTo([dnaGreen2], 1, {drawSVG: "100% 100%"}, {drawSVG: "0 100%", immediateRender: false, ease: Power1.easeOut}, "change2");

		var mainTimeline = new TimelineLite()
		.add("start", "+=0.5")
		.add(dnaCircle.in, "start")
		.add(logo.in, "start+=1")
		.add("shrink", "start+=2")
		.add(dnaCircle.shrink, "shrink")
		.add("txt1", "shrink+=0.5")
		.add(textIn(["#txt1-1"], 0.1), "txt1")
		.add("txt2", "-=2")
		.add(textIn(["#txt2-1"], 0.1), "txt2")
		.add(cta.in)

		if (animation.scrubber) animation.scrubber({mainTimeline: mainTimeline});

		banner.onmouseenter = function () {
			TweenLite.to(ctaSVG, 0.3, {fill: "#007f0c"});
		};
		banner.onmouseleave = function () {
			TweenLite.to(ctaSVG, 0.3, {fill: "#00E575"});
		};
	});
	


	banner.onclick = function() {
		window.open(window.clickTag);
	};


};