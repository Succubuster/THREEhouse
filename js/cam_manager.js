// will maintain arrays of cams, and give WORLD access to switch
// init for world cams, arbt funct for adding cams

/*farCam = new THREE.OrthographicCamera( -4000, 4000, 4000, -4000, NEAR, FAR);
farCam.position.set(5000,5000,5000);
farCam.lookAt(scene.position);
camera = farCam;
camState = 1;
scene.add(camera);

farCam2 = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR); // fix to be appropriate
farCam2.position.set(5000,5000,5000);
farCam2.lookAt(scene.position);

firstPerson = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR); // fix to be appropriate
firstPerson.position.set(5000,100,5000);
firstPerson.lookAt(scene.position);
*/

function initCamManager() {
	var cam_trainee = {};

	cam_trainee.num = 0; // may not be needed
	cam_trainee.cams = [];
	
	cam_trainee.addCam = function(para) { // gives cam and id for ref
		// para
		//  type ("p","o","c"): type of camera
		//  fields (int/float): to fill in cam
		//  name (str): name for reference
		//  pos (vec3): new position
		//  target (vec3): where to look
		//  show (bool): whether to use as viewing cam
		var temp_cam;
		switch (para.type) {
			case "p":
				temp_cam = new THREE.PerspectiveCamera( para.va,
														para.sw/para.sh,
														para.near,
														para.far);
				//console.log("made a persp");
				break;
			case "o":
				temp_cam = new THREE.OrthographicCamera(para.l,
														para.r,
														para.t,
														para.b,
														para.near,
														para.far);
				break;
			case "c":
				temp_cam = new THREE.CubeCamera(para.near,para.far,para.cr);
				// render target ???
				break;
			default: // will be persp w/ defaults or null
				temp_cam = null; // will crash if used
		}
		if (para.name) temp_cam.name = para.name;
		if (para.pos) temp_cam.position.set(para.pos.x,para.pos.y,para.pos.z);
		if (para.target) temp_cam.lookAt(para.target);
		if (para.controls) temp_cam.controls = para.controls(temp_cam);
		if (para.customControls) temp_cam.customControls = para.customControls;
		if (para.react) temp_cam.react = para.react;
		this.cams.push(temp_cam);
		if (para.show) this.switchTo(this.cams.length-1);
		return { cam: temp_cam, id: this.num++ }; // id may not be needed
	};
	cam_trainee.switchTo = function(i) {
		if (this.cams[i]) {
			this.mainCam = this.cams[i];
			this.state = i; // is needed ??
		} else {
			console.log("No View Available");
		}
	};
	return cam_trainee;

} 