 
import { keplerianElementsType, planetType } from '@/types/planet';
import { calculateOrbitalPosition } from '@/utils/keplerianElements';
import { PlanetRingGeomtry } from '@/utils/planetRing';
import { SATURN_RING_TEXTURE } from '@/utils/resourcePaths';
import { DISTANCE_SCALE_FACTOR, ORBIT_SEGMENTS, PLANET_SIZE_SCALE_FACTOR } from '@/utils/scaling';
import * as THREE from 'three';
import { Orbit } from './orbit';
import { gsap } from 'gsap';



export class Planet {
  mesh: THREE.Mesh;
  currentTime: number = 0;
  keplerianElements: keplerianElementsType;
  planetData: planetType; 
  private camera: THREE.Camera;
  ring: THREE.Mesh | null = null; // Added for rings

  constructor(scene: THREE.Scene, data: planetType, camera: THREE.Camera, openPopup: () => void) {
    const { name, color, texture, radius, keplerianElements } = data;
    this.keplerianElements = keplerianElements;
    this.planetData = data;
    this.camera = camera;
    const textureLoader = new THREE.TextureLoader();
    const texture3d = textureLoader.load(texture);

    const geometry = new THREE.SphereGeometry(radius * PLANET_SIZE_SCALE_FACTOR, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      map: texture3d,
      roughness: 1,
      metalness: 0,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.frustumCulled = true;

    scene.add(this.mesh);
    if (name === 'SATURN') {
      this.createRings(radius);
    }

    new Orbit(keplerianElements, color, 'PLANET' ).drawOrbit(scene)
 
    this.setupInteractions(openPopup);
  }
  createRings(radius: number) {

    const innerRadius = 1.15 * PLANET_SIZE_SCALE_FACTOR * radius;
    const outerRadius = 2.41 * PLANET_SIZE_SCALE_FACTOR * radius;
    const textureLoader = new THREE.TextureLoader();



    const geometry = new PlanetRingGeomtry(
      innerRadius,
      outerRadius,
      42,
    );
    geometry.rotateX(Math.PI / 2);
    geometry.rotateZ(THREE.MathUtils.degToRad(27));
    const texture = textureLoader.load(SATURN_RING_TEXTURE);


    const material = new THREE.MeshLambertMaterial({
      map: texture,

      side: THREE.DoubleSide,
    });

    const ring = new THREE.Mesh(geometry, material);
    ring.position.set(0, 0, 0.1 * PLANET_SIZE_SCALE_FACTOR);


    ring.frustumCulled = true;
    this.mesh.add(ring);
  }








  setupInteractions(  openPopup: () => void) {
    window.addEventListener('click', (event: MouseEvent) => {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, this.camera);

      const intersects = raycaster.intersectObjects([this.mesh]);
    let intersectedObjectPosition    = 5; 
      if (intersects.length > 0) {
        if (intersectedObjectPosition) {
          this.onClickCamera( intersects[0].object);
         // this.moveCameraTo(intersectedObjectPosition);
      }  

         /*  this.camera.position.copy(objectPosition);
          this.camera.position.z -= this.planetData.radius*PLANET_SIZE_SCALE_FACTOR+250; // Adjust this value as necessary to position the camera at a distance
          this.camera.lookAt(objectPosition); */
        openPopup();
      }
    });
  }
  update(deltaTime: number) {

 
    const position = calculateOrbitalPosition(deltaTime, this.keplerianElements);
    this.mesh.position.copy(position);
  }
 
 
 onClickCamera = (mesh: THREE.Object3D<THREE.Object3DEventMap>) => {
  const box = new THREE.Box3().setFromObject(mesh);
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();
  box.getCenter(center);  
  box.getSize(size);      

  const maxSize = Math.max(size.x, size.y, size.z);

  const distance = maxSize * 2;  


  const direction = new THREE.Vector3().subVectors(center, new THREE.Vector3(0, 0, 0)).normalize();

  const newPosition = direction.multiplyScalar(distance).add(center);

  gsap.to(this.camera.position, {
      x: newPosition.x,
      y: newPosition.y,
      z: newPosition.z,
      duration: 1,
      onUpdate: () => {
          this.camera.lookAt(center); 
      }
  });

}
}


