// [ABANDONING THIS FOR NOW] -> should be finished later
// Boundable -> Movable (has react) 
function Boundable(b) {
	this.bounds = b; // structured as low -> vec3, high -> vec3
									//    -> bool3      -> bool3 
	this.checkBounds = function() {

	};
}
Boundable.prototype = {};
function Movable() {
	this.react = function() {

	};
}

Movable.prototype = new Boundable(b); // child.prototype = Object.create(parent.prototype);

var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype); // doesnt it overstep here???
};