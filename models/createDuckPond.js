import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function createDuckPond(colors, createMaterial) {
    const group = new THREE.Group(); 
    const loader = new GLTFLoader();

    loader.load('./assets/pond.glb', (gltf) => {
        const model = gltf.scene;
        
        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                
                // Bắt tên từng chi tiết trong Collection pond
                if (child.name === 'benuoc') {
                    child.material = createMaterial(colors.stone); // Bể nước màu đá xám
                } 
                else if (child.name === 'leaf') {
                    child.material = createMaterial(colors.green); // Lá màu xanh
                }
                else if (child.name === 'lotus') {
                    child.material = createMaterial(colors.pink);  // Hoa sen màu hồng
                }
                else if (child.name === 'nuoc') {
                    // Chế tạo riêng một vật liệu bóng bẩy, trong suốt cho nước
                    child.material = new THREE.MeshStandardMaterial({
                        color: colors.mint,
                        roughness: 0.1, // Càng thấp càng bóng
                        metalness: 0.2,
                        transparent: true,
                        opacity: 0.8  // Độ trong suốt 80%
                    });
                }
            }
        });
        model.scale.set(1.4, 1.4, 1.4);
        group.add(model); 
    });

    

    return group;
}