//import * as THREE from 'three';

/*const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 19;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry(5, 5, 5);
// const material = new THREE.MeshStandardMaterial({ color: 0xfff0000 });
// const cubeMesh = new THREE.Mesh(geometry, material);
// scene.add(cubeMesh);

// cubeMesh.position.x=0.7;
// cubeMesh.position.y=-0.5
// cubeMesh.position.z=1;
// cubeMesh.position.set(0.7,-0.6,1)
// console.log("Distance of cube from camera",cubeMesh.position.distanceTo(camera.position))

const axes=new THREE.AxesHelper(9);
scene.add(axes);

// cubeMesh.scale.x=2;
// cubeMesh.scale.y=0.25;
// cubeMesh.scale.z=0.5;

// cubeMesh.rotation.x=Math.PI *0.25;
// cubeMesh.rotation.y=Math.PI *0.25;

//TRANSFROMATIONS ALL AT ONCE

// cubeMesh.position.x=0.7;
// cubeMesh.position.y=-0.6;
// cubeMesh.position.z=1;
// cubeMesh.scale.x=2;
// cubeMesh.scale.y=0.25;
// cubeMesh.scale.z=0.5;
// cubeMesh.rotation.x=Math.PI *0.25;
// cubeMesh.rotation.y=Math.PI *0.25;


const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);


// Scene graph 
const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = 0.2;
scene.add(group);


const cube1 = new THREE.Mesh(
    new THREE.ConeGeometry(0.8, 1.5, 3),
    new THREE.MeshBasicMaterial({color:0x0000ff}) 
)
cube1.position.x= -1.5;
group.add(cube1);


const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0xff0000})
)
cube2.position.x= 0;
group.add(cube2);


const cube3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 32, 32),
    new THREE.MeshBasicMaterial({color:0x00ff00}) 
)
cube3.position.x= 1.5;
group.add(cube3);




function animate() {
    requestAnimationFrame(animate);
    //cubeMesh.rotation.x += 0.01;
    //cubeMesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
*/
// Import the library
// Import the library
import * as THREE from 'three';

// ===== SCENE =====
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x20232a);

// ===== CAMERA =====
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 8);
camera.lookAt(0, 1, 0);

// ===== RENDERER =====
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// ===== FLOOR =====
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0x808080,
  roughness: 1,
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// ===== OBJECT 1: SPHERE =====
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshPhongMaterial({ 
  color: 0xff6666,
  wireframe: true
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-3, 1.1, 0);

scene.add(sphere);

// ===== OBJECT 2: CUBE =====
const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const cubeMaterial = new THREE.MeshStandardMaterial({
  color: 0x66ccff,
  metalness: 0.6,
  roughness: 0.4,
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0, 1.5, 0);

scene.add(cube);

// ===== OBJECT 3: TORUS =====
const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
const torusMaterial = new THREE.MeshLambertMaterial({ color: 0x88ff88 });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(3, 1.5, 0);

scene.add(torus);

// ===== LIGHTS =====
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// Işık sağ-üstten gelsin
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(5, 6, 5);          // ışığın konumu
directionalLight.target.position.set(0, 1, 0);   // küpün civarı
directionalLight.castShadow = true;
scene.add(directionalLight);
scene.add(directionalLight.target);

// İkinci dolgu ışığı
const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
fillLight.position.set(-5, 4, -5);
scene.add(fillLight);


const points = [
  directionalLight.position.clone(),       
  directionalLight.target.position.clone() 
];
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({ color: 0xffffff });
const line = new THREE.Line(geometry, material);
scene.add(line);

function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.y += 0.01;
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  torus.rotation.x += 0.01;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();
