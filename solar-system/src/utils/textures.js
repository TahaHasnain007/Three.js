import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

// Sun
const sunColorMap = textureLoader.load("../static/textures/planets/sun_2.jpg");
// sunColorMap.colorSpace = THREE.SRGBColorSpace;
// sunColorMap.magFilter = THREE.NearestFilter;
// sunColorMap.generateMipmaps = false;
sunColorMap.colorSpace = THREE.SRGBColorSpace;
sunColorMap.magFilter = THREE.LinearFilter; // smooth scaling up
sunColorMap.minFilter = THREE.LinearMipmapLinearFilter; // smooth scaling down
sunColorMap.generateMipmaps = true;

// Mercury
const mercuryColor = textureLoader.load(
  "../static/textures/planets/mercury/mercurymap.jpg"
);
mercuryColor.colorSpace = THREE.SRGBColorSpace;
mercuryColor.minFilter = THREE.NearestFilter;
mercuryColor.generateMipmaps = false;
const mercurybump = textureLoader.load(
  "../static/textures/planets/mercury/mercurybump.jpg"
);

// Venus
const venusColor = textureLoader.load(
  "../../static/textures/planets/venus/venusmap.jpg"
);
venusColor.colorSpace = THREE.SRGBColorSpace;
venusColor.minFilter = THREE.NearestFilter;
venusColor.generateMipmaps = false;
const venusBump = textureLoader.load(
  "../../static/textures/planets/venus/venusbump.jpg"
);

// Mars
const marsColor = textureLoader.load(
  "../../static/textures/planets/mars/mars_1k_color.jpg"
);
// marsColor.colorSpace = THREE.SRGBColorSpace;
// marsColor.minFilter = THREE.NearestFilter;
// marsColor.generateMipmaps = false;
marsColor.colorSpace = THREE.SRGBColorSpace;
marsColor.magFilter = THREE.LinearFilter; // smooth scaling up
marsColor.minFilter = THREE.LinearMipmapLinearFilter; // smooth scaling down
marsColor.generateMipmaps = true;

const marsNormal = textureLoader.load(
  "../../static/textures/planets/mars/mars_1k_normal.jpg"
);
const marsBump = textureLoader.load(
  "../../static/textures/planets/mars/marsbump1k.jpg"
);

// Jupiter
const jupiterColor = textureLoader.load(
  "../../static/textures/planets/jupiter/jupitermap.jpg"
);
jupiterColor.colorSpace = THREE.SRGBColorSpace;
jupiterColor.minFilter = THREE.NearestFilter;
jupiterColor.generateMipmaps = false;

// Saturn
const saturnColor = textureLoader.load(
  "../../static/textures/planets/saturn/saturnmap.jpg"
);
saturnColor.colorSpace = THREE.SRGBColorSpace;
saturnColor.minFilter = THREE.NearestFilter;
saturnColor.generateMipmaps = false;

// Uranus
const uranusColor = textureLoader.load(
  "../../static/textures/planets/uranus/uranusmap.jpg"
);
uranusColor.colorSpace = THREE.SRGBColorSpace;
uranusColor.minFilter = THREE.NearestFilter;
uranusColor.generateMipmaps = false;

// Neptune
const neptuneColor = textureLoader.load(
  "../../static/textures/planets/neptune/neptunemap.jpg"
);
neptuneColor.colorSpace = THREE.SRGBColorSpace;
neptuneColor.minFilter = THREE.NearestFilter;
neptuneColor.generateMipmaps = false;

// Earth

const earthColor = textureLoader.load(
  "../../static/textures/planets/earth/earthmap1k.jpg"
);
earthColor.colorSpace = THREE.SRGBColorSpace;
earthColor.minFilter = THREE.NearestFilter;
earthColor.generateMipmaps = false;
const earthBump = textureLoader.load(
  "../../static/textures/planets/earth/earthbump1k.jpg"
);
const earthCloud = textureLoader.load(
  "../../static/textures/planets/earth/earthcloudmap.jpg"
);
const earthSpecular = textureLoader.load(
  "../../static/textures/planets/earth/earthspec1k.jpg"
);
const earthCityLight = textureLoader.load(
  "../../static/textures/planets/earth/earthlights1k.jpg"
);
const earthCloudTrans = textureLoader.load(
  "../../static/textures/planets/earth/earthcloudmaptrans.jpg"
);

export {
  sunColorMap,
  mercuryColor,
  mercurybump,
  earthColor,
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
  neptuneColor,
};
