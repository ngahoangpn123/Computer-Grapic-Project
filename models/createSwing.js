import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function createSwing() {
    const group = new THREE.Group();
    const loader = new GLTFLoader();

    loader.load('./assets/swing.glb', (gltf) => {
        const model = gltf.scene;
        
        model.traverse((child) => {
            if (child.isMesh) {
                // Giữ nguyên texture gốc từ Blender, chỉ bật tính năng bóng đổ
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

       
        model.scale.set(0.75, 0.75, 0.75); 
        
        group.add(model); 
    }, undefined, (error) => {
        console.error('Lỗi tải Swing:', error);
    });

    return group;
}