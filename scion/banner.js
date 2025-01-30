var clickTag = "http://www.google.com";
var animation = animation || {};
animation.main = function() {

	var width = 300;
	var height = 250;
	var banner = animation.createElement({width: width, height: height, backgroundColor: "#333e48", overflow: "hidden", cursor: "pointer", parent: document.body});
	var mouseX = 0;
	var mouseY = 0;
	var canvas = animation.createElement({type: "canvas", width: width, height: height, parent: banner});
	ctx = canvas.getContext("2d");

	var images = [
		"bg.jpg", 
		"cursor.png", 
		"txt_3.png", 
		"txt_2.png", 
		"txt_1.png", 
		"logo_im.png", 
		"logo_ia.png", 
		"logo_scion.png", 
		"car_1_base.png", 
		"car_1_top.png", 
		"car_2_base.png", 
		"car_2_top.png", 
		"cta_txt.png",
		"tube.png",
		"hair_1.png",
		"hair_2.png",
		"hair_3.png",
		"arm_r_1.png",
		"arm_r_2.png",
		"arm_l_1.png",
		"arm_l_2.png",
	];

	animation.preloadImages(images, function() {


		var bg = animation.createElement({backgroundImage: "bg.jpg", retina: true, parent: banner});

		/////////////////
		// T U B E  M A N

		// tube torso divs		
		var tube_top = animation.createElement({backgroundImage: "tube.png", retina: true});
		var tube_bottom = animation.createElement({backgroundImage: "tube.png", retina: true});
		var tube_height = tube_top.get("height");
		var tube_width = tube_top.get("width");
		var tube_ball = animation.createElement({backgroundImage: "tube.png", scale: 0.95, width: tube_width, height: tube_width, borderRadius: "100%"});
		tube_ball.style.backgroundSize = "100%";
		tube_top.style.backgroundSize = "100%";
		tube_top.style.backgroundPosition = "50% 0";
		tube_top.set({borderRadius: tube_width/2});
		tube_bottom.style.backgroundSize = "100%";
		tube_bottom.style.backgroundPosition = "50% 100%";		
		tube_bottom.set({borderRadius: tube_width/2});

		// hair
		var tube_hair = animation.createElement();
		var tube_hair_inner = animation.createElement({backgroundImage: ["hair_1.png", "hair_2.png", "hair_3.png"], retina: true, parent: tube_hair});
		tube_hair_inner.set({x: -tube_hair_inner.get("width")/2 + 3, y: -tube_hair_inner.get("height")/2})

		// tube arm divs
		var tube_arm_r_1 = animation.createElement({backgroundImage: "arm_r_1.png", retina: true});
		var tube_arm_r_2 = animation.createElement({backgroundImage: "arm_r_2.png", retina: true});
		
		var tube_arm_l_1 = animation.createElement({backgroundImage: "arm_l_1.png", retina: true});
		var tube_arm_l_2 = animation.createElement({backgroundImage: "arm_l_2.png", retina: true});
		var arm_position = (tube_height - 35);

		// append
		var tube = animation.createElement({width: width, height: height, scaleX: 1, parent: banner});
		tube.appendChildren([tube_arm_l_2, tube_arm_l_1, tube_ball, tube_hair, tube_bottom, tube_top,  tube_arm_r_1, tube_arm_r_2, ]);
		
		// create points
		var base_p = {x: width/2 + 20, y: 160};
		var mid_p = {x: width/2, y: height - tube_height * 0.5};
		var head_p = particle.create(width/2, height - tube_height, 0, 0, 0);	
		var head_target_p = {x: width/2, y: height - tube_height};
		var points = [base_p, mid_p, head_p, head_target_p];

		banner.addEventListener("click", function() {
			console.log(mouseX, mouseY);
			//tube.set({scaleX: -tube.get("scaleX"), transformOrigin: base_p.x + "px " + base_p.y + "px"});	
		});
		
		// animation variables
		var tube_anim = {
			x: 0,
			y: 0,
			centerX: 0,
			centerY: 0,
			swag_speed: 0,
			swag_a: 0,
			swag_height: 30,
			swag_width: 10,
		}		

		// connect spring
		head_p.addSpring(head_target_p, 0.025, 0);
		head_p.friction = 0.9;

		// update
		var a1 = 0; // lower body angle
		var a2 = 0; // upper body angle
		var a3 = 0; // arms angle
		var lowerLength;
		var upperLength;
		TweenLite.ticker.addEventListener("tick", function() {

			// warning: crazy cowboy math below

			// centerX, centerY is the center of the circular motion of the tube's animation, controlled by timeline tweens
			var centerX = (tube.get("scaleX") == 1) ? tube_anim.centerX : width - tube_anim.centerX + 60;
			var centerY = tube_anim.centerY;

			// update circular motion
			tube_anim.x += ((centerX +  Math.cos(tube_anim.swag_a) * tube_anim.swag_width) - tube_anim.x) * 0.5;
			tube_anim.y += ((centerY +  Math.sin(tube_anim.swag_a) * tube_anim.swag_height) - tube_anim.y) * 0.5;
			tube_anim.swag_a += Math.pow(animation.utils.map(Math.sin(tube_anim.swag_a), -1, 1, 0.05, 0.2), 0.8);

			// calculate angle between tube's base and tube_anim.xy (mid point). this is the lower body's angle.
			var a1_target = a1 + (Math.atan2(tube_anim.y - base_p.y, tube_anim.x - base_p.x) - a1) * 1;
			a1 += animation.utils.shortestArc(a1, a1_target);
			lowerLength = Math.min(animation.utils.dist(tube_anim.x, tube_anim.y, base_p.x, base_p.y), tube_height);
			mid_p.x = base_p.x + Math.cos(a1) * lowerLength;
			mid_p.y = base_p.y + Math.sin(a1) * lowerLength;

			// spring the head towards the point where the body perfectly forms a straight line
			head_target_p.x += ((base_p.x + Math.cos(a1) * tube_height) - head_target_p.x) * 0.1;
			head_target_p.y += ((base_p.y + Math.sin(a1) * tube_height) - head_target_p.y) * 0.1;
			head_p.update();

			// figure out the upper body angle (equal to lower body angle when mid point is close to the head)
			// limit the head's position to the length of the body so the tube doesn't grow taller than it should
			upperLength = (tube_height - lowerLength);
			var a2 = upperLength > 1 ? Math.atan2(head_p.y - mid_p.y, head_p.x - mid_p.x) : a1;
			head_p.x = mid_p.x + Math.cos(a2) * upperLength;
			head_p.y = mid_p.y + Math.sin(a2) * upperLength;

			// update torso divs
			tube_bottom.set({x: base_p.x - tube_width/2, bottom: height - base_p.y, rotation: animation.utils.toDegrees(a1 + Math.PI / 2), transformOrigin: "50% 100%", height: lowerLength});
			tube_top.set({x: mid_p.x - tube_width/2, y: mid_p.y - upperLength, rotation: animation.utils.toDegrees(a2 + Math.PI / 2), height: upperLength, transformOrigin: "50% 100%"});
			tube_ball.set({scale: 0.90, rotation: animation.utils.toDegrees((a1 + a2)/2 + Math.PI / 2), x: mid_p.x - tube_width / 2 + 1, y: mid_p.y - tube_width/2, backgroundPosition: "-2px " + (lowerLength - tube_height) + "px"});

			// hair
			tube_hair.set({x: head_p.x + Math.cos(a2) * 5, y: head_p.y + Math.sin(a2) * 5})
			tube_hair.to(0.2, {rotation: animation.utils.toDegrees(a2 + Math.PI/2)})
			tube_hair_inner.to(0.1, {transformOrigin: "50% 100%", rotation: Math.sin(w += 0.2) * 20, skewX: Math.cos(w) * 30})
			tube_hair_inner.gotoAndStop(Math.round(f+=0.2)%3+1)
			
			// update arms
			// figure out if arms are above or below body break point and tween its angle towards lower or upper body angle
			var arms_base = lowerLength > arm_position ? base_p : mid_p;
			var a3_target = lowerLength > arm_position ? a1 : a2;
			a3 += animation.utils.shortestArc(a3, a3_target);
			var attach_y = lowerLength > arm_position ? arm_position : arm_position - lowerLength;

			// update right arm div
			tube_arm_r_1.set({x: arms_base.x + 6 + Math.cos(a3) * attach_y, y: arms_base.y + Math.sin(a3) * attach_y});
			tube_arm_r_1.to(0.5, {rotation: animation.utils.toDegrees(a3 + Math.PI/2) + 45, transformOrigin: "6px 6px"});

			var a4 = tube_arm_r_1.get("rotation");
			var a4_rad = animation.utils.toRadians(a4);
			tube_arm_r_2.set({x: tube_arm_r_1.get("x") + Math.cos(a4_rad) * 15 - 5, y: tube_arm_r_1.get("y") + Math.sin(a4_rad) * 15 + 5});
			tube_arm_r_2.to(0.3, {rotation: a4 - 100 + Math.cos(q*2) * 100, transformOrigin: "15px 5px", ease: Power2.easeOut});

			// update left arm divs
			tube_arm_l_1.set({x: arms_base.x - 38 + Math.cos(a3) * attach_y, y: arms_base.y + Math.sin(a3) * attach_y});
			tube_arm_l_1.to(0.5, {rotation: animation.utils.toDegrees(a3 + Math.PI/2) - 27 + Math.cos(q*2) * 20, transformOrigin: "100% 30%"});

			var a4 = tube_arm_l_1.get("rotation") + 4;
			var a4_rad = animation.utils.toRadians(a4);
			tube_arm_l_2.set({x: tube_arm_l_1.get("x") - Math.cos(a4_rad) * 45, y: tube_arm_l_1.get("y") - Math.sin(a4_rad) * 45});
			tube_arm_l_2.to(0.3, {rotation: a4 + 50 + Math.cos(q += 0.1) * 50, transformOrigin: "48px 5px", ease: Power2.easeOut});

			// debug points
			//drawPoints();

		});
		var q = 0;
		var w = 0;
		var f = 0;

		function drawPoints() {
			ctx.clearRect(0, 0, width, height);
			for(var i = 0; i < points.length; ++i) {
				var p = points[i];
				ctx.beginPath();
				ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
				ctx.fill();
			}
		}

		var bg2 = animation.createElement({width: width, height: 80, top: base_p.y + 10, backgroundImage: "bg.jpg", parent: banner}); // cover tube man
		bg2.style.backgroundSize = "100%";
		bg2.style.backgroundPosition = "0 100%";
		var txt_3 = animation.createElement({backgroundImage: "txt_3.png", left: 67, top: 20, retina: true, parent: banner});
		var txt_2 = animation.createElement({backgroundImage: "txt_2.png", left: 21, top: 20, retina: true, parent: banner});
		var txt_1 = animation.createElement({backgroundImage: "txt_1.png", left: 21, top: 20, retina: true, parent: banner});
		var logo_im = animation.createElement({backgroundImage: "logo_im.png", left: 30, top: 215, retina: true, parent: banner});
		var logo_ia = animation.createElement({backgroundImage: "logo_ia.png", left: 235, top: 215, retina: true, parent: banner});
		var logo_scion = animation.createElement({backgroundImage: "logo_scion.png", left: 125, top: 205, retina: true, parent: banner});
		var car_1 = animation.createElement({left: -1, top: 127, parent: banner});
			var car_1_base = animation.createElement({backgroundImage: "car_1_base.png", top: 36, retina: true, parent: car_1});
			var car_1_top = animation.createElement({backgroundImage: "car_1_top.png", transformOrigin: "10px 60px", left: 5, retina: true, parent: car_1});
		var car_2 = animation.createElement({left: 139, top: 130, parent: banner});
			var car_2_base = animation.createElement({backgroundImage: "car_2_base.png", top: 34, retina: true, parent: car_2});
			var car_2_top = animation.createElement({backgroundImage: "car_2_top.png", transformOrigin: "140px 60px", left: 10, retina: true, parent: car_2});
		var cta = createButton(51, 55, 198, 45, "cta_txt.png");
		var cursor = animation.createElement({backgroundImage: "cursor.png", left: 227, top: 75, retina: true, parent: banner});
		banner.appendChild(canvas);

		var tl = new TimelineLite({immediateRender: true});

		tl.add("cars", 0.5);
		tl.from(car_1, 1, {x: -150, y: -10, ease: Power3.easeOut}, "cars");
		tl.from(car_2, 1, {x: 150, y: -10, ease: Power3.easeOut}, "cars+=0.2");
		tl.to(car_1_top, 1, {rotation: 2, ease: Power3.easeOut}, "cars+=0.5");
		tl.to(car_1_top, 1, {rotation: 0, ease: Power4.easeOut}, "cars+=0.8");
		tl.to(car_2_top, 1, {rotation: -2, ease: Power3.easeOut}, "cars+=0.7");
		tl.to(car_2_top, 1, {rotation: 0, ease: Power4.easeOut}, "cars+=1");

		tl.add("inflate", "-=0.5");

		tl.add("copy 1", "+=0.5");
		tl.from(txt_1, 0.4, {opacity: 0}, "copy 1");
		tl.to(txt_1, 0.3, {opacity: 0}, "copy 1+=2");

		tl.add("copy 2", "+=0.2");
		tl.from(txt_2, 0.4, {opacity: 0}, "copy 2");
		tl.to(txt_2, 0.3, {opacity: 0}, "copy 2+=3");

		tl.add("copy 3", "+=0.2");
		tl.from(txt_3, 0.4, {opacity: 0}, "copy 3");
		//tl.to(txt_3, 0.5, {opacity: 0}, "copy 3+=2.7");

		tl.add("cta", "+=1.2");
		//tl.from(cta, 0.5, {opacity: 0}, "cta");
		tl.fromTo(cursor, 1, {x: 300, y: -50}, {x: -300, y: 50}, "cta");
		tl.fromTo([cursor, cta], 0.5, {x: -300, y: 50}, {x: 0, y: 0}, "cta+=1");

		tl.add(cta.down_tl, "+=0.3")
		tl.add(cta.up_tl)

		var tube_tl = new TimelineLite()
		.from(tube, 0.5, {opacity: 0, y: 50}, 0)
		.fromTo(tube_anim, 0.5, {centerX: 120, centerY: 200}, {centerX: 160, centerY: 110, immediateRender: true}, 0)
		.to(tube_anim, 1, {centerX: 210, centerY: 110}, "+=2")
		.to(tube, 0.4, {scaleX: -1, transformOrigin: base_p.x + "px " + base_p.y + "px"}, "-=0.5")
		.to(tube_anim, 0.5, {centerX: 150, centerY: 120, swag_height: 5, ease: Power2.easeInOut}, "+=3")
		.to(tube, 0.1, {scaleX: 1, transformOrigin: base_p.x + "px " + base_p.y + "px"}, "-=0.5")
		.to(tube_anim, 1.5, {centerX: 220, centerY: 200, ease: Power2.easeIn}, "+=2.5")
		.to(tube, 1.5, {y: 200, x: 100}, "-=1.5")

		tl.add(tube_tl, "inflate");

		banner.onclick = function() {
			// clicktag logic here
			window.open(window.clickTag, "_blank");
		};
		
		banner.addEventListener("mousemove", function(e) {
			mouseX = e.clientX;
			mouseY = e.clientY;
		});

		function createButton(left, top, width, height, labelImage) {
			var button = animation.createElement({left: left, top: top, parent: banner});
			var shadow = animation.createElement({width: width, height: height, top: 4, backgroundColor: "#003369", borderRadius: "4px", parent: button});
			var base = animation.createElement({width: width, height: height, backgroundColor: "#1d4e8f", borderRadius: "4px", parent: button});
			var label = animation.createElement({backgroundImage: labelImage, retina: true, parent: base});
			label.center();

			button.up_tl = new TimelineLite().to(base, 0.1, {y: 0, opacity: 1.0});
			button.down_tl = new TimelineLite().to(base, 0.05, {y: 4, opacity: 0.8});

			return button;
		}

	}); // end preload
}