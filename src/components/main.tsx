import { useEffect, useRef } from "react";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { SceneSetup } from "./scene";
import { Planet } from "./planets/planet";
import { Sun } from "./stars/sun";
import { planetsList } from "@/data/planets";
import { NEO } from "./NEO/neo";
import { NEOTypes } from "@/types/NEO";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { openPopup } from "@/store/generalState";
import { julianDate } from "@/utils/keplerianElements";
 

type Params ={
  NEAList: NEOTypes[];
  PHAList: NEOTypes[];
  CometList: NEOTypes[];
}

const Orrery = (params:Params) => {
  const dispatch = useDispatch<AppDispatch>()
  const  { NEAList, CometList, PHAList} = params;

  const mountRef = useRef<HTMLDivElement>(null);
  const sceneSetup = new SceneSetup();
  const { scene, camera, renderer } = sceneSetup;


  useEffect(() => {
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }
    const sun = new Sun(scene , camera,() => dispatch(openPopup({target:"SUN",identifier:"SUN"})));
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = true;

    const planets = planetsList.map(
      (planetData) => new Planet(scene, planetData, camera,() => dispatch(openPopup({target:"PLANET",identifier:planetData.name})),)
    );

    const neoManager = new NEO(scene,camera, NEAList, CometList, PHAList ,(kind:string , objectData:NEOTypes) => dispatch(openPopup({target:"NEO",identifier:objectData.spkid ,neo:{kind,objectData}})));
    camera.far = 10000;
    camera.position.set(0, 100, 200);

    const handleResize = () => {
      sceneSetup.handleResize();
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);

      const time = julianDate(new Date() );

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
