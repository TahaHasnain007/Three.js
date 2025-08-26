import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import gsap from "gsap";

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
  3, // Sun 🌞
  0.5, // Mercury
  0.8, // Venus
  0.85, // Earth
  0.65, // Mars
  1.4, // Jupiter
  1.2, // Saturn
  0.9, // Uranus
  0.85, // Neptune
];

const orbitSpeeds = [
  0, // Sun (doesn’t orbit)
  0.04, // Mercury (fastest)
  0.035, // Venus
  0.02, // Earth
  0.01, // Mars
  0.009, // Jupiter
  0.006, // Saturn
  0.004, // Uranus
  0.002, // Neptune (slowest)
];

const planets = [];
const planetMeshes = [];

for (let i = 0; i < 8; i++) {
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(planetSizes[i], 64, 64),
    new THREE.MeshStandardMaterial({ color: planetColors[i] })
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

for (let i = 0; i < 8; i++) {
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(orbitRadii[i] - 0.1, orbitRadii[i] + 0.1, 64),
    new THREE.MeshBasicMaterial({
      color: 0x666666, // gray color
      side: THREE.DoubleSide, // visible from both sides
      opacity: 0.3, // semi-transparent
      transparent: true,
    })
  );

  ring.rotation.x = -Math.PI / 2;
  ring.position.set(0, 0, 0);

  scene.add(ring);
}

planets.forEach((planet) => planetMeshes.push(planet.mesh));

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
camera.position.z = 30;
camera.position.y = 15;
scene.add(camera);

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let currentHovered = null;

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});

const control = new OrbitControls(camera, canvas);
control.enableDamping = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 500);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(5, 5, 5);
// scene.add(directionalLight);

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

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(planetMeshes);

  if (intersects.length > 0) {
    // Mouse is hovering over a planet
    const hoveredMesh = intersects[0].object;

    // If this is a new planet being hovered
    if (currentHovered !== hoveredMesh) {
      // Reset previous planet if there was one
      if (currentHovered) {
        gsap.to(currentHovered.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(currentHovered.material.emissive, {
          r: 0,
          g: 0,
          b: 0,
          duration: 0.3,
        });
      }

      // Set new hovered planet
      currentHovered = hoveredMesh;

      // Apply hover effects with GSAP
      gsap.to(currentHovered.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
      gsap.to(currentHovered.material.emissive, {
        r: 0.3,
        g: 0.3,
        b: 0.3,
        duration: 0.3,
      });
    }
  } else {
    // No planet being hovered
    if (currentHovered) {
      // Reset the previously hovered planet with GSAP
      gsap.to(currentHovered.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(currentHovered.material.emissive, {
        r: 0,
        g: 0,
        b: 0,
        duration: 0.3,
      });
      currentHovered = null;
    }
  }

  planets.forEach((planetObj) => {
    planetObj.angle += planetObj.speed;
    planetObj.mesh.position.x = Math.cos(planetObj.angle) * planetObj.radius;
    planetObj.mesh.position.z = Math.sin(planetObj.angle) * planetObj.radius;
  });

  window.requestAnimationFrame(tick);

  control.update();

  renderer.render(scene, camera);
};
tick();
