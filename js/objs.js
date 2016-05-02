// not needed for init commit
// Boundable -> plane, firstpersoncamera
function cube(para) {
	var cubeMaterialArray = [];
	// order to add materials: x+,x-,y+,y-,z+,z-
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333 } ) );
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800 } ) );
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff33 } ) );
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x33ff33 } ) );
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x3333ff } ) );
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff } ) );
	var cubeMaterials = new THREE.MeshFaceMaterial( cubeMaterialArray );
	// Cube parameters: width (x), height (y), depth (z), 
	//        (optional) segments along x, segments along y, segments along z
	var cubeGeometry = new THREE.CubeGeometry( 200, 200, 200, 1, 1, 1 );
	// using THREE.MeshFaceMaterial() in the constructor below
	//   causes the mesh to use the materials stored in the geometry
	var cube = new THREE.Mesh( cubeGeometry, cubeMaterials );
	cube.VE = new VelEngine();
	return cube;
}

function VelEngine(ms,v,a) {
	this.maxSpeed = ms || 50;
	this.vel = v || 10;
	this.accel = a || 4; // 2 or 3 ?
	this.deltaVel = function(mode,l,h) {
		switch (mode) {
			case "+":
				return (this.vel + this.accel >= h) ? h : this.vel += this.accel;
			case "-":
				return (this.vel - this.accel <= l) ? l : this.vel -= this.accel;
		} 
	}
};
//cube.prototype = new VelEngine();
var cursor = new cube();
cursor.position.y = 1000;
cursor.spacing = 150;


//cursor.position.set(-100, 1050, -50);
cursor.react = function() {
	//this.rotation.y += 0.05;
	if (WORLD.keys[0].state){
		// nothing here
		console.log("space");
		//this.rotateOnAxis(new THREE.Vector3(0,1,0), 1);
		this.rotation.y += 0.05;
	} else {
		// nothing here
	}
	if (WORLD.keys[1].state){
		if (this.VE.vel > 0) this.VE.vel = 0;
		this.translateOnAxis(new THREE.Vector3(0,0,1),this.VE.deltaVel("-",-this.VE.maxSpeed,0));
	} else {
		//this.translateOnAxis(new THREE.Vector3(0,1,0),this.deltaVel("-",0,this.maxSpeed));
	}
	if (WORLD.keys[2].state){
		if (this.VE.vel < 0) this.VE.vel = 0;
		this.translateOnAxis(new THREE.Vector3(0,0,1),this.VE.deltaVel("+",0,this.VE.maxSpeed));
		
	} else {
		//this.translateOnAxis(new THREE.Vector3(0,1,0),this.deltaVel("+",-this.maxSpeed,0));
	}
	if (WORLD.keys[3].state){
		if (this.VE.vel > 0) this.VE.vel = 0;
		this.translateOnAxis(new THREE.Vector3(1,0,0),this.VE.deltaVel("-",-this.VE.maxSpeed,0));
	} else {

	}
	if (WORLD.keys[4].state){
		if (this.VE.vel < 0) this.VE.vel = 0;
		this.translateOnAxis(new THREE.Vector3(1,0,0),this.VE.deltaVel("+",0,this.VE.maxSpeed));
	} else {

	}
	if (WORLD.keys[5].state){
		if (this.VE.vel < 0) this.VE.vel = 0;
		this.translateOnAxis(new THREE.Vector3(0,1,0),this.VE.deltaVel("+",0,this.VE.maxSpeed));
	} else {

	}
	if (WORLD.keys[6].state){
		if (this.VE.vel > 0) this.VE.vel = 0;
		this.translateOnAxis(new THREE.Vector3(0,1,0),this.VE.deltaVel("-",-this.VE.maxSpeed,0));
	} else {

	}
	this.boundMe();
}
cursor.boundMe = function () {
	if (this.position.y < STAGE.constants.global_bounds.low.ext.y + this.spacing) {
		this.position.y = STAGE.constants.global_bounds.low.ext.y + this.spacing;
	} else if (this.position.y > STAGE.constants.global_bounds.high.ext.y - this.spacing) {
		this.position.y = STAGE.constants.global_bounds.high.ext.y - this.spacing;
	}
	if (this.position.x < STAGE.constants.global_bounds.low.ext.x + this.spacing) {
		console.log("hey");
		this.position.x = STAGE.constants.global_bounds.high.ext.x - this.spacing;
	} else if (this.position.x > STAGE.constants.global_bounds.high.ext.x - this.spacing) {
		this.position.x = STAGE.constants.global_bounds.low.ext.x + this.spacing;
	}
	if (this.position.z < STAGE.constants.global_bounds.low.ext.z + this.spacing) {
		this.position.z = STAGE.constants.global_bounds.low.ext.z + this.spacing;
	} else if (this.position.z > STAGE.constants.global_bounds.high.ext.z - this.spacing) {
		this.position.z = STAGE.constants.global_bounds.high.ext.z - this.spacing;
	}
}
WORLD.addObj(cursor);
WORLD.PoI = cursor;