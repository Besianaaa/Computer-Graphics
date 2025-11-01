import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// === Scene ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5); // soft sky blue

// === Camera ===
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(35, 25, 35);

// === Renderer ===
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// === Controls ===
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// === Lights ===
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 1);
sunLight.position.set(30, 50, 20);
scene.add(sunLight);

// Extra: second light — PointLight (for a campus-like effect)
const pointLight = new THREE.PointLight(0xfff4cc, 0.7);
pointLight.position.set(10, 10, -10);
scene.add(pointLight);

// === Ground (green grass) ===
const groundGeo = new THREE.PlaneGeometry(100, 100);
const grassMat = new THREE.MeshLambertMaterial({ color: 0x6fbf73 });
const ground = new THREE.Mesh(groundGeo, grassMat);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// === Dense Grass with InstancedMesh ===
const bladeCount = 20000; // much denser
const bladeGeo = new THREE.PlaneGeometry(0.1, 0.8);
const bladeMat = new THREE.MeshLambertMaterial({ color: 0x6fbf73, side: THREE.DoubleSide });
const grassInstanced = new THREE.InstancedMesh(bladeGeo, bladeMat, bladeCount);

const dummy = new THREE.Object3D();

for (let i = 0; i < bladeCount; i++) {
  // Random position on ground
  dummy.position.set(
    Math.random() * 100 - 50,
    0.4, // half height of blade
    Math.random() * 100 - 50
  );

  // Random rotation
  dummy.rotation.y = Math.random() * Math.PI;
  dummy.rotation.z = (Math.random() - 0.5) * 0.3;

  // Optional: random scale for variation
  const scale = 0.8 + Math.random() * 0.4;
  dummy.scale.set(scale, scale, scale);

  dummy.updateMatrix();
  grassInstanced.setMatrixAt(i, dummy.matrix);
}

scene.add(grassInstanced);




// === Road ===
const roadGeometry = new THREE.BoxGeometry(10, 1, 100);
const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });
const road = new THREE.Mesh(roadGeometry, roadMaterial);
scene.add(road);
road.position.set(-15, 0.5, 0);

const road4 = new THREE.Mesh(roadGeometry, roadMaterial);
road4.position.set(0, 0.5, 0);
road4.rotation.y = Math.PI / 2;
scene.add(road4);

// === Buildings (Steel Blue) ===
const object1Geo = new THREE.BoxGeometry(12, 14, 18);
const object1Mat = new THREE.MeshPhongMaterial({ color: 0x4682B4 });
const object1 = new THREE.Mesh(object1Geo, object1Mat);
object1.position.set(-29, 4, -26);
scene.add(object1);

const object2Geo = new THREE.BoxGeometry(14, 23, 18);
const object2Mat = new THREE.MeshStandardMaterial({ color: 0x4682B4 });
const object2 = new THREE.Mesh(object2Geo, object2Mat);
object2.position.set(-29, 4, 20);
scene.add(object2);

const object3Geo = new THREE.BoxGeometry(29, 8, 20);
const object3Mat = new THREE.MeshLambertMaterial({ color: 0xC0C0C0 }); // silver-colored building
const object3 = new THREE.Mesh(object3Geo, object3Mat);
object3.position.set(10, 4, 25);
scene.add(object3);

const object4Geo = new THREE.BoxGeometry(29, 8, 20);
const object4Mat = new THREE.MeshStandardMaterial({ color: 0x4682B4 });
const object4 = new THREE.Mesh(object4Geo, object4Mat);
object4.position.set(10, 4, -20);
scene.add(object4);

// === Trees ===
const treeMat = new THREE.MeshLambertMaterial({ color: 0x2e7d32 });
const treeGeo = new THREE.ConeGeometry(1.5, 4, 8);
const treePositions = [
  [-5, 2, -45],
  [-25, 2, -10],
  [-4, 2, 10],
  [20, 2, 10],
  [30, 2, -15]
];
treePositions.forEach(([x, y, z]) => {
  const tree = new THREE.Mesh(treeGeo, treeMat);
  tree.position.set(x, y, z);
  scene.add(tree);
});

// === Street Lamps ===
const lampMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
const lampHeadMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffcc,
  emissive: 0xffff99,
  emissiveIntensity: 0.5
});

const lampPositions = [
  [-8, 3, -40],
  [-8, 3, -10],
  [-8, 3, 20],
  [-8, 3, -40],
  [30, 3, -10],
  [5, 3, 20]
];
lampPositions.forEach(([x, y, z]) => {
  const poleGeo = new THREE.CylinderGeometry(0.2, 0.2, 6, 8);
  const pole = new THREE.Mesh(poleGeo, lampMaterial);
  pole.position.set(x, 3.3, z);
  scene.add(pole);

  const headGeo = new THREE.SphereGeometry(0.5, 12, 12);
  const head = new THREE.Mesh(headGeo, lampHeadMaterial);
  head.position.set(x, 6.5, z);
  scene.add(head);

  const lampLight = new THREE.PointLight(0xffeeaa, 1, 15);
  lampLight.position.set(x, 6.5, z);
  scene.add(lampLight);
});

// === Animation Loop ===
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// === Responsive Resize ===
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
