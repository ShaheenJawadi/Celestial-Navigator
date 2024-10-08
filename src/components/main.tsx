import { useEffect, useRef } from "react";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { SceneSetup } from "./scene";
import { Planet } from "./planets/planet";
import { Sun } from "./stars/sun";
import { planetsList } from "@/data/planets";
import { NEO } from "./NEO/neo";
import { NEOTypes } from "@/types/NEO";

const Orrery = ({ NEOList }: { NEOList: NEOTypes[] }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneSetup = new SceneSetup();
  const { scene, camera, renderer } = sceneSetup;
  const sun = new Sun(scene);

  useEffect(() => {
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = true;

    const planets = planetsList.map(
      (planetData) => new Planet(scene, planetData)
    );

    const neoManager = new NEO(scene, NEOList);
    camera.far = 10000;
    camera.position.set(0, 100, 200);

    const handleResize = () => {
      sceneSetup.handleResize();
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.000000000000001;

      planets.forEach((planet) => planet.update(time));
      neoManager.update(time);
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
