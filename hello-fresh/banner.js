var clickTag = "https://www.hellofresh.com";
var animation = animation || {};
animation.main = function() {

	var width = 300;
	var height = 250;
	var banner = animation.createElement({id: "banner", width: width, height: height, backgroundColor: "#f0e9d8", border:"1px solid #da8753", boxSizing: "border-box", overflow: "hidden", cursor: "pointer", parent: document.body});
	
	var images = [
		"wheel.png",
		"box.png", 
		"txt_1_5.png", 
		"txt_1_4.png", 
		"txt_1_3.png", 
		"txt_1_2.png", 
		"txt_1_1.png", 
		"wheel_logo.png", 
		"offer_frame.png", 
		"cta.png", 
		"txt_3_2.png", 
		"txt_3_1_1.png", 
		"txt_3_1_2.png", 
		"txt_3_1_3.png", 
		"txt_3_1_4.png", 
		"logo.png", 
		"marker.png", 
	];

	animation.preloadImages(images, function(){

		var wheel = new Wheel(
			{id: "wheel", backgroundImage: "wheel.png", retina: true, left: 172, top: 27, parent: banner},
			[0, 3, 1, 0, 2, 3, 1, 2]
		)
		wheel.onComplete = function(index){
			result[index].set({autoAlpha: 1})
			tl.resume();
		}
		var svg_container = animation.createElement({id: "svg_container", innerHTML: svg.txt_2, width: width, height: height, parent: banner});
		var txt_2 = document.getElementById('txt_2').getElementsByTagName("path")
		var arrow = document.getElementById('arrow').getElementsByTagName("path");

		var box = animation.createElement({backgroundImage: "box.png", left: -50, top: 150, retina: true, parent: banner});
		var txt_1 = animation.createElement({left: 24, top: 19, width: 131, height: 121, parent: banner});
			var txt_1_5 = animation.createElement({backgroundImage: "txt_1_5.png", left: 18, top: 109, retina: true, parent: txt_1});
			var txt_1_4 = animation.createElement({backgroundImage: "txt_1_4.png", left: 22, top: 74, retina: true, parent: txt_1});
			var txt_1_3 = animation.createElement({backgroundImage: "txt_1_3.png", left: 10, top: 55, retina: true, parent: txt_1});
			var txt_1_2 = animation.createElement({backgroundImage: "txt_1_2.png", top: 20, retina: true, parent: txt_1});
			var txt_1_1 = animation.createElement({backgroundImage: "txt_1_1.png", left: 26, retina: true, parent: txt_1});
		var wheel_logo = animation.createElement({backgroundImage: "wheel_logo.png", left: 255, top: 111, retina: true, parent: banner});
		var offer_frame = animation.createElement({width: width, height: height, backgroundColor: "#8aba40", left: 176, parent: banner});
		var cta = animation.createElement({backgroundImage: "cta.png", left: 5, top: 182, retina: true, parent: offer_frame});
		var txt_3 = animation.createElement({left: 27, top: 28, width: 74, height: 140, parent: offer_frame});
			var txt_3_2 = animation.createElement({backgroundImage: "txt_3_2.png", top: 105, retina: true, parent: txt_3});
			var txt_3_1 = animation.createElement({left: 4, width: 63, height: 96, parent: txt_3});
				var txt_3_1_1 = animation.createElement({backgroundImage: "txt_3_1_1.png", retina: true, parent: txt_3_1});
				var txt_3_1_2 = animation.createElement({backgroundImage: "txt_3_1_2.png", retina: true, parent: txt_3_1});
				var txt_3_1_3 = animation.createElement({backgroundImage: "txt_3_1_3.png", retina: true, parent: txt_3_1});
				var txt_3_1_4 = animation.createElement({backgroundImage: "txt_3_1_4.png", retina: true, parent: txt_3_1});
		var logo = animation.createElement({backgroundImage: "logo.png", left: 40, top: 155, retina: true, parent: banner});
		var marker = wheel.marker = animation.createElement({backgroundImage: "marker.png", left: 157, top: 124, retina: true, parent: banner});

			var tl = new TimelineLite({onComplete:function(){
			banner.addEventListener("mouseenter", function(){
				var txts = [txt_1_1, txt_1_2, txt_1_3, txt_1_4, txt_1_5];
				var hover_tl = new TimelineLite()
				for (var i = 0; i < txts.length; i++) {
					var txt = txts[i];
					var tl = new TimelineLite({delay: i * 0.1})
					.to(txt, 0.15, {scale: 1.1, ease: Power1.easeIn})
					.to(txt, 0.4, {scale: 1, ease: Back.easeOut.config(4.1)});
				}
			});


		}})


		var result = [txt_3_1_1, txt_3_1_2, txt_3_1_3, txt_3_1_4]
		TweenLite.set(result, {autoAlpha: 0})


		tl
		.addLabel("intro")
		.staggerFrom([txt_1_1, txt_1_2, txt_1_3, txt_1_4, txt_1_5], .4, {left: -width, opacity: 0, ease: Back.easeOut.config(.8)}, .05)
		.addLabel("txt_2")
		.staggerFrom(txt_2, .075, {drawSVG: "0%"}, .075, "txt_2")
		.staggerFrom(txt_2, .075, {opacity: 0, ease: Power4.easeOut}, .075, "txt_2")
		.addLabel("arrow+=.5")
		.staggerFrom(arrow, .2, {drawSVG: "0%"}, .2, "arrow")
		.staggerFrom(arrow, .2, {opacity: 0, ease: Power4.easeOut}, .2, "arrow")
		.call(function(){
			banner.onclick = function() {
				wheel.start();
				TweenLite.to(svg_container, .3, {opacity: 0})
				banner.onclick = function() {
					window.open(clickTag)
				};
			};
		})
		.call(tl.pause, null, tl)
		.addLabel("outro")
		.from(logo, .5, {scale: 0, ease: Back.easeOut}, "outro+=0.7")
		.to(wheel.container, .5, {scale: 0, ease: Back.easeIn}, "outro")
		.from(offer_frame, .5, {x: width, ease: Back.easeOut.config(.8)}, "outro+=.3")
		.to(marker, .2, {opacity: 0}, "outro")
	})

	function Wheel(parameters, indexes){
		var container = this.container = animation.createElement(parameters),
		speed = this.speed = 0,
		onComplete = this.onComplete = null,
		prevIndex = 0,
		marker = this.marker = null,
		checkForCompletion = false

		this.start = function(){
			var acceleration = 1;
			var deceleration = 10;
			// TweenLite.to(this, acceleration, {speed: -.09, ease: Back.easeIn})
			TweenLite.to(this, acceleration, {speed: - 32.03, ease: Back.easeIn.config(.7)})
			TweenLite.delayedCall(acceleration + deceleration , function(){
				checkForCompletion = true;
			})
			TweenLite.to(this, deceleration, {speed: 0, ease: Expo.easeOut, delay: acceleration})
		}

		function update(){
			container.set({rotation: "+=" + this.speed})
			var safety_angle = 8;
			var slice_max_angle = 360 / indexes.length;
			var rotation = container.get("rotation") % 360;
			var slice_angle = rotation % slice_max_angle;
			var current_index = Math.abs(~~(rotation / slice_max_angle));
			if(current_index != prevIndex) {
				// Marker animation
				var click_speed = animation.utils.clamp(.1 / Math.abs(this.speed), 0, .5);
				this.marker.to(click_speed, {rotation: animation.utils.clamp(-this.speed * 10, 25, 60), overwrite: "concurrent", ease: Power4.easeOut})
				this.marker.to(.5, {rotation: 0, delay: click_speed, ease: Back.easeOut.config(3)})
			}
			if(checkForCompletion && Math.abs(this.speed) < 0.1) {
				// perform check to prevent stopping too close to the edge of an offer
				slice_angle = Math.abs(slice_angle);
				if(slice_angle > safety_angle && slice_angle < slice_max_angle - safety_angle || this.speed == 0) {
					TweenLite.set(this, {speed: 0, overwrite: "all"});
					TweenLite.delayedCall(0.2, complete, [indexes[current_index]], this); 
				}
			}
			prevIndex = current_index;
		}
		TweenLite.ticker.addEventListener("tick", update, this);

		function complete(index){
			TweenLite.ticker.removeEventListener("tick", update);
			this.onComplete(index);
		}


	}
}