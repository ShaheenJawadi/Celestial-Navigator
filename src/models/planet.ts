
import { keplerianElementsType, planetType } from '@/types/planet';
import { planetPosition } from '@/utils/keplerianElements';
import { PlanetRingGeomtry } from '@/utils/planetRing';
import { SATURN_RING_TEXTURE } from '@/utils/resourcePaths';
import {  PLANET_SIZE_SCALE_FACTOR } from '@/utils/scaling';
import * as THREE from 'three';
import { Orbit } from './orbit';
import { CelestialObject } from './celestialObject';
import { dateToJulian} from '@/utils/conversionHelpers';
export class Planet  extends CelestialObject {
  mesh: THREE.Mesh;
  currentTime: number = 0;
  keplerianElements: keplerianElementsType;
  planetData: planetType; 
  ring: THREE.Mesh | null = null;  

  constructor(scene: THREE.Scene, data: planetType, camera: THREE.Camera, openPopup: () => void) {

    super(scene, camera); 

    const { name, color, texture, radius, keplerianElements } = data;
    this.keplerianElements = keplerianElements;
    this.planetData = data; 
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

    new Orbit(keplerianElements, color, 'PLANET').drawOrbit(scene)

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
  setupInteractions(openPopup: () => void) {
    window.addEventListener('click', (event: MouseEvent) => {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, this.camera);
      const intersects = raycaster.intersectObjects([this.mesh]);
      if (intersects.length > 0) {
        this.onClickCamera(intersects[0].object);
        openPopup();
      }
    });
  }
  update(deltaTime: number) {


    const position = planetPosition( this.getPlanetParams(deltaTime));
    this.mesh.position.copy(position);

}

getPlanetParams(year: number ) {
    const T = (year - 2451545.0) / 36525;

    const { a, e, I, L, longPeri, longNode } = this.keplerianElements;
    const { a: aRate, e: eRate, I: IRate, L: LRate, longPeri: longPeriRate, longNode: longNodeRate } = this.planetData.rates;

    const newA = a + aRate * T;
    const newE = e + eRate * T;
    const newI = I + IRate * T;
    const newL = L + LRate * T;
    const newLongPeri = longPeri + longPeriRate * T;
    const newLongNode = longNode + longNodeRate * T;

    return { a: newA, e: newE, I: newI, L: newL, longPeri: newLongPeri, longNode: newLongNode };
}


}


