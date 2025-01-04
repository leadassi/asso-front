import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import "./Livraison.css";

const messages = ["Rapide", "Sécurisé", "7/7J", "24/24h"];
const colors = ["#FF5733", "#33FF57", "#337BFF", "#337BF"];

const LivraisonScene = () => {
  const mountRef = useRef(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentColor, setCurrentColor] = useState(colors[0]);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF); // Fond blanc

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(-0.1, 0.25, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;

    // Ajouter une lumière d'environnement pour éclairer la scène
    const ambientLight = new THREE.AmbientLight(0x404040, 1); // Lumière douce
    scene.add(ambientLight);

    // Ajouter une lumière directionnelle pour éclairer uniformément
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Post-processing setup
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.2,  // Moins de bloom
      0.2,  // Moins de flou
      0.5   // Moins de luminosité
    );
    composer.addPass(bloomPass);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      composer.render();
    };

    animate();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return () => {
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setCurrentMessage(messages[i]);
      setCurrentColor(colors[i]);
      i = (i + 1) % messages.length;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="livraison-container">
      <div className="scrolling-text">
        <p style={{ color:"#D97706" }}>Bienvenue sur Votre Page Gestions de Vos Livraison</p>
      </div>
      <div className="scene" ref={mountRef}></div>
      <div className="overlay">
        <h2>Vos Livraisons :</h2>
        <h3 style={{ color: currentColor, transition: "opacity 0.5s" }}>
          {currentMessage}
        </h3>
      </div>
    </div>
  );
};

export default LivraisonScene;
