

function initWorld() { 
	// setup
	var space = {}; // not yet a world
	space.keys = [{key: 32, state: false} /* space */,
				  {key: 87, state: false} /* W <-> up */,
				  {key: 83, state: false} /* S <-> down */,
				  {key: 65, state: false} /* A <-> left */,
				  {key: 68, state: false} /* D <-> right */,
				  {key: 81, state: false} /* Q <-> tilt left */,
				  {key: 69, state: false} /* E <-> tilt right */];
	space.main = null;
	space.PoI = null;
	space.objs = [];
	
	//space.animating = true;

	space.update = function() {
		//console.log(WORLD.update);
		//console.log("Am I animating: " + WORLD.animating);
		if (WORLD.animating) {
	        WORLD.updateForFrame(STAGE.clock.getDelta());
	        STAGE.render();
	        requestAnimationFrame(WORLD.update); // <- may not work
		} else {
			console.log("world stopped");
		}
	};
	space.updateForFrame = function(delta) {
		//console.log(this.objs[0].update);
		//console.log(this.objs.length);
		if (STAGE.controls) STAGE.controls.update();
		for (var i = 0; i < this.objs.length; i++) {
			if (this.objs[i].update) this.objs[i].update(delta);
		}
	};
	space.addObj = function(obj) {
		if (this.objs.length == 0) {
			this.main = obj;
		}
		this.objs.push(obj);
		STAGE.scene.add(obj);
	};
	space.start = function() { 
		this.animating = true;
		this.update();
	};
	space.render = function() { // not needed???
		console.log("should be using STAGE");
	};
	space.key_down = function(event) {
		if (event.keyCode >= 49 && event.keyCode <= 57) { // 1 - 9
			var n = event.keyCode - 49;
			
			CM.switchTo(n);
			return;
		}
		var change = false;
		for (var i = 0; i < WORLD.keys.length; i++) {
			if (WORLD.keys[i].key == event.keyCode) {
				WORLD.keys[i].state = true;
				change = true;
				break;
			}
		}
		if (change) {
			event.preventDefault();  // Prevent keys from scrolling the page.
			if (WORLD.PoI) WORLD.PoI.react();
			if (WORLD.main) WORLD.main.react(); // this is in main
			console.log(WORLD.main.rotation);
			WORLD.main.lookAt(WORLD.PoI.position);
			console.log(WORLD.main.rotation);
			if (!WORLD.animating) { // (if an animation is running, no need for an extra render)
				STAGE.render();
			}
		}
	};
	space.key_up = function(event) {
		var change = false;
		for (var i = 0; i < WORLD.keys.length; i++) {
			if (WORLD.keys[i].key == event.keyCode) {
				WORLD.keys[i].state = false;
				change = true;
				break;
			}
		}
		if (change) {
			event.preventDefault();  // Prevent keys from scrolling the page.
			if (WORLD.PoI) WORLD.PoI.react();
			if (WORLD.main) WORLD.main.react(); // this is in main
			if (WORLD.main && WORLD.PoI) WORLD.main.lookAt(WORLD.PoI.position)
			if (!WORLD.animating) { // (if an animation is running, no need for an extra render)
				STAGE.render();
			}
		}
	};
	//console.log(WORLD.key_down);
	document.addEventListener("keydown", space.key_down, false);
	document.addEventListener("keyup", space.key_up, false);
	// var cubeMaterialArray = [];
	// // order to add materials: x+,x-,y+,y-,z+,z-
	// cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333 } ) );
	// cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800 } ) );
	// cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff33 } ) );
	// cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x33ff33 } ) );
	// cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x3333ff } ) );
	// cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff } ) );
	// var cubeMaterials = new THREE.MeshFaceMaterial( cubeMaterialArray );
	// // Cube parameters: width (x), height (y), depth (z), 
	// //        (optional) segments along x, segments along y, segments along z
	// var cubeGeometry = new THREE.CubeGeometry( 1000, 1000, 1000, 1, 1, 1 );
	// // using THREE.MeshFaceMaterial() in the constructor below
	// //   causes the mesh to use the materials stored in the geometry
	// var cube = new THREE.Mesh( cubeGeometry, cubeMaterials );
	// cube.position.set(-100, 1050, -50);
	// cube.update = function(d) {
	// 	this.rotation.y += 0.05;
	// };
	// space.addObj(cube);

	return space; // now filled
};