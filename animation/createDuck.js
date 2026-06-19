import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function createDucks(scene, ducksArray) {
    const loader = new GLTFLoader();
    
    loader.load('./assets/duck.glb', (gltf) => {
        for (let i = 0; i < 3; i++) {
            const duck = gltf.scene.clone(); 
            duck.scale.set(1, 1, 1); // Kích thước 
            
            scene.add(duck);       
            ducksArray.push(duck); // Đẩy vịt vào mảng để main.js tạo animation bơi
        }
    }, undefined, (error) => {
        console.error('❌ Lỗi khi tải file duck.glb:', error);
    });
}