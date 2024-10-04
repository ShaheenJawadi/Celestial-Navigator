import * as THREE from 'three';

export class Planet {
  planet: THREE.Mesh;

  constructor() {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    this.planet = new THREE.Mesh(geometry, material);
  }

  getMesh() {
    return this.planet;
  }

  updatePosition(radius: number) {
    this.planet.position.x = radius * Math.cos(Date.now() * 0.001);
    this.planet.position.z = radius * Math.sin(Date.now() * 0.001);
  }
}
