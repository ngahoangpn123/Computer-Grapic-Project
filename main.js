// ======================================================
// 1. IMPORTS
// ======================================================

// Three.js
import * as THREE from 'three';
import { DayNightController } from './animation/day_night.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Post Processing - Hiệu ứng hào quang (Bloom)
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// Models
import { createGround } from './models/createGround.js';
import { createTree } from './models/createTree.js';
import { createLamp } from './models/createLamp.js';
import { createFence } from './models/createFence.js';
import { createSteppingStones } from './models/createSteppingStones.js';
import { createSun } from './models/createSun.js';
import { createStars } from './models/createStars.js';
import { createSlider } from './models/createSlider.js';
import { createDuckPond } from './models/createDuckPond.js';
import { createSeesaw } from './models/createSeesaw.js';
import { createSwing } from './models/createSwing.js';
import { createChair } from './models/createChair.js';
import { createCloud } from './models/createCloud.js';
import { createHorse } from './models/createHorse.js';
import { createSpotlightMesh } from './models/createSpotlightMesh.js';
import { createStringLights } from './models/createStringLights.js';

//Animations 
import { animateSwing } from './animation/swing.js';
import { animateHorse } from './animation/horse.js';
import { animateSeesaw } from './animation/seesaw.js';
import { animateDuck } from './animation/duck.js';
import { animateLotus } from './animation/lotus.js';

// ======================================================
// 2. SCENE - CAMERA - RENDERER - CLOCK
// ======================================================

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Màu bầu trời xanh thẳm

// Camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(40, 30, 40); // Camera lùi ra xa để nhìn bao quát toàn bộ sân chơi lớn

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
/*Thiết lập không gian màu chuẩn sRGB cho texture và code*/
renderer.outputColorSpace = THREE.SRGBColorSpace; 
document.body.appendChild(renderer.domElement);

// Clock
const clock = new THREE.Clock();

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// ======================================================
// 3. POST PROCESSING (BLOOM)
// ======================================================

// RenderPass
const renderScene = new RenderPass(scene, camera);

// UnrealBloomPass
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.4,   // Cường độ tỏa sáng
    0.4,   // Bán kính tỏa sáng
    0.95   // Ngưỡng phát sáng
);
// EffectComposer
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

// ======================================================
// 4. LIGHTING 
// ======================================================

// AmbientLight
/*Bơm thêm ánh sáng trắng vào mọi góc khuất của model*/
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); 
scene.add(ambientLight);

// HemisphereLight
/*Ánh sáng vòm: Đổi màu hắt từ dưới đất lên thành trắng (0xffffff) thay vì xám đen*/
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.1);
scene.add(hemiLight);

// DirectionalLight
/*Ánh sáng mặt trời (Tạo bóng đổ)*/
const dirLight = new THREE.DirectionalLight(0xffffff, 0.9); // Tăng cường độ mặt trời lên 1.5
dirLight.position.set(-20, 40, 20);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 1024; 
dirLight.shadow.mapSize.height = 1024;
dirLight.shadow.camera.near = 0.5;
dirLight.shadow.camera.far = 100;
dirLight.shadow.camera.left = -40;
dirLight.shadow.camera.right = 40;
dirLight.shadow.camera.top = 40;
dirLight.shadow.camera.bottom = -40;
/*Làm mờ viền bóng đổ cho đỡ gắt*/
dirLight.shadow.bias = -0.001; 
scene.add(dirLight);

// Tone Mapping
/*Tùy chọn nâng cao: Bật bộ lọc điện ảnh (ToneMapping) để màu pastel không bị cháy sáng*/
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

// nightLights
const nightLights = []; // Mảng chứa đủ các loại đèn

// ======================================================
// 5. MATERIALS & COLORS
// ======================================================

// colors
const colors = {
    pink: 0xFFB39C,
    mint: 0xA6E7D2,
    yellow: 0xE8EC8B,
    green: 0x93C572,
    lightgreen: 0x9FCB98,
    wood: 0xC6A28C,
    stone: 0xDDDDDD,
    metal: 0xCCCCCC,
    duck: 0xE8EC8B,
    sand: 0xFFE4C4,
    blue: 0x87CEEB
};

// createMaterial()
const createMaterial = (color) => {
    return new THREE.MeshStandardMaterial({
        color: color,
        flatShading: true,
        metalness: 0.05,
        roughness: 0.6
    });
};

// ======================================================
// 6. ENVIRONMENT
// ======================================================

// Ground
scene.add(createGround(colors, createMaterial));
// Fence
scene.add(createFence(colors, createMaterial));

// Trees & Set up
function addTreeWithLights(x, z, scale) {
    const tree = createTree(colors, createMaterial, scale);
    tree.position.set(x, 0, z);
    scene.add(tree);

    // Tính toán chiều cao tương đối của tán cây dựa trên scale
    const canopyY = 3.5 * scale; 
    const radius = 1.5 * scale;

    // Sợi 1: Vắt chéo qua tán cây
    const p1 = new THREE.Vector3(x - radius, canopyY, z - radius);
    const p2 = new THREE.Vector3(x + radius, canopyY - 0.5, z + radius);
    const str1 = createStringLights(p1, p2);
    scene.add(str1.model);
    nightLights.push(...str1.pointLights);

    // Sợi 2: Vắt chéo hướng ngược lại
    const p3 = new THREE.Vector3(x + radius, canopyY + 0.5, z - radius);
    const p4 = new THREE.Vector3(x - radius, canopyY, z + radius);
    const str2 = createStringLights(p3, p4);
    scene.add(str2.model);
    nightLights.push(...str2.pointLights);
}

// Trồng 8 cây rải rác khắp sân, tránh xa đèn đường và các đồ chơi
addTreeWithLights(-12, 22, 2.5);  // Cây to góc trên trái
addTreeWithLights(10, 24, 2.0);   // Cây vừa góc trên phải
addTreeWithLights(25, 5, 1.8);    // Cây nhỏ rìa phải
addTreeWithLights(23, -12, 3.0);  // Cây cổ thụ rìa dưới phải
addTreeWithLights(-25, -8, 2.2); // Cây vừa rìa dưới trái
addTreeWithLights(-5, -23, 2.6);  // Cây to gần ao vịt
addTreeWithLights(-24, 10, 1.5);  // Cây nhỏ rìa trái


// ======================================================
// 7. PLAYGROUND EQUIPMENT
// ======================================================

// Slider - Blender
const slider = createSlider(); // Không truyền màu vào vì dùng texture gốc
slider.position.set(-12, 0, -14);
slider.rotation.y = - Math.PI/4;
scene.add(slider);

// DuckPond - Blender
const duckPond = createDuckPond(colors, createMaterial);
duckPond.position.set(1.5, -0.8, -36);
scene.add(duckPond);

const ducks = []; // Mảng chứa các con vịt
const lotusFlowers = []; // Mảng chứa các bông sen

// Trích xuất hoa sen từ ao nước từ DuckPond
duckPond.traverse((child) => {
    if (child.name && child.name.includes('lotus')) {
        lotusFlowers.push(child); // Đẩy vào mảng 
    }
});

// Load thêm 3 con vịt từ duck.glb
const loader = new GLTFLoader();
loader.load('./assets/duck.glb', (gltf) => {
    for (let i = 0; i < 3; i++) {
        const duck = gltf.scene.clone(); // Nhân bản thành 3 con
        duck.scale.set(1, 1, 1); // Đổi số này nếu vịt của bạn quá to hoặc quá nhỏ
        scene.add(duck);
        ducks.push(duck); // Đẩy vào mảng để bơi vòng vòng
    }
});

// Horse Rider - Blender
const horse1 = createHorse();
horse1.position.set(-8, 0, 15); // Tọa độ góc dưới bên trái
horse1.rotation.y = Math.PI / 3; // Xoay ngựa ra hướng giữa sân
scene.add(horse1);

const horse2 = createHorse();
horse2.position.set(-11, 0, 10); // Tọa độ góc dưới bên trái
horse2.rotation.y = Math.PI / 3; // Xoay ngựa ra hướng giữa sân
scene.add(horse2);

// Swing - Blender
const swing = createSwing(colors, createMaterial);
swing.position.set(10, 0, -21);
swing.rotation.y = Math.PI + 0.9 ;
scene.add(swing);

// Seesaw - Blender
const seesaw = createSeesaw(colors, createMaterial);
seesaw.position.set(18, 0, 13);
seesaw.rotation.y = Math.PI+2.5;
scene.add(seesaw);

// Chair - Blender
function addChairAt(x, z, r, color) {
    const chair = createChair(colors, createMaterial, color);
    chair.position.set(x, 0.3, z);
    chair.rotation.y = r;
    scene.add(chair);
}
addChairAt(-20, 15, Math.PI +3.8 , colors.pink); 
addChairAt(24, -4, Math.PI +0.3 , colors.mint);  
addChairAt(-25, 3, Math.PI + 3.3, colors.green); 

// Stepping Stones - code
const steppingStones = createSteppingStones(colors, createMaterial);
steppingStones.position.set(-5, 0, 5);
scene.add(steppingStones);

// ======================================================
// 8. LIGHTING SYSTEM
// ======================================================

// 8.1. Street Lamps
function addLampAt(x, z) {
    const lamp = createLamp(colors, createMaterial);
    lamp.position.set(x, 0, z);
    
    // Nguồn sáng vô hình (hắt sáng ra môi trường)
    const bulbLight = new THREE.PointLight(0xffddaa, 0, 45); 
    bulbLight.position.set(0, 10, 0); 
    bulbLight.castShadow = true;
    bulbLight.shadow.bias = -0.002;
    bulbLight.userData.nightIntensity = 150; 
    
    // Khối cầu phát sáng (bóng đèn)
    const glowGeo = new THREE.SphereGeometry(0.6, 16, 16); // 0.6 - kích thước bóng đèn
    const glowMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffddaa, // Màu phát sáng (vàng ấm)
        emissiveIntensity: 0 // Ban ngày thì tắt (không phát sáng)
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    glowMesh.position.set(0, 10, 0); // Trùng với vị trí Pointlight
    
    // Lưu material vào userData để DayNightController có thể gọi tới
    bulbLight.userData.glowMaterial = glowMat; 
    
    lamp.add(bulbLight);
    lamp.add(glowMesh); // Gắn bóng đèn vật lý vào cột đèn
    scene.add(lamp);
    
    nightLights.push(bulbLight);
}

addLampAt(26, 0); addLampAt(-26, 0); 
addLampAt(0, 26); addLampAt(0, -26); 
addLampAt(-18, 18); addLampAt(18, 18);  
addLampAt(-18, -18); addLampAt(18, -18); 

const lampPositions = [
    new THREE.Vector3(26, 10, 0),
    new THREE.Vector3(18, 10, 18),
    new THREE.Vector3(0, 10, 26),
    new THREE.Vector3(-18, 10, 18),
    new THREE.Vector3(-26, 10, 0),
    new THREE.Vector3(-18, 10, -18),
    new THREE.Vector3(0, 10, -26),
    new THREE.Vector3(18, 10, -18)
];

// 8.2. String Lights

// Vòng lặp nối dây từ đèn hiện tại tới đèn tiếp theo
for (let i = 0; i < lampPositions.length; i++) {
    const currentLamp = lampPositions[i];
    // Toán tử % giúp điểm cuối cùng nối ngược lại điểm đầu tiên (Khép kín vòng)
    const nextLamp = lampPositions[(i + 1) % lampPositions.length]; 
    
    const stringLight = createStringLights(currentLamp, nextLamp);
    scene.add(stringLight.model);
    nightLights.push(...stringLight.pointLights);
}
// 8.3. Spotlights

const degToRad = (degrees) => degrees * (Math.PI / 180);

// Hàm tạo đèn spotlights
function addSpotlight(x, y, z, panDeg, tiltDeg, color = 0xffddaa) {
    const spotData = createSpotlightMesh();
    const spotMesh = spotData.group;
    const head = spotData.head;
    
    // 8.3.1. Đặt vị trí đèn
    spotMesh.position.set(x, y, z);
    
    // Chỉnh hướng vỏ đèn vật lý
    spotMesh.rotation.y = degToRad(panDeg); // Xoay trái/phải
    head.rotation.x = degToRad(tiltDeg);    // Ngẩng/cúi (+ ngẩng lên, - cúi xuống)
    
    scene.add(spotMesh);

    // 8.3.2. Khởi tạo nguồn sáng
    // (Mở rộng góc chiếu một chút để bao quát khu vui chơi)
    const spotLight = new THREE.SpotLight(color, 0, 150, degToRad(25), 0.5, 1);
    spotLight.position.set(x, y, z); // Tâm ánh sáng đặt tại đầu đèn
    
    // 8.3.3. Đồng bộ luồng sáng vào vỏ đèn bằng Vector
    const direction = new THREE.Vector3(0, 0, -1); // Trục ngắm mặc định
    direction.applyAxisAngle(new THREE.Vector3(1, 0, 0), degToRad(tiltDeg)); 
    direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), degToRad(panDeg));
    
    // Bắn điểm mục tiêu ra xa 10 đơn vị theo đúng hướng vỏ đèn đang chĩa
    const targetObj = new THREE.Object3D();
    targetObj.position.copy(spotLight.position).add(direction.multiplyScalar(10));
    scene.add(targetObj);
    
    spotLight.target = targetObj;
    spotLight.castShadow = true;

    // Link mặt kính đèn với DayNightController
    spotLight.userData.glowMaterial = spotData.glassMat;
    spotLight.userData.nightIntensity = 250; // Độ sáng vào ban đêm

    scene.add(spotLight);
    nightLights.push(spotLight); 
}

// Add đèn spotlight với tham số: (Tọa độ X, Tọa độ Z, Góc Pan Trái/Phải, Góc Tilt Lên/Xuống, Màu)

// Đèn 1 chiếu vào Ao Vịt:
// Đứng ở (10, 9, 22), xoay sang trái 35 độ, cúi xuống 5 độ
addSpotlight(10, 9, 22, 35, -5, colors.pink);

// Đèn 2 chiếu vào Cầu Trượt:
// Đứng ở (-16, 0.3, 5), xoay sang phải 0 độ, ngẩng lên 5 độ 
addSpotlight(-16, 0.3, 5, 0, 5, colors.pink);

// ======================================================
// 9. SKY
// ======================================================

// Sun
const celestialSphere = createSun();
scene.add(celestialSphere);

// Liên kết vật liệu của Mặt trời vào đèn dirLight 
// file day_night.js có thể tìm đến và đổi thành Mặt trăng
dirLight.userData.celestialMaterial = celestialSphere.userData.celestialMaterial;

// Stars
const stars = createStars();
scene.add(stars);

// Clouds
const cloud1 = createCloud();
cloud1.position.set(5, -30, -100);
cloud1.scale.set(5, 5, 5);
scene.add(cloud1);

const cloud3 = createCloud();
cloud3.position.set(-10, -30, -150);
cloud3.scale.set(5, 5, 5);
scene.add(cloud3);

// ======================================================
// 9. DATE NIGHT CONTROLLER
// ======================================================

const dayNightController = new DayNightController(
    scene, 
    ambientLight, 
    hemiLight, 
    dirLight, 
    nightLights, 
    stars
);

// ======================================================
// 10. COORDINATE GRID
// ======================================================

// 10.1. Grid helper
// Tạo lưới (Kích thước 100x100, chia 20 ô)
const gridHelper = new THREE.GridHelper(100, 20, 0xff0000, 0x444444);
// Nhấc lưới lên mặt đất (y = 0.08) để không bị lỗi đè pixel với nền đất
gridHelper.position.y = 0.08; 
gridHelper.visible = false; // Tắt mặc định
scene.add(gridHelper);

// 10.2. Axes helper
// Tạo trục tọa độ (Độ dài trục 40)
// Đỏ = X, Xanh lá = Y, Xanh dương = Z
const axesHelper = new THREE.AxesHelper(40);
axesHelper.position.y = 0.10; // Nhấc lên cao hơn lưới 
axesHelper.visible = false; // Tắt mặc định
scene.add(axesHelper);

// 10.3. Create 3D text
function createText(text, color) {
    const canvas = document.createElement('canvas');
    canvas.width = 64; canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    ctx.font = 'bold 45px Arial'; 
    ctx.fillStyle = color;
    ctx.fillText(text, 15, 45); // Viết chữ vào giữa
    
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ 
        map: new THREE.CanvasTexture(canvas), 
        depthTest: false // Chữ không bị xuyên đè bởi vật cản
    }));
    sprite.scale.set(5, 5, 1);
    sprite.visible = false;
    return sprite;
}

// 10.4. Label X, Y, Z
const labelX = createText('X', 'red'); labelX.position.set(42, 0.1, 0); scene.add(labelX);
const labelY = createText('Y', 'green'); labelY.position.set(0, 42, 0); scene.add(labelY);
const labelZ = createText('Z', 'blue'); labelZ.position.set(0, 0.1, 42); scene.add(labelZ);

// 10.5. Toggle Grid
const toggleGridBtn = document.getElementById('toggle-grid');
let isGridVisible = false;

if (toggleGridBtn) {
    toggleGridBtn.addEventListener('click', () => {
        isGridVisible = !isGridVisible;
        
        // Bật/tắt hiển thị của lưới và trục
        gridHelper.visible = isGridVisible;
        axesHelper.visible = isGridVisible;
        // Bật/tắt hiển thị của chữ
        labelX.visible = isGridVisible;
        labelY.visible = isGridVisible;
        labelZ.visible = isGridVisible;

        // Cập nhật giao diện nút bấm
        if (isGridVisible) {
            toggleGridBtn.classList.add('is-active');
            toggleGridBtn.textContent = '🚫 Tắt Lưới Tọa Độ';
        } else {
            toggleGridBtn.classList.remove('is-active');
            toggleGridBtn.textContent = '🌐 Bật Lưới Tọa Độ';
        }
    });
}

// ======================================================
// 11. ANIMATION
// ======================================================

function animate() {
    requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime(); // Lấy thời gian chạy
    
    // Gọi các animation
    animateSwing(swing, elapsedTime);

    animateHorse(horse1, elapsedTime);
    animateHorse(horse2, elapsedTime);

    animateSeesaw(seesaw, elapsedTime);

    ducks.forEach((duck, index) => animateDuck(duck, elapsedTime, index));
    lotusFlowers.forEach(lotus => animateLotus(lotus, elapsedTime));

    // Cập nhật controls (rất quan trọng để xoay/zoom camera mượt mà)
    controls.update(); 
    
    // Hiệu ứng Sao quay chậm
    if (stars && stars.visible) {
        stars.rotation.y += 0.0003; // Quay chậm
    }
    
    // Render cảnh
    composer.render();
}

animate();

// ======================================================
// 12. EVENTS
// ======================================================

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});