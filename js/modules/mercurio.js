var mercurioEscena = function () {

	FRAME.Module.call( this );

	this.parameters.input = {

		startPosition: [100, 100, 100],
		endPosition: [-100, 100, 100],
		startPositionTarget: [ 0, 0, 0 ],
		endPositionTarget: [ 0, 0, 2000 ]

	};

	var width = renderer.domElement.width;
	var height = renderer.domElement.height;

	var camera = new THREE.PerspectiveCamera( 60, width / height, 1, 1500 );
	camera.up.y = 0.5;
	camera.up.x = -1;
	camera.up.normalize();
	var cameraTarget = new THREE.Vector3();

	var scene = new THREE.Scene();

	var ambientLight= new THREE.AmbientLight( 0x020202 )
	scene.add( ambientLight)
	var frontLight	= new THREE.DirectionalLight('white', 1)
	frontLight.position.set(0.5, 0.5, 2)
	frontLight.castShadow = true;
	//frontLight.shadowCameraVisible = true;
	scene.add( frontLight )
	var backLight	= new THREE.DirectionalLight('white', 0.75)
	backLight.position.set(-0.5, -0.5, -2)
	scene.add( backLight )		

//FONDO////////////////////////////////////////////////777
	//////////////////////////////////////////////////////////
	//universo
		var geometry  = new THREE.SphereGeometry(17, 32, 32)
		// Creamos el material el universo
		var material  = new THREE.MeshBasicMaterial()
		material.map   = THREE.ImageUtils.loadTexture('img/estrellas/galaxies.jpg')
		material.side  = THREE.BackSide;
		material.opacity = 0.3;
		material.transparent = true;
		material.wrapS = material.wrapT = THREE.RepeatWrapping;
		//Crear el mesh :D
		var mesh  = new THREE.Mesh(geometry, material)
		scene.add(mesh);
	//Estrellas
		var geometryStars  = new THREE.SphereGeometry(17, 32, 32)
		// Creamos el material las estrellas
		var materialStars  = new THREE.MeshBasicMaterial()
		materialStars.map   = THREE.ImageUtils.loadTexture('img/estrellas/stars-transparent.png')
		materialStars.transparent = true
		materialStars.opacity = 0.5
		materialStars.side  = THREE.BackSide
		materialStars.wrapS = materialStars.wrapT = THREE.RepeatWrapping;
		//Crear el mesh :D
		var meshEstrellas  = new THREE.Mesh(geometryStars, materialStars)
		scene.add(meshEstrellas);

	//////////////////////////////////////////////////////////////////////////////////
	//		Planetas funciones				//
	//////////////////////////////////////////////////////////////////////////////////

	
	//Mercurio
	var geometriaMerc = new THREE.SphereGeometry(3
,32,32);
	var materialMerc = new THREE.MeshPhongMaterial();
	var meshMerc = new THREE.Mesh(geometriaMerc,materialMerc);
	materialMerc.map = THREE.ImageUtils.loadTexture('img/mercurio/mercurymap.jpg');
	materialMerc.bumpMap = THREE.ImageUtils.loadTexture('img/mercurio/mercurymap.jpg');
	materialMerc.bumpScale = 0.06;
	meshMerc.position.set(0,0,0);
	scene.add(meshMerc);


	
	//

	var startPosition = new THREE.Vector3();
	var endPosition = new THREE.Vector3();
	var deltaPosition = new THREE.Vector3();
	
	var startPositionTarget = new THREE.Vector3();
	var endPositionTarget = new THREE.Vector3();
	var deltaPositionTarget = new THREE.Vector3();

	this.start = function ( t, parameters ) {
	  
		startPosition.fromArray( parameters.startPosition );
		endPosition.fromArray( parameters.endPosition );
		deltaPosition.subVectors( endPosition, startPosition );	  

		startPositionTarget.fromArray( parameters.startPositionTarget );
		endPositionTarget.fromArray( parameters.endPositionTarget );
		deltaPositionTarget.subVectors( endPositionTarget, startPositionTarget );	  

	};

	var prevShape = 0;

	this.update = function ( t ) {
				
		

		camera.position.copy( deltaPosition );
		camera.position.multiplyScalar( t );
		camera.position.add( startPosition );

		cameraTarget.copy( deltaPositionTarget );
		cameraTarget.multiplyScalar( t );
		cameraTarget.add( startPositionTarget );

		camera.lookAt( cameraTarget );

		renderer.render( scene, camera );

	};

};
