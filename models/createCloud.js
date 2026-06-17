import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function createCloud() {
    const group = new THREE.Group();
    const loader = new GLTFLoader();

    loader.load('./assets/cloud.glb', (gltf) => {
        const model = gltf.scene;
        
        // Vật liệu riêng cho mây: Trắng sáng, không bóng
        const cloudMat = new THREE.MeshStandardMaterial({ 
            color: 0xFFFFFF, 
            flatShading: true,
            roughness: 1 
        });

        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true; // Mây có thể nhận bóng của mây khác
                child.material = cloudMat;  // Gán vật liệu trắng
            }
        });

        group.add(model);
    }, undefined, (error) => {
        console.error('Lỗi tải Cloud:', error);
    });

    return group;
}