import * as THREE from 'three';

export class Orbit {
  orbit: THREE.Mesh;
  radius: number;
  speed: number;

  constructor(radius: number, color: number, speed: number = 0.001) {
    this.radius = radius;
    this.speed = speed;

    const geometry = new THREE.RingGeometry(radius, radius + 0.1, 64);
    const material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide });
    this.orbit = new THREE.Mesh(geometry, material);
    this.orbit.rotation.x = Math.PI / 2;  
  }

  getMesh() {
    return this.orbit;
  }

  updatePosition(planet: THREE.Mesh) { 
    planet.position.x = this.radius * Math.cos(Date.now() * this.speed);
    planet.position.z = this.radius * Math.sin(Date.now() * this.speed);
  }
}
