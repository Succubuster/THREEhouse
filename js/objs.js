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
.react = function(me) { // USE BELOW
	//this.rotation.y += 0.05;
	if (WORLD.keys[0].state){
		// nothing here
		console.log("space");
		//this.rotateOnAxis(new THREE.Vector3(0,1,0), 1);
		me.rotation.y += 0.05;
	} else {
		// nothing here
	}
	if (WORLD.keys[1].state){
		if (me.VE.vel > 0) me.VE.vel = 0;
		me.translateOnAxis(new THREE.Vector3(0,0,1),this.VE.deltaVel("-",-this.VE.maxSpeed,0));
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
var.boundMe = function (me) {
	if (me.position.y < me.bounds.low.y) {
		me.position.y = me.bounds.low.y;
	} else if (me.position.y > me.bounds.high.y) {
		me.position.y = me.bounds.high.y;
	}
	if (me.position.x < me.bounds.low.x) {// x is wrapped here
		me.position.x = me.bounds.high.x;
	} else if (me.position.x > me.bounds.high.x) {
		me.position.x = me.bounds.low.x;
	}
	if (me.position.z < me.bounds.low.z) {
		me.position.z = me.bounds.low.z;
	} else if (me.position.z > me.bounds.high.z) {
		me.position.z = me.bounds.high.z;
	}
}
//WORLD.addObj(cursor); 
//WORLD.PoI = CM.mainCam.PoI = cursor; // <-- CAM_STATE 0
//CM.mainCam.target = cursor.position;
//WORLD.main = CM.mainCam;
function basicPlaneGeo(para) {
	var pln = new THREE.Object3D();

	// body
	var a = new THREE.SphereGeometry(50,64,48);
	a.applyMatrix(new THREE.Matrix4().makeScale(1.0,1.0,4.0));
	var a1 = new THREE.Mesh(a, para.material);
	a1.position.set(0, 0, 0);
	a1.name = "body";
	pln.add(a1);

	// top wing
	var b = new THREE.SphereGeometry(50,32,12);
	b.applyMatrix(new THREE.Matrix4().makeScale(4.0,0.15,1.0));
	var b1 = new THREE.Mesh(b, para.material);
	b1.position.set(0, 75, 25);
	//b1.name = "top_wing"; // optional
	pln.add(b1);

	// ballasts
	var c = new THREE.SphereGeometry(40,32,12);
	c.applyMatrix(new THREE.Matrix4().makeScale(0.5,0.55,1.25));
	var c1 = new THREE.Mesh(c, para.material);
	c1.position.set(-120, 20, 25);
	pln.add(c1.clone());
	c1.position.set(120, 20, 25);
	pln.add(c1.clone());

	// engine
	var e = new THREE.SphereGeometry(60,32,12);
	e.applyMatrix(new THREE.Matrix4().makeScale(0.45,0.5,1.0));
	var e1 = new THREE.Mesh(e, para.material);
	e1.position.set(0, 120, 25);
	pln.add(e1);

	// connector
	var f = new THREE.SphereGeometry(20,32,12);
	f.applyMatrix(new THREE.Matrix4().makeScale(0.25,1.5,0.25));
	//f.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/4));
	var f1 = new THREE.Mesh(f, para.material);

	f1.position.set(120, 50, 15);
	pln.add(f1.clone());
	f1.position.set(120, 50, 35);
	pln.add(f1.clone());
	f1.position.set(-120, 50, 15);
	pln.add(f1.clone());
	f1.position.set(-120, 50, 35);
	pln.add(f1.clone());
	f1.position.set(20, 50, 15);
	pln.add(f1.clone());
	f1.position.set(-20, 50, 15);
	pln.add(f1.clone());
	f1.position.set(0, 100, 15);
	pln.add(f1.clone());
	f1.position.set(0, 100, 55);
	pln.add(f1.clone());
	f1.position.set(20, 50, 55);
	pln.add(f1.clone());
	f1.position.set(-20, 50, 55);
	pln.add(f1.clone());

	// back wing
	var g = new THREE.SphereGeometry(50,32,12);
	g.applyMatrix(new THREE.Matrix4().makeScale(2.0,0.15,0.75));
	var g1 = new THREE.Mesh(g, para.material);
	g1.position.set(0, 50, -175);
	pln.add(g1);

	// back rudder
	var h = new THREE.SphereGeometry(40,32,12);
	h.applyMatrix(new THREE.Matrix4().makeScale(0.15,1.4,1.0));
	var h1 = new THREE.Mesh(h, para.material);
	h1.position.set(0, 40, -175);
	pln.add(h1);

	// propeller
	var f2 = f1.clone()
	f2.position.set(0, 120, 85);
	f2.name = "propeller";
	pln.add(f2);

	return pln;
}
function Plane(para) {
	// check and fill parameters
	para.color = para.color || 0xff0000;
	para.material = para.material || new THREE.MeshPhongMaterial( { color: para.color, specular: 0xdddddd});

	// make plane skeleton
	var p = new basicPlaneGeo(para);

	// latch generic attachments on (collis[self & world], particles)
		//p.update = para.update || function(d) {console.log("no upd given at" + d);};
	//p.health = para.health || 16; // FOR BULLETS
	p.collisionBox = para.collisionBox || {low: new THREE.Vector3(
											this.bounds.), h new THREE.Vector3() }; // self
	p.bounds = para.bounds || {low: new THREE.Vector3(), high: new THREE.Vector3() }; // world
	//var pEngines = []; // give funct to add & get PE
	p.engine = new ParticleEngine();
	p.engine.setValues( Examples.smoke );
	// set pos here
	p.engine.initialize(p);
	// pEngines.push(engine); // cannot push 
	//pln.add(pln.engine);
	//pln.add(engine.particleMesh);
	//pln.pEngines = pEngines;

	p.basicUpdate = function(d) {
		this.engine.update(d);

		//bounding 
		if (this.position.y < this.bounds.low.y + this.spacing) {
			this.position.y = this.bounds.low.y + this.spacing;
		} else if (this.position.y > this.bounds.high.y - this.spacing) {
			this.position.y = this.bounds.high.y - this.spacing;
		}
		if (this.position.x < this.bounds.low.x + this.spacing) {
			console.log("hey");
			this.position.x = this.bounds.high.x - this.spacing;
		} else if (this.position.x > this.bounds.high.x - this.spacing) {
			this.position.x = this.bounds.low.x + this.spacing;
		}
		if (this.position.z < this.bounds.low.z + this.spacing) {
			this.position.z = this.bounds.low.z + this.spacing;
		} else if (this.position.z > this.bounds.high.z - this.spacing) {
			this.position.z = this.bounds.high.z - this.spacing;
		}
	};

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
	
}

	// add specific attachments (update, pos, physics(U only))
	switch (para.type) {
		case "npc":
			p.speed = int(Math.random()*9)+1;

			p.update = function(d) { // to be finished later

				this.basicUpdate(d);
			};
			break;
		case "user": // add cam, 
			p.react = para.react || function() {};
			p.update = function(d) { // new name for react
				this.react();
				this.basicUpdate(d);
			}
			break;
	}
	return p;	
}