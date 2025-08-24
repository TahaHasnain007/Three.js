import * as THREE from "three";
import "./style.css";
import { OrbitControls, plane } from "three/examples/jsm/Addons.js";
import gsap from "gsap";

const scene = new THREE.Scene();

const canvas = document.querySelector("canvas.webgl");

const planets = [];
const planetColors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00];

const geometry = new THREE.SphereGeometry(0.4, 64, 64);

for (let i = 0; i < 4; i++) {
  const planet = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ color: planetColors[i] })
  );
  planet.material.color.set(planetColors[i]);
  planet.position.x = (i - 1.5) * 2;
  scene.add(planet);
  planets.push(planet);
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
camera.position.z = 3;
scene.add(camera);

const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});

const raycaster = new THREE.Raycaster();

window.addEventListener("click", () => {
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(planets);

  if (intersects.length > 0) {
    const clickedPlanet = intersects[0].object;

    gsap.to(clickedPlanet.rotation, {
      x: "+=" + Math.PI * 2,
      y: "+=" + Math.PI * 2,
      duration: 3,
      ease: "power2.inOut",
    });

    gsap.to(clickedPlanet.material.emissive, {
      r: 0.5,
      g: 0.5,
      b: 0.5,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
    });
  }
});

let currentHover = null;

window.addEventListener("mousemove", () => {
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(planets);

  if (intersects.length > 0) {
    const hovered = intersects[0].object;

    if (currentHover !== hovered) {
      if (currentHover) {
        gsap.to(currentHover.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
      }
      gsap.to(hovered.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.3 });
      currentHover = hovered;
    }
  } else {
    if (currentHover) {
      gsap.to(currentHover.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
    }
    currentHover = null;
  }
});

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

  window.requestAnimationFrame(tick);

  control.update();

  renderer.render(scene, camera);
};
tick();
