import { gsap } from 'gsap';
import * as THREE from 'three';

import { keplerianElementsType, planetType } from '@/types/planet';
import { calculateOrbitalPosition } from '@/utils/keplerianElements';
import { Orbit } from './orbit';

export class CelestialObject { 
  protected camera: THREE.Camera;
  protected scene: THREE.Scene; 

  constructor(scene: THREE.Scene, camera: THREE.Camera ) {
    this.scene = scene;
    this.camera = camera; 
  }
  onClickCamera = (mesh: THREE.Object3D<THREE.Object3DEventMap>) => {
    if (!(mesh instanceof THREE.Mesh)) {
      console.error("Provided object is not a mesh.");
      return;
    }

    const box = new THREE.Box3().setFromObject(mesh);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    const maxSize = Math.max(size.x, size.y, size.z);
    const distance = maxSize * 2;

    const direction = new THREE.Vector3().subVectors(center, new THREE.Vector3(0, 0, 0)).normalize();
    const newPosition = direction.multiplyScalar(distance).add(center);

 
    const originalMaterial = mesh.material;  
    const highlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });  

 
    mesh.material = highlightMaterial;

    gsap.to(this.camera.position, {
      x: newPosition.x,
      y: newPosition.y,
      z: newPosition.z,
      duration: 1,
      onUpdate: () => {
        this.camera.lookAt(center);
      },
      onComplete: () => { 
        mesh.material = originalMaterial;
      }
    });
  }
  
}