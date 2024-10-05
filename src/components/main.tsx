import { useEffect, useRef } from "react";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { SceneSetup } from "./scene";
import { Planet } from "./planets/planet";
import { Sun } from "./stars/sun";

const Orrery = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneSetup = new SceneSetup();
  
  const sun = new Sun();

  useEffect(() => {
    const { scene, camera, renderer } = sceneSetup;

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = true;

    scene.add(sun.getMesh());

    // Earth
    const earthElements = {
      a: 1.00000261, // Semi-major axis (AU)
      e: 0.01671123, // Eccentricity
      I: -0.00001531 * (Math.PI / 180), // Inclination (radians)
      L: 100.46457166 * (Math.PI / 180), // Mean Longitude (radians)
      longPeri: 102.93768193 * (Math.PI / 180), // Longitude of perihelion (radians)
      longNode: 0.0 * (Math.PI / 180), // Longitude of ascending node (radians)
    };

    const earth = new Planet(scene, 3, 0x0000ff, earthElements);

    // Mercury
    const mercuryElements = {
      a: 0.38709927, // Semi-major axis (AU)
      e: 0.20563593, // Eccentricity
      I: 7.00497902 * (Math.PI / 180), // Inclination (radians)
      L: 252.25032350 * (Math.PI / 180), // Mean Longitude (radians)
      longPeri: 77.45779628 * (Math.PI / 180), // Longitude of perihelion (radians)
      longNode: 48.33076593 * (Math.PI / 180), // Longitude of ascending node (radians)
    };

    const mercury = new Planet(scene, 1, 0xffa500, mercuryElements);

    camera.position.z = 10;

    const handleResize = () => {
      sceneSetup.handleResize();
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      
      const time = Date.now() * 0.000000000000001; 

      earth.update(time);
      mercury.update(time);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Orrery;
