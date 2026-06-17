import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function createHorse() {
    const group = new THREE.Group();
    const loader = new GLTFLoader();

    loader.load('./assets/horse.glb', (gltf) => {
        const model = gltf.scene;
        
        model.traverse((child) => {
            if (child.isMesh) {
                // Chỉ bật bóng đổ, giữ nguyên texture và màu sắc
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        group.add(model);
    }, undefined, (error) => {
        console.error('Lỗi tải Horse:', error);
    });

    return group;
}