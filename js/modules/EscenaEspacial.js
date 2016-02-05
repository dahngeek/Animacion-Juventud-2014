var EscenaEspacial = function () {

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

	var ambientLight= new THREE.AmbientLight( 0xffffff )
	scene.add( ambientLight)

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

	////////sol
		var geometriaSol   = new THREE.SphereGeometry(0.9284075, 32, 32);
		var materialSol  = new THREE.MeshPhongMaterial();
		var solMesh = new THREE.Mesh(geometriaSol,materialSol);
		materialSol.map = THREE.ImageUtils.loadTexture('img/sol/preview_sun.jpg');
		solMesh.position.x = 0;
		solMesh.position.y = 0;
		scene.add(solMesh);
	
	
	////////tierra
		var geometry   = new THREE.SphereGeometry(0.00425, 32, 32);
		var material  = new THREE.MeshPhongMaterial();
		var earthMesh = new THREE.Mesh(geometry, material);
		material.map = THREE.ImageUtils.loadTexture('img/tierra/earthmap1k.jpg');
		material.bumpMap    = THREE.ImageUtils.loadTexture('img/tierra/earthbump1k.jpg');
		material.bumpScale = 0.02;
		material.specularMap    = THREE.ImageUtils.loadTexture('img/tierra/earthspec1k.jpg');
		material.specular  = new THREE.Color('grey');
		t = Math.PI/180 * 2;
		earthMesh.position.x = 0.0167+0.9994*Math.cos(t/1.000);
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
			var geometry   = new THREE.SphereGeometry(0.004259, 32, 32);
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

	//Mercurio
	var geometriaMerc = new THREE.SphereGeometry(0.003261
,32,32);
	var materialMerc = new THREE.MeshPhongMaterial();
	var meshMerc = new THREE.Mesh(geometriaMerc,materialMerc);
	materialMerc.map = THREE.ImageUtils.loadTexture('img/mercurio/mercurymap.jpg');
	materialMerc.bumpMap = THREE.ImageUtils.loadTexture('img/mercurio/mercurymap.jpg');
	materialMerc.bumpScale = 0.02;
	meshMerc.position.x = 0.0796+0.3871*Math.cos(t/0.241);
	scene.add(meshMerc);

	//Venus
	var geometriaVenus	= new THREE.SphereGeometry(0.008091, 32,32);
	var materialVenus = new THREE.MeshPhongMaterial();
	var venusMesh = new THREE.Mesh(geometriaVenus,materialVenus);
	materialVenus.map = THREE.ImageUtils.loadTexture('img/venus/venusmap.jpg');
	materialVenus.bumpMap = THREE.ImageUtils.loadTexture('img/venus/venusbump.jpg');
	materialVenus.bumpScale = 0.05;
	venusMesh.position.x = 0.0049+0.7206*Math.cos(t/0.615)
	scene.add(venusMesh);

	//Marte
	var geometriaMarte = new THREE.SphereGeometry(0.004514,32,32);
	var materialMarte = new THREE.MeshPhongMaterial();
	var marteMesh = new THREE.Mesh(geometriaMarte,materialMarte);
	materialMarte.map = THREE.ImageUtils.loadTexture('img/marte/mars_1k_color.jpg');
	materialMarte.bumpMap = THREE.ImageUtils.loadTexture('img/marte/mars_1k_topo.jpg');
	materialMarte.bumpScale = 0.09;
	marteMesh.position.x = 0.1422+1.5239*Math.cos(t/1.881);
	scene.add(marteMesh);

	// Jupiter
	var geometriaJupiter = new THREE.SphereGeometry(0.095473,32,32);
	var materialJupiter = new THREE.MeshPhongMaterial();
	var jupiterMesh = new THREE.Mesh(geometriaJupiter,materialJupiter);
	materialJupiter.map = THREE.ImageUtils.loadTexture('img/jupiter/jupitermap.jpg');
	jupiterMesh.position.x = 0.2538+5.2035*Math.cos(t/11.859);
	scene.add(jupiterMesh);

	//saturno
	var geometriaSaturno = new THREE.SphereGeometry(0.080484,32,32);
	var materialSaturno = new THREE.MeshPhongMaterial();
	var saturnoMesh = new THREE.Mesh(geometriaSaturno,materialSaturno);
	materialSaturno.map = THREE.ImageUtils.loadTexture('img/saturno/saturnmap.jpg');
	saturnoMesh.position.x = 0.5339+9.5813*Math.cos(t/29.657);
	scene.add(saturnoMesh);

	var geometriaAnillo = new THREE.RingGeometry(0.0905, 0.001385,40);
	var materialAnillo = new THREE.MeshBasicMaterial();
	var meshAnillo = new THREE.Mesh(geometriaAnillo,materialAnillo);
	materialAnillo.map = THREE.ImageUtils.loadTexture('img/saturno/saturnolargo.jpg');
	meshAnillo.rotation.x = Math.PI/2.1;
	meshAnillo.rotation.z = Math.PI/2.1;
	meshAnillo.position = saturnoMesh.position;
	scene.add(meshAnillo);

	
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
