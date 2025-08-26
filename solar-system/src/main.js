import * as THREE from "three";
import "./style.css";
import { OrbitControls, plane } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

const canvas = document.querySelector("canvas.webgl");

const planetColors = [
  0xfdb813, // Sun 🌞 (yellow-orange glow)
  0x8e6e53, // Mercury (rocky brown/gray)
  0xc2b280, // Venus (pale yellow/beige)
  0x2e86c1, // Earth (blue)
  0xc1440e, // Mars (red/orange)
  0xd4af37, // Jupiter (golden brown bands)
  0xf5deb3, // Saturn (pale yellow with rings)
  0x40e0d0, // Uranus (light cyan/blue-green)
  0x1f51ff, // Neptune (deep blue)
];

const orbitRadii = [
  0, // Sun (center)
  8, // Mercury
  11, // Venus
  14, // Earth
  17, // Mars
  23, // Jupiter
  30, // Saturn
  37, // Uranus
  44, // Neptune
];

const planetSizes = [
  5, // Sun 🌞
  0.3, // Mercury
  0.6, // Venus
  0.65, // Earth
  0.4, // Mars
  1.4, // Jupiter
  1.2, // Saturn
  0.9, // Uranus
  0.85, // Neptune
];

const orbitSpeeds = [
  0, // Sun (doesn’t orbit)
  0.04, // Mercury (fastest)
  0.015, // Venus
  0.01, // Earth
  0.008, // Mars
  0.002, // Jupiter
  0.001, // Saturn
  0.0004, // Uranus
  0.0002, // Neptune (slowest)
];

const planets = [];

for (let i = 0; i < 8; i++) {
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(planetSizes[i], 64, 64),
    new THREE.MeshBasicMaterial({ color: planetColors[i] })
  );

  planet.position.x = orbitRadii[i];

  scene.add(planet);

  planets.push({
    mesh: planet,
    radius: orbitRadii[i],
    speed: orbitSpeeds[i],
    angle: 0,
  });
}

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.z = 15;
scene.add(camera);

const control = new OrbitControls(camera, canvas);
control.enableDamping = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // planets.forEach((planetObj) => {
  //   planetObj.mesh.position.x = Math.cos(planetObj.angle) * planetObj.radius;
  //   planetObj.mesh.position.z = Math.sin(planetObj.angle) * planetObj.radius;
  // });

  planets[3].mesh.position.x = Math.cos(1) * 0.2;
  planets[3].mesh.position.z = Math.sin(1) * 0.2;

  window.requestAnimationFrame(tick);

  control.update();

  renderer.render(scene, camera);
};
tick();
