var animation = animation || {};
animation.utils = {

	dist : function(x1, y1, x2, y2) {
		return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	},

	norm : function(value, min, max) {
		return (value - min) / (max - min);
	},

	lerp : function(norm, min, max) {
		return (max - min) * norm + min;
	},

	map : function(value, sourceMin, sourceMax, destMin, destMax) {
		return animation.utils.lerp(animation.utils.norm(value, sourceMin, sourceMax), destMin, destMax);
	},

	clamp : function(value, min, max) {
		return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
	},

	inRange : function(value, min, max) {
		return value >= Math.min(min, max) && value <= Math.max(min, max);
	},

	randomRange : function(min, max) {
		return min + Math.random() * (max - min);
	},

	randomInt : function(min, max) {
		return Math.floor(min + Math.random() * (max - min + 1));
	},
	
	toDegrees : function(radians) {
		return radians * 180 / Math.PI;
	},

	toRadians : function(degrees) {
		return degrees * Math.PI / 180;
	},

	sign : function (value) {
		return value > 0 ? 1 : value == 0 ? 0 : -1; 
	},

	roundToPlaces: function(value, places) {
		var mult = Math.pow(10, places);
		return Math.round(value * mult) / mult;
	},

	roundToNearest : function(value, nearest) {
		return Math.round(value / nearest) * nearest;
	}
}