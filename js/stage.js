

function initStage() { // figure out order
	var platform = {}; // not quite a stage...yet
	platform.scene = new THREE.Scene();
	platform.constants = {  screen_width:  window.innerWidth,
							screen_height:  window.innerHeight,
							view_angle: 45,
							aspect: this.screen_width / this.screen_height,
							near: 0.1, 
							far: 40000,
							global_bound: new THREE.Vector3(15000,15000,10000)
						 };

	// SIMPLE GEO'S ADDED
	platform.clock = new THREE.Clock();
	// not saving, since it does not have to move or change
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,platform.constants.global_bound.y/2,0);
	platform.scene.add(light);
	var ambientLight = new THREE.AmbientLight(0x444444);
	ambientLight.position.set(0,platform.constants.global_bound.y/2,0);
	platform.scene.add(ambientLight);
	
	// not saving -> no move needed
	var floorTexture = new THREE.ImageUtils.loadTexture('./images/checkerboard.jpg');
	//console.log(floorTexture);
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10 );
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(platform.constants.global_bound.x,
												platform.constants.global_bound.z, 1, 1);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	//floor.position.y = 100; // <-- ??
	floor.rotation.x = Math.PI / 2;
	platform.scene.add(floor);

	var skyBoxGeometry = new THREE.CubeGeometry(platform.constants.global_bound.x,
												platform.constants.global_bound.y,
												platform.constants.global_bound.z);
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
	platform.skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	platform.skyBox.position.y = platform.constants.global_bound.y/2;
	platform.scene.add(platform.skyBox); // move up
	//farFog = undefined; // idk what fog does
	//nearFog = new THREE.FogExp2(0x9999ff);



	// make various world cams with CM and set default cam
	if ( Detector.webgl ) // LINK
		platform.renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		platform.renderer = new THREE.CanvasRenderer(); 
	
	platform.renderer.setSize(platform.constants.screen_width, 
							  platform.constants.screen_height);


	// not saving, since not needed ?
	var container = document.getElementById('ThreeJS');
	if (container == undefined) { // creates the div at runtime
		container = document.createElement('div');
		document.body.appendChild(container);
	}
	container.appendChild(platform.renderer.domElement);
	
	CM.addCam({ type: "p",
				name: "Far",
				sw: platform.constants.screen_width,
				sh: platform.constants.screen_height,
				va: platform.constants.view_angle,
				near: platform.constants.near,
				far: platform.constants.far,
				pos: new THREE.Vector3( platform.constants.global_bound.x/2.5,
										platform.constants.global_bound.y,
										platform.constants.global_bound.z/2.5),
				target: new THREE.Vector3(platform.scene.position.x,
											platform.scene.position.y,
											platform.scene.position.z),
				show: true
			});
	//platform.controls = new THREE.FirstPersonControls( CM.mainCam );
	THREEx.WindowResize(platform.renderer, CM.mainCam); // move down // LINK
	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	platform.render = function() {
		//console.log(CM.mainCam.rotation);
		this.renderer.render(this.scene, CM.mainCam);
	}
	return platform;
}