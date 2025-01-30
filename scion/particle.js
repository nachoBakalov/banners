var particle = {

	x: 0,
	y: 0,
	vx: 0,
	vy: 0,
	mass: 1,
	radius: 0,
	friction: 1,
	gravity: 0,
	springs: null,
	gravitations: null,
	
	create: function(x, y, speed, heading, gravity) {
		var obj = Object.create(this);
		obj.x = x;
		obj.y = y;
		obj.vx = Math.cos(heading) * speed;
		obj.vy = Math.sin(heading) * speed;
		obj.gravity = gravity || 0;
		obj.springs = [];
		obj.gravitations = [];
		return obj;
	},

	addSpring: function(point, k, length) {
		this.removeSpring(point);
		this.springs.push({
			point: point,
			k: k,
			length: length || 0
		});
	},

	removeSpring: function(point) {
		for(var i = 0; i < this.springs.length; ++i) {
			if(point === this.springs[i].point) {
				this.springs.splice(i, 1);
				return;
			}
		}
	},

	addGravitation: function(p) {
		this.removeGravitation(p);
		this.gravitations.push(p);
	},

	removeGravitation: function(p) {
		for (var i = 0; i < this.gravitations.length; ++i) {
			if(p === this.gravitations[i]) {
				this.gravitations.splice(i, 1);
				return;
			}
		};
	},

	getSpeed: function() {
		return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
	},

	setSpeed: function(speed) {
		var heading = this.getHeading();
		this.vx = Math.cos(heading) * speed;
		this.vy = Math.sin(heading) * speed;
	},

	getHeading: function() {
		return Math.atan2(this.vy, this.vx);
	},

	setHeading: function(heading) {
		var speed = this.getSpeed();
		this.vx = Math.cos(heading) * speed;
		this.vy = Math.sin(heading) * speed;
	},

	accelerate: function(ax, ay) {
		this.vx += ax;
		this.vy += ay;
	},

	update: function() {
		this.handleSprings();
		this.handleGravitations();
		this.vx *= this.friction;
		this.vy *= this.friction;
		this.vy += this.gravity;
		this.x += this.vx;
		this.y += this.vy;
	},

	handleGravitations: function() {
		for (var i = 0; i < this.gravitations.length; ++i) {
			this.gravitateTo(this.gravitations[i]);
		};
	},

	handleSprings: function() {
		for(var i = 0; i < this.springs.length; ++i) {
			var spring = this.springs[i];
			this.springTo(spring.point, spring.k, spring.length);
		}
	},

	angleTo: function(p2) {
		return Math.atan2(p2.y - this.y, p2.x - this.y);
	},

	distanceTo: function(p2) {
		var dx = p2.x - this.x,
			dy = p2.y - this.x;

		return Math.sqrt(dx * dx + dy * dy);
	},

	gravitateTo: function(p2) {
		var dx = p2.x - this.x;
		var dy = p2.y - this.y;
		var distSQ = dx * dx + dy * dy;
		var dist = Math.sqrt(distSQ);
		var force = p2.mass / distSQ;	
		var ax = dx / dist * force;
		var ay = dy / dist * force;

		this.vx += ax;
		this.vy += ay;
	},

	springTo: function(point, k, length) {
		var dx = point.x - this.x;
		var dy = point.y - this.y;
		var dist = Math.sqrt(dx * dx + dy * dy);
		var springForce = (dist - length || 0) * k;
		this.vx += dx / dist * springForce;
		this.vy += dy / dist * springForce;
	}
}