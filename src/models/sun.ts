 
import { IMG_FOLDER } from '@/utils/resourcePaths';
import { SUN_SCALE_FACTOR } from '@/utils/scaling';
import * as THREE from 'three';

export class Sun {
  sun: THREE.Mesh;

  constructor(scene: THREE.Scene,camera: THREE.Camera,  openPopup: () => void) {

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(IMG_FOLDER+"sun.jpg");



    const geometry = new THREE.SphereGeometry(696340 * SUN_SCALE_FACTOR, 32, 32);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    this.sun = new THREE.Mesh(geometry, material);
    this.sun.frustumCulled  = true;
    scene.add(this.sun);

    const sunLight = new THREE.PointLight(0xffffff, 100000, 0);  
    sunLight.position.set(0, 0, 0);  
    sunLight.castShadow = true;

     
    sunLight.shadow.mapSize.width = 2048;  
    sunLight.shadow.mapSize.height = 2048;

    
    sunLight.shadow.camera.near = 0.1;
    sunLight.shadow.camera.far = 5000;  

    
    sunLight.shadow.bias = -0.0001;

    scene.add(sunLight);
    this.setupInteractions(scene, camera, openPopup);


  }

  setupInteractions(scene: THREE.Scene, camera: THREE.Camera, openPopup: () => void) {
    window.addEventListener('click', (event: MouseEvent) => {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
 
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
 
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects([this.sun]);

      if (intersects.length > 0) {
        openPopup();  
      }
    });
  }

  getMesh() {
    return this.sun;
  }
}