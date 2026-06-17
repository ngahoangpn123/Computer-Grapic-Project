import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function createSlider() {
    const group = new THREE.Group();
    const loader = new GLTFLoader();

    loader.load('./assets/slider.glb', (gltf) => {
        const model = gltf.scene;
        
        // Dùng traverse để bật bóng đổ, không đè vật liệu
        model.traverse((child) => {
            if (child.isMesh) {
                // Bật tính năng hắt bóng và nhận bóng
                child.castShadow = true;
                child.receiveShadow = true;
                
            }
        });

        model.scale.set(1.5, 1.5, 1.5);

        group.add(model);
    }, undefined, (error) => {
        console.error('Lỗi tải Slider:', error);
    });

    return group;
}