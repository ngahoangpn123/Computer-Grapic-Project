import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function createSeesaw(colors, createMaterial) {
    const group = new THREE.Group(); 
    const loader = new GLTFLoader();

    loader.load(
        './assets/seesaw.glb', 
        (gltf) => {
            console.log("✅ Đã tải thành công model Bập bênh (seesaw.glb)!");
            
            const model = gltf.scene;
            
            // Quét qua toàn bộ các chi tiết bên trong model
            model.traverse((child) => {
                if (child.isMesh) {
                    // Bật bóng đổ cho tất cả
                    child.castShadow = true;
                    child.receiveShadow = true;
                    
                    if (child.name.includes('bapbenh')) {
                        child.material = createMaterial(colors.yellow); // Thanh bập bênh màu vàng
                    } 
                    else if (child.name.includes('chan')) {
                        child.material = createMaterial(colors.wood);   // Chân đế màu gỗ
                    }
                }
            });
            
            group.add(model); 
        },
        undefined,
        (error) => {
            console.error('❌ Lỗi không tải được Seesaw:', error);
        }
    );

    return group;
}