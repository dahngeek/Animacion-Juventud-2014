var tierraEscena = function () {

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

	
	////////tierra
		var geometry   = new THREE.SphereGeometry(3, 32, 32);
		var material  = new THREE.MeshPhongMaterial();
		var earthMesh = new THREE.Mesh(geometry, material);
		material.map = THREE.ImageUtils.loadTexture('img/tierra/earthmap1k.jpg');
		material.bumpMap    = THREE.ImageUtils.loadTexture('img/tierra/earthbump1k.jpg');
		material.bumpScale = 0.2;
		material.specularMap    = THREE.ImageUtils.loadTexture('img/tierra/earthspec1k.jpg');
		material.specular  = new THREE.Color('grey');
		t = Math.PI/180 * 2;
		earthMesh.position.set(0,0,0);
		earthMesh.castShadow = true;
		earthMesh.receiveShadow  = true;
		scene.add(earthMesh);
			/*creamos las nubes*/
			//Creamos el canvas que extrae las iamgenes para sacar transparencia
			// create destination canvas
				var canvasResult	= document.createElement('canvas')
				canvasResult.width	= 1024
				canvasResult.height	= 512
				var contextResult	= canvasResult.getContext('2d')		

				// load earthcloudmap
				var imageMap	= new Image();
				imageMap.addEventListener("load", function() {

					// create dataMap ImageData for earthcloudmap
					var canvasMap	= document.createElement('canvas')
					canvasMap.width	= imageMap.width
					canvasMap.height= imageMap.height
					var contextMap	= canvasMap.getContext('2d')
					contextMap.drawImage(imageMap, 0, 0)
					var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

					// load earthcloudmaptrans
					var imageTrans	= new Image();
					imageTrans.addEventListener("load", function(){
						// create dataTrans ImageData for earthcloudmaptrans
						var canvasTrans		= document.createElement('canvas')
						canvasTrans.width	= imageTrans.width
						canvasTrans.height	= imageTrans.height
						var contextTrans	= canvasTrans.getContext('2d')
						contextTrans.drawImage(imageTrans, 0, 0)
						var dataTrans		= contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
						// merge dataMap + dataTrans into dataResult
						var dataResult		= contextMap.createImageData(canvasMap.width, canvasMap.height)
						for(var y = 0, offset = 0; y < imageMap.height; y++){
							for(var x = 0; x < imageMap.width; x++, offset += 4){
								dataResult.data[offset+0]	= dataMap.data[offset+0]
								dataResult.data[offset+1]	= dataMap.data[offset+1]
								dataResult.data[offset+2]	= dataMap.data[offset+2]
								dataResult.data[offset+3]	= 255 - dataTrans.data[offset+0]
							}
						}
						// update texture with result
						contextResult.putImageData(dataResult,0,0)	
						material.map.needsUpdate = true;
					})
					imageTrans.src	= 'img/tierra/earthcloudmap.jpg';
				}, false);
				imageMap.src	= 'img/tierra/earthcloudmap1.jpg';


			//Creamos la esfera superior es decir las nubes
			var geometry   = new THREE.SphereGeometry(3.1, 32, 32);
			var material  = new THREE.MeshPhongMaterial({
			  map     : new THREE.Texture(canvasResult),
			  side        : THREE.DoubleSide,
			  opacity     : 0.6,
			  transparent : true,
			  depthWrite  : false,
			  castShadow  : true,
			  receiveShadow : true,
			});
			var cloudMesh = new THREE.Mesh(geometry, material);
			earthMesh.add(cloudMesh);

		
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
				
		
		earthMesh.rotation.y += 1/32 * t;		
		cloudMesh.rotation.y += 1/16 * t;
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
