import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function createChair(colors, createMaterial, customColor) {
    const group = new THREE.Group();
    const loader = new GLTFLoader();

    loader.load('./assets/chair.glb', (gltf) => {
        const model = gltf.scene;
        
        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                
                // Phủ màu pastel được truyền từ main.js lên toàn bộ ghế
                child.material = createMaterial(customColor); 
            }
        });

        group.add(model);
    }, undefined, (error) => {
        console.error('Lỗi tải Chair:', error);
    });

    return group;
}