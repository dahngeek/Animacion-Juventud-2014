var IntroModule = function () {

	FRAME.Module.call( this );

	this.parameters.input = {

		startPosition: [0, 0, 700],
		endPosition: [0, 0, 200]

	};

	var width = renderer.domElement.width;
	var height = renderer.domElement.height;

	var camera = new THREE.PerspectiveCamera( 60, width / height, 1, 20000 );

	var scene = new THREE.Scene();
	var particles = [];
	var particle;



	//Vamos a generar el monton de estrellas
	var material = new THREE.SpriteMaterial( { map: THREE.ImageUtils.loadTexture( 'archivos/texturas/nova_particle.png' ), blending: THREE.AdditiveBlending } );
			for ( var i = 0; i < 1000; i ++ ) {
			particles[ i ] = particle = new THREE.Sprite( material );
			particle.position.x = Math.random() - 0.5;
			particle.position.y = Math.random() - 0.5;
			particle.position.z = Math.random() - 0.5;
			particle.position.normalize();
			particle.position.multiplyScalar( Math.random() * 1000 + 100 );
			particle.scale.x = particle.scale.y = Math.random() * 0.5;
			scene.add( particle );

		}
	
	//
		
	var startPosition = new THREE.Vector3();
	var endPosition = new THREE.Vector3();
	var deltaPosition = new THREE.Vector3();
	
	this.start = function ( t, parameters ) {
	  
		startPosition.fromArray( parameters.startPosition );
		endPosition.fromArray( parameters.endPosition );
		deltaPosition.subVectors( endPosition, startPosition );	  
	  
	};

	this.update = function ( t ) {

		camera.position.copy( deltaPosition );
		camera.position.multiplyScalar( t );
		camera.position.add( startPosition );
		camera.lookAt( scene.position );
		console.log(camera.position);
		
		renderer.render( scene, camera );

	};

};
