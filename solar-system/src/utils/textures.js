import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

const sunColorMap = textureLoader.load("../static/textures/planets/sun_2.jpg");
sunColorMap.colorSpace = THREE.SRGBColorSpace;
sunColorMap.magFilter = THREE.NearestFilter;
sunColorMap.generateMipmaps = false;

const mercuryColor = textureLoader.load(
  "../static/textures/planets/mercury/mercurymap.jpg"
);
mercuryColor.colorSpace = THREE.SRGBColorSpace;
mercuryColor.minFilter = THREE.NearestFilter;
mercuryColor.generateMipmaps = false;
const mercurybump = textureLoader.load(
  "../static/textures/planets/mercury/mercurybump.jpg"
);

const earthColor = textureLoader.load(
  "../../static/textures/planets/earth/earthmap1k.jpg"
);
earthColor.colorSpace = THREE.SRGBColorSpace;
earthColor.minFilter = THREE.NearestFilter;
earthColor.generateMipmaps = false;

export { sunColorMap, mercuryColor, mercurybump };
