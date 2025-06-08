import * as THREE from "three"
import { OBJLoader, OrbitControls } from "three/examples/jsm/Addons.js";


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = -1;
controls.enablePan = false;
controls.enableRotate = false;

camera.position.set(40, 12, 5);
controls.target.set(0, 0, 5);
controls.update();


let geometries = [];
const loader = new OBJLoader();
loader.load("RenderObject.obj", (obj) => {
    obj.traverse((child) => {
        if (child.isMesh) { geometries.push(child.geometry); }
    })
    if (geometries.length > 0) {
        const Geometry = geometries[0];

        const edgesGeometry = new THREE.EdgesGeometry(Geometry, 45);
        const edgeMaterial = new THREE.LineBasicMaterial( {color: 0xed7b00} );
        const edges = new THREE.LineSegments(edgesGeometry, edgeMaterial);

        const material = new THREE.MeshBasicMaterial( {color: 0x9c5000, opacity: 0.8, transparent: true} )
        const mesh = new THREE.Mesh(Geometry, material);
        scene.add(edges, mesh);
    }
});

function render() {
    renderer.render(scene, camera);
    controls.update();
}
renderer.setAnimationLoop(render);