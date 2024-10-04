import * as THREE from 'three';

export class Sun {
  sun: THREE.Mesh;

  constructor() {
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    this.sun = new THREE.Mesh(geometry, material);
  }

  getMesh() {
    return this.sun;
  }
}