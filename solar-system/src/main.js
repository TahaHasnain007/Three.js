import * as THREE from "three";
import "./style.css";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import {
  planetColors,
  planetSizes,
  orbitRadii,
  orbitSpeeds,
} from "./utils/measurements";
import {
  sunColorMap,
  mercuryColor,
  mercurybump,
  earthBump,
  earthCloud,
  earthSpecular,
  earthCityLight,
  earthCloudTrans,
  venusColor,
  venusBump,
  marsColor,
  marsNormal,
  marsBump,
  jupiterColor,
  saturnColor,
  uranusColor,
  earthColor,
  neptuneColor,
} from "./utils/textures";
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

const props = [
  {
    map: sunColorMap,
    emissive: new THREE.Color(0xffffff), // makes it glow
    emissiveMap: sunColorMap, // same texture drives the glow
    emissiveIntensity: 2.0, // increase for stronger glow
    metalness: 0.0, // Sun isn’t metallic
    roughness: 1.0, // surface doesn’t matter, it's glowing
  },
  { map: mercuryColor, bumpMap: mercurybump },
  { map: venusColor, bumpMap: venusBump },
  {
    map: earthColor,
    bumpMap: earthBump,
    roughnessMap: earthSpecular, // <- use specular map as roughness
    roughness: 0.4, // tweak this so it blends properly
    metalness: 0.5,
  },
  { map: marsColor, bumpMap: marsBump, normalMap: marsNormal },
  { map: jupiterColor },
  { map: saturnColor },
  { map: uranusColor },
  { map: neptuneColor },
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

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
ambientLight.castShadow = true;
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1000);
planetMeshes[0].add(pointLight);

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 50);
// scene.add(pointLightHelper);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

planetMeshes.forEach((mesh) => {
  mesh.castShadow = true;
  mesh.receiveShadow = true;
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

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
