import { SUN_SCALE_FACTOR } from '@/utils/scaling';
import * as THREE from 'three';

export class Sun {
  sun: THREE.Mesh;

  constructor() {

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/textures/planets/sun.jpg");

  

    const geometry = new THREE.SphereGeometry(696340*SUN_SCALE_FACTOR, 32, 32);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    this.sun = new THREE.Mesh(geometry, material);
  }

  getMesh() {
    return this.sun;
  }
}