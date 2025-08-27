import * as THREE from "three";
import "./style.css";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import {
  planetColors,
  planetSizes,
  orbitRadii,
  orbitSpeeds,
} from "./utils/measurements";
import { sunColorMap, mercuryColor, mercurybump } from "./utils/textures";
import gsap from "gsap";

const scene = new THREE.Scene();

const canvas = document.querySelector("canvas.webgl");
const gltfLoader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
const textureLoader = new THREE.TextureLoader();

const environmentMap = cubeTextureLoader.load([
  "../static/textures/planets/envMap/px.png",
  "../static/textures/planets/envMap/nx.png",
  "../static/textures/planets/envMap/py.png",
  "../static/textures/planets/envMap/ny.png",
  "../static/textures/planets/envMap/pz.png",
  "../static/textures/planets/envMap/nz.png",
]);

scene.environment = environmentMap;
scene.background = environmentMap;

// const sunColorMap = textureLoader.load("../static/textures/planets/sun_2.jpg");
// sunColorMap.colorSpace = THREE.SRGBColorSpace;
// sunColorMap.magFilter = THREE.NearestFilter;
// sunColorMap.generateMipmaps = false;

// const mercuryColor = textureLoader.load(
//   "../static/textures/planets/mercury/mercurymap.jpg"
// );
// mercuryColor.colorSpace = THREE.SRGBColorSpace;
// mercuryColor.minFilter = THREE.NearestFilter;
// mercuryColor.generateMipmaps = false;
// const mercurybump = textureLoader.load(
//   "../static/textures/planets/mercury/mercurybump.jpg"
// );

// const maps = [
//   new THREE.MeshStandardMaterial({
//     map: sunColorMap,
//     metalness: 0.5,
//     roughness: 0.5,
//     // emissive: "red",
//     // emissiveIntensity: 0.3,
//   }),
//   new THREE.MeshStandardMaterial({ map: mercuryColor, bumpMap: mercurybump }),
// ];
const props = [
  {
    map: sunColorMap,
    metalness: 0.5,
    roughness: 0.5,
    // emissive: "red",
    // emissiveIntensity: 0.3,
  },
  { map: mercuryColor, bumpMap: mercurybump },
];

const planets = [];
const planetMeshes = [];

for (let i = 0; i < 9; i++) {
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(planetSizes[i], 64, 64),
    new THREE.MeshStandardMaterial(props[i])
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

for (let i = 0; i < 9; i++) {
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(orbitRadii[i] - 0.02, orbitRadii[i] + 0.02, 256),
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

const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1500);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 50);
// scene.add(pointLightHelper);

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

  // raycaster.setFromCamera(mouse, camera);

  // const intersects = raycaster.intersectObjects(planetMeshes);

  // if (intersects.length > 0) {
  //   // Mouse is hovering over a planet
  //   const hoveredMesh = intersects[0].object;

  //   // If this is a new planet being hovered
  //   if (currentHovered !== hoveredMesh) {
  //     // Reset previous planet if there was one
  //     if (currentHovered) {
  //       gsap.to(currentHovered.scale, {
  //         x: 1,
  //         y: 1,
  //         z: 1,
  //         duration: 0.3,
  //         ease: "power2.out",
  //       });
  //       gsap.to(currentHovered.material.emissive, {
  //         r: 0,
  //         g: 0,
  //         b: 0,
  //         duration: 0.3,
  //       });
  //     }

  //     // Set new hovered planet
  //     currentHovered = hoveredMesh;

  //     // Apply hover effects with GSAP
  //     gsap.to(currentHovered.scale, {
  //       x: 1.2,
  //       y: 1.2,
  //       z: 1.2,
  //       duration: 0.3,
  //       ease: "back.out(1.7)",
  //     });
  //     gsap.to(currentHovered.material.emissive, {
  //       r: 0.3,
  //       g: 0.3,
  //       b: 0.3,
  //       duration: 0.3,
  //     });
  //   }
  // } else {
  //   // No planet being hovered
  //   if (currentHovered) {
  //     // Reset the previously hovered planet with GSAP
  //     gsap.to(currentHovered.scale, {
  //       x: 1,
  //       y: 1,
  //       z: 1,
  //       duration: 0.3,
  //       ease: "power2.out",
  //     });
  //     gsap.to(currentHovered.material.emissive, {
  //       r: 0,
  //       g: 0,
  //       b: 0,
  //       duration: 0.3,
  //     });
  //     currentHovered = null;
  //   }
  // }

  // planets.forEach((planetObj) => {
  //   planetObj.angle += planetObj.speed;
  //   planetObj.mesh.position.x = Math.cos(planetObj.angle) * planetObj.radius;
  //   planetObj.mesh.position.z = Math.sin(planetObj.angle) * planetObj.radius;
  // });

  window.requestAnimationFrame(tick);

  control.update();

  renderer.render(scene, camera);
};
tick();
