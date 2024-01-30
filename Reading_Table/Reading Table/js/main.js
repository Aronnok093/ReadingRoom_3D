const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// ------------- Set renderer-------------
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene();
let angle = 0;

// // ---------------Light----------------
const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
pointLight.position.set(40, 80, 4);
pointLight.castShadow = true; // default false
pointLight.shadow.mapSize.width = 2048;
pointLight.shadow.mapSize.height = 2048;
scene.add(pointLight);

//0.6
const ambientLight = new THREE.AmbientLightProbe(0xffffff, 0.6);
ambientLight.position.set(40, 80, 4);
scene.add(ambientLight);

// ----------Axis helper--------------
// const axesHelper = new THREE.AxesHelper(30);
// scene.add(axesHelper);

//----------------Floor------------------
const tilesTexture = new THREE.TextureLoader().load("textures/new tiles.jpg");
tilesTexture.wrapS = THREE.RepeatWrapping;
tilesTexture.wrapT = THREE.RepeatWrapping;
tilesTexture.repeat.set(15, 15);
tilesTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

let floor = new THREE.PlaneGeometry(80, 80);
const floorMaterial = new THREE.MeshStandardMaterial({
  map: tilesTexture,
});
floor = new THREE.Mesh(floor, floorMaterial);
floor.rotation.x = (-90 * Math.PI) / 180;
floor.receiveShadow = true; //default
scene.add(floor);

// ---------------Table-----------------

// //----Table top----
const tableTextures = [
  "textures/tabletop.jpg",
  "textures/tabletop1.jpg",
  "textures/tabletop2.jpg",
  "textures/tabletop3.jpg",
  "textures/tabletop4.jpg",
];
let tableTextureNo = 4;
let tableTexture = new THREE.TextureLoader().load(
  tableTextures[tableTextureNo]
);
tableTexture.wrapS = THREE.RepeatWrapping;
tableTexture.wrapT = THREE.RepeatWrapping;
tableTexture.repeat.set(1, 1);
tableTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
const tableMaterial = new THREE.MeshStandardMaterial({
  map: tableTexture,
});

let tableTop = new THREE.BoxGeometry(24, 0.4, 14);
tableTop = new THREE.Mesh(tableTop, tableMaterial);
tableTop.position.set(0, 10, 0);
tableTop.castShadow = true;
scene.add(tableTop);

// // -------Table Legs--------
let tableBottomRight = new THREE.BoxGeometry(0.6, 10, 13.9);
tableBottomRight = new THREE.Mesh(tableBottomRight, tableMaterial);
tableBottomRight.position.set(11.7, -5, 0);
tableBottomRight.castShadow = true;
tableTop.add(tableBottomRight);

let tableBottomLeft = new THREE.BoxGeometry(0.6, 10, 13.98);
tableBottomLeft = new THREE.Mesh(tableBottomLeft, tableMaterial);
tableBottomLeft.position.set(-11.7, -5, 0);
tableBottomLeft.castShadow = true;
tableTop.add(tableBottomLeft);

let tableBottomLeft1 = new THREE.BoxGeometry(0.6, 10, 13.98);
tableBottomLeft1 = new THREE.Mesh(tableBottomLeft1, tableMaterial);
tableBottomLeft1.position.set(-4, -5, 0);
tableBottomLeft1.castShadow = true;
tableTop.add(tableBottomLeft1);

let tableBottomLeftBottom1 = new THREE.BoxGeometry(7.5, 0.6, 13.97);
tableBottomLeftBottom1 = new THREE.Mesh(tableBottomLeftBottom1, tableMaterial);
tableBottomLeftBottom1.position.set(-7.85, -9.7, 0);
tableBottomLeftBottom1.castShadow = true;
tableTop.add(tableBottomLeftBottom1);

let tableBottomLeftBottom2 = new THREE.BoxGeometry(7.5, 0.6, 13.97);
tableBottomLeftBottom2 = new THREE.Mesh(tableBottomLeftBottom2, tableMaterial);
tableBottomLeftBottom2.position.set(-7.85, -4.5, 0);
tableBottomLeftBottom2.castShadow = true;
tableTop.add(tableBottomLeftBottom2);

let tableBottomLeftBack = new THREE.BoxGeometry(7.5, 10, 0.6);
tableBottomLeftBack = new THREE.Mesh(tableBottomLeftBack, tableMaterial);
tableBottomLeftBack.position.set(-7.9, -5, -6.72);
tableBottomLeftBack.castShadow = true;
tableTop.add(tableBottomLeftBack);

let tableFootKeeper = new THREE.BoxGeometry(15.5, 0.25, 1.5);
tableFootKeeper = new THREE.Mesh(tableFootKeeper, tableMaterial);
tableFootKeeper.position.set(4, -8, 2); //4
tableFootKeeper.rotation.x = -6;
tableFootKeeper.castShadow = true;
tableTop.add(tableFootKeeper);



// -------------------Table book shelf------------------
let vertexShaderBookShelf =
  `varying vec2 texcoord;
   void main()
   {
       gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
       texcoord  = uv;
   }`

let fragmentShaderBookShelf =
  `varying vec2 texcoord;
   uniform sampler2D u_texture;
   void main()
   {
       gl_FragColor = texture2D(u_texture, texcoord);
   }`

let uniforms = {
  u_texture: {
    type: "t", value: tableTexture
  }
};

let bookShelfMaterial = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vertexShaderBookShelf,
  fragmentShader: fragmentShaderBookShelf
});


let bookShelfLeft = new THREE.BoxGeometry(0.59, 8, 5);
bookShelfLeft = new THREE.Mesh(bookShelfLeft, bookShelfMaterial);
bookShelfLeft.position.set(-11.69, 4, -4.48);
bookShelfLeft.castShadow = true;
tableTop.add(bookShelfLeft);


// -------- Table book shelf---------------
let bookShelfRight = new THREE.BoxGeometry(0.59, 8, 5);
bookShelfRight = new THREE.Mesh(bookShelfRight, bookShelfMaterial);
bookShelfRight.position.set(11.69, 4, -4.48);
bookShelfRight.castShadow = true;
tableTop.add(bookShelfRight);

let bookShelfTop = new THREE.BoxGeometry(24, 0.59, 5.02);
bookShelfTop = new THREE.Mesh(bookShelfTop, bookShelfMaterial);
bookShelfTop.position.set(0, 8, -4.49);
bookShelfTop.castShadow = true;
tableTop.add(bookShelfTop);

let bookShelfMiddle = new THREE.BoxGeometry(23, 0.59, 4.99);
bookShelfMiddle = new THREE.Mesh(bookShelfMiddle, bookShelfMaterial);
bookShelfMiddle.position.set(0, 4, -4.49);
bookShelfMiddle.castShadow = true;
tableTop.add(bookShelfMiddle);

let bookShelfVerticalMiddle = new THREE.BoxGeometry(0.59, 8, 5);
bookShelfVerticalMiddle = new THREE.Mesh(
  bookShelfVerticalMiddle,
  bookShelfMaterial
);
bookShelfVerticalMiddle.position.set(0, 4, -4.48);
bookShelfVerticalMiddle.castShadow = true;
tableTop.add(bookShelfVerticalMiddle);

let bookShelfBack = new THREE.BoxGeometry(24, 8, 0.4);
bookShelfBack = new THREE.Mesh(bookShelfBack, bookShelfMaterial);
bookShelfBack.position.set(0, 4, -6.79);
bookShelfBack.castShadow = true;
tableTop.add(bookShelfBack);

// ----------- Chair --------------

//Chair
const seatShape = new THREE.Shape();
seatShape.moveTo(0, 0);

seatShape.lineTo(-2, 6);
seatShape.lineTo(6, 6);
seatShape.lineTo(4, 0);

const extrudeSettings = {
  steps: 6,
  depth: 0.2,
  bevelEnabled: true,
  bevelThickness: 0.3,
  bevelSize: 0.1,
  bevelOffset: 1,
  bevelSegments: 5,
};

const geometry = new THREE.ExtrudeGeometry(seatShape, extrudeSettings);
var chairSeatTexture = new THREE.TextureLoader().load(
  "../textures/chair-top4.jpg"
);
chairSeatTexture.wrapS = THREE.RepeatWrapping;
chairSeatTexture.wrapT = THREE.RepeatWrapping;
chairSeatTexture.repeat.set(1, 1);
chairSeatTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
const chairSeatMaterial = new THREE.MeshStandardMaterial({
  map: chairSeatTexture,
});
const seatPlane = new THREE.Mesh(geometry, chairSeatMaterial);
seatPlane.position.set(5, 7, 15);
seatPlane.rotation.x = THREE.MathUtils.degToRad(90);
seatPlane.rotation.z = THREE.MathUtils.degToRad(180);
seatPlane.castShadow = true;
scene.add(seatPlane);

function createChairSupport(posX, posY, posZ, angle) {
  let chairSupportTexture = new THREE.TextureLoader().load(
    "textures/table-support1.jpg"
  );
  chairSupportTexture.wrapS = THREE.RepeatWrapping;
  chairSupportTexture.wrapT = THREE.RepeatWrapping;
  chairSupportTexture.repeat.set(1, 1);
  chairSupportTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const chairSupportMat = new THREE.MeshStandardMaterial({
    map: chairSupportTexture,
    side: THREE.DoubleSide,
  });
  var chairSupport = new THREE.CylinderGeometry(0.3, 0.3, 7, 36);
  chairSupport = new THREE.Mesh(chairSupport, chairSupportMat);
  chairSupport.position.set(posX, posY, posZ);
  chairSupport.rotation.x = THREE.MathUtils.degToRad(angle);
  chairSupport.castShadow = true;
  return chairSupport;
}

//Chair support-1
seatPlane.add(createChairSupport(4.6, 0, 3.6, -85));

//Chair support-2
seatPlane.add(createChairSupport(-0.6, 0, 3.6, -85));

//Chair support-3
seatPlane.add(createChairSupport(6, 6, 3.6, -97));

//Chair support-4
seatPlane.add(createChairSupport(-2, 6, 3.6, -97));

var chairBackSupport1 = new THREE.BoxGeometry(5.7, 0.3, 8);
var chairBackTexture = new THREE.TextureLoader().load(
  "../textures/chair-top4.jpg"
);
chairBackTexture.wrapS = THREE.RepeatWrapping;
chairBackTexture.wrapT = THREE.RepeatWrapping;
chairBackTexture.repeat.set(1, 1);
chairBackTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
const chairBackMaterial = new THREE.MeshStandardMaterial({
  map: chairBackTexture,
});
chairBackSupport1 = new THREE.Mesh(chairBackSupport1, chairBackMaterial);
chairBackSupport1.position.set(2, -0.6, -4);
chairBackSupport1.castShadow = true;
chairBackSupport1.rotation.x = THREE.MathUtils.degToRad(-5);
seatPlane.add(chairBackSupport1);


// --------------- Show piece ------------
let vertexShaderShowPiece =
  `varying vec2 globecord;
   void main()	{
     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
     globecord = uv;
   }`

let fragmantShaderShowPiece = 
`varying vec2 globecord;
 uniform sampler2D u_texture_globe;
 void main()
 {
     gl_FragColor = texture2D(u_texture_globe, globecord);
 }`
let showpiece = new THREE.DodecahedronGeometry(1.2, 10);
let earth_texture = new THREE.TextureLoader().load("textures/earth.jpg");
earth_texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
let suniforms = {
  u_texture_globe: { type: "t", value: earth_texture }
};



let showPieceMaterial = new THREE.ShaderMaterial({
  uniforms: suniforms,
  vertexShader: vertexShaderShowPiece,
  fragmentShader: fragmantShaderShowPiece
});

showpiece = new THREE.Mesh(showpiece, showPieceMaterial);
showpiece.position.set(0, 10.35, -4);
showpiece.castShadow = true
tableTop.add(showpiece);


let cone = new THREE.ConeGeometry(0.7, 1, 100);
cone = new THREE.Mesh(cone, tableMaterial);
cone.position.set(0, 8.7, -4);
cone.castShadow = true;
tableTop.add(cone);
//-----------------------
// Function to create a colored book
function createColoredBook(width, height, depth, posX, posY, posZ, rotationY, color) {
  const bookGeometry = new THREE.BoxGeometry(width, height, depth);
  const bookMaterial = new THREE.MeshStandardMaterial({ color: color });
  const book = new THREE.Mesh(bookGeometry, bookMaterial);
  book.position.set(posX, posY, posZ);
  book.rotation.y = THREE.MathUtils.degToRad(rotationY);
  book.castShadow = true;
  return book;
}

// Example colored books
const coloredBook1 = createColoredBook(1, 3.5, 2, -11, 6, -4, 0, 0x00ff00); // Green
const coloredBook2 = createColoredBook(1, 3.5, 2, -10, 6, -4, 20, 0xff0000); // Red
const coloredBook3 = createColoredBook(1, 3.5, 2, -9, 6, -4, -10, 0x0000ff); // Blue

// Add colored books to the scene
tableTop.add(coloredBook1);
tableTop.add(coloredBook2);
tableTop.add(coloredBook3);



//----------------------
// -----------------Camera----------------
let cameraRotationVar = 0.3;
let cameraPositionY = 30;
const camera = new THREE.PerspectiveCamera(
  60,
  sizes.width / sizes.height,
  1,
  100
);
camera.position.x = Math.sin(cameraRotationVar) * 27;
camera.position.y = cameraPositionY;
camera.position.z = Math.cos(cameraRotationVar) * 27;
camera.lookAt(0, 5, 0);
scene.add(camera);

//Orbit controls
// const controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.update();

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setClearColor(0x0, 1);
renderer.clear();

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  renderer.render(scene, camera);

  requestAnimationFrame(loop);
};

loop();

var clock = new THREE.Clock();

function lightMove() {
  const time = clock.getElapsedTime();

  pointLight.position.x = Math.sin(time) * 80;
  pointLight.position.y = 60;
  pointLight.position.z = Math.cos(time) * 80;

  showpiece.rotation.y += 0.01;

  requestAnimationFrame(lightMove);
}

lightMove();

function moveCamera() {
  camera.position.x = Math.sin(cameraRotationVar) * 27;
  camera.position.y = cameraPositionY;
  camera.position.z = Math.cos(cameraRotationVar) * 27;
  camera.lookAt(0, 5, 0);
  renderer.render(scene, camera);
}

document.onkeydown = checkKey;

function checkKey(e) {
  if (e.keyCode == "38") {
    // up key
    cameraPositionY += 1;
    if (cameraPositionY > 50) {
      cameraPositionY = 50;
    }
    moveCamera();
  } else if (e.keyCode == "40") {
    // down arrow
    cameraPositionY -= 1;
    if (cameraPositionY < 20) {
      cameraPositionY = 20;
    }
    moveCamera();
  } else if (e.keyCode == "37") {
    // left arrow
    cameraRotationVar += 0.03;
    moveCamera();
  } else if (e.keyCode == "39") {
    // right arrow
    cameraRotationVar -= 0.03;
    moveCamera();
  }
}

// --------------For changing table texture with mouseclick--------------
addEventListener("click", (event) => {
  tableTextureNo += 1;
  tableTextureNo = tableTextureNo % 5;

  tableTexture.dispose();
  tableTexture = new THREE.TextureLoader().load(tableTextures[tableTextureNo]);
  tableTexture.wrapS = THREE.RepeatWrapping;
  tableTexture.wrapT = THREE.RepeatWrapping;
  tableTexture.repeat.set(1, 1);
  tableTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  tableMaterial.map = tableTexture;
  uniforms["u_texture"].value = tableTexture;

});
