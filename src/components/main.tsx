import { useEffect, useRef } from "react";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { SceneSetup } from "../models/scene";
import { Planet } from "../models/planet";
import { Sun } from "../models/sun";
import { planetsList } from "@/data/planets";
import { NEO } from "../models/neo";
import { NEOTypes } from "@/types/NEO";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { openPopup, openPopupAndAddOrbit } from "@/store/generalState";
import { dateToJulian } from "@/utils/conversionHelpers";
import { stat } from "fs";
import { ObjectsType } from "@/types/general";
import { keplerianElementsType } from "@/types/planet";
import { Orbit } from "@/models/orbit";
 
import * as THREE from 'three';

type Params ={
  NEAList: NEOTypes[];
  PHAList: NEOTypes[];
  CometList: NEOTypes[];
}

const Orrery = (params:Params) => {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state.generalState);
  const  { NEAList, CometList, PHAList} = params;

  const mountRef = useRef<HTMLDivElement>(null);
  const sceneSetup = new SceneSetup();
  const { scene, camera, renderer } = sceneSetup;
/*   const axesHelper = new THREE.AxesHelper(500);
  scene.add(axesHelper); */

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

    const neoManager = new NEO(scene,camera, NEAList, CometList, PHAList ,
      (kind:ObjectsType , objectData:NEOTypes , keplerianElements:keplerianElementsType) => dispatch(openPopupAndAddOrbit({target:"NEO",identifier:objectData.full_name ,neo:{kind,objectData , keplerianElements:keplerianElements}})));
    camera.far = 10000; 


    camera.position.set(0, 200, 500);  
    camera.lookAt(0, 0, 0);  
    window.addEventListener("resize", sceneSetup.handleResize);

 
    state.orbits.forEach((orbit) => {
      const orbitInstance = new Orbit(orbit.keplerianElements, orbit.orbitColor, orbit.targetObject);
    orbitInstance.drawOrbit(scene );
     
           
 
    });


    const animate = () => {
      requestAnimationFrame(animate);

      const time = dateToJulian(new Date() );

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
      window.removeEventListener("resize", sceneSetup.handleResize);
    };
  }, [state.orbits]);

 

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Orrery;
