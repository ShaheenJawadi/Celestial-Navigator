/* thanks to  https://stackoverflow.com/users/7733570/z-bagley */

import * as THREE from 'three';


export class PlanetRingGeomtry extends THREE.BufferGeometry {
    parameters: {
      innerRadius: number;
      outerRadius: number;
      thetaSegments: number;
      phiSegments: number;
      thetaStart: number;
      thetaLength: number;
    };
  
    constructor(
      innerRadius = 0.5,
      outerRadius = 1,
      thetaSegments = 32,
      phiSegments = 1,
      thetaStart = 0,
      thetaLength = Math.PI * 2
    ) {
      super();
  
      this.parameters = {
        innerRadius: innerRadius,
        outerRadius: outerRadius,
        thetaSegments: thetaSegments,
        phiSegments: phiSegments,
        thetaStart: thetaStart,
        thetaLength: thetaLength,
      };
  
      thetaSegments = Math.max(3, thetaSegments);
      phiSegments = Math.max(1, phiSegments);
  
      // buffers
  
      const indices = [];
      const vertices = [];
      const normals = [];
      const uvs = [];
  
      // some helper variables
  
      let radius = innerRadius;
      const radiusStep = (outerRadius - innerRadius) / phiSegments;
      const vertex = new THREE.Vector3();
      let uv = new THREE.Vector2();
  
      // generate vertices, normals and uvs
  
      for (let j = 0; j <= phiSegments; j++) {
        for (let i = 0; i <= thetaSegments; i++) {
          // values are generate from the inside of the ring to the outside
  
          const segment = thetaStart + (i / thetaSegments) * thetaLength;
  
          // vertex
  
          vertex.x = radius * Math.cos(segment);
          vertex.y = radius * Math.sin(segment);
  
          vertices.push(vertex.x, vertex.y, vertex.z);
  
          // normal
  
          normals.push(0, 0, 1);
  
          // uv
          uv = new THREE.Vector2(j / phiSegments, i / thetaSegments);
  
          uvs.push(uv.x, uv.y);
        }
  
        // increase the radius for next row of vertices
  
        radius += radiusStep;
      }
  
      // indices
  
      for (let j = 0; j < phiSegments; j++) {
        const thetaSegmentLevel = j * (thetaSegments + 1);
  
        for (let i = 0; i < thetaSegments; i++) {
          const segment = i + thetaSegmentLevel;
  
          const a = segment;
          const b = segment + thetaSegments + 1;
          const c = segment + thetaSegments + 2;
          const d = segment + 1;
  
          // faces
  
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }
  
      // build geometry
  
      this.setIndex(indices);
      this.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(vertices, 3)
      );
      this.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
      this.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    }
  }