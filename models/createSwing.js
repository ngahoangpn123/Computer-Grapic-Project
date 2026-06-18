import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function createSwing() {
    const group = new THREE.Group();
    const loader = new GLTFLoader();

    loader.load('./assets/swing.glb', (gltf) => {
        const model = gltf.scene;
        
        // Áp dụng scale trước để tính toán Bounding Box chính xác theo kích thước thực tế hiển thị
        model.scale.set(0.75, 0.75, 0.75);
        
        // Ép Three.js cập nhật ma trận vị trí để các hàm đo đạc tọa độ chạy đúng
        model.updateMatrixWorld(true);
        
        let swingBody = null;
        let swingsheet1 = null;
        let swingsheet2 = null;
        
        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
            
            // Tìm các đối tượng theo tên
            if (child.name === 'Swingbody') {
                swingBody = child;
            } else if (child.name === 'Swingsheet1') {
                swingsheet1 = child;
            } else if (child.name === 'Swingsheet2') {
                swingsheet2 = child;
            }
        });
        
        // Khởi tạo userData để lưu các đối tượng quản lý animation
        group.userData = { swingBody };
        
        // ===== TỰ ĐỘNG CẤU HÌNH PIVOT CHO GHẾ 1 =====
        if (swingsheet1) {
            const sheet1WorldPos = new THREE.Vector3();
            swingsheet1.getWorldPosition(sheet1WorldPos);

            // Đo kích thước thực tế của ghế + dây xích
            const box1 = new THREE.Box3().setFromObject(swingsheet1);
            
            // Điểm cao nhất của box1.max.y chính là vị trí đầu dây xích nơi móc vào khung
            const topWorldPos1 = new THREE.Vector3(sheet1WorldPos.x, box1.max.y, sheet1WorldPos.z);
            
            // Chuyển tọa độ thế giới này về tọa độ local của model xích đu
            const topLocalPos1 = topWorldPos1.clone();
            model.worldToLocal(topLocalPos1);

            // Tạo Pivot đặt chính xác tại đầu dây
            const pivot1 = new THREE.Object3D();
            pivot1.position.copy(topLocalPos1);
            model.add(pivot1);

            // QUAN TRỌNG: attach giúp đưa swingsheet1 vào làm con của pivot1 
            // nhưng giữ nguyên vị trí hình học của nó, đầu dây sẽ khóa chặt vào vị trí pivot
            pivot1.attach(swingsheet1);
            
            group.userData.pivot1 = pivot1;
        }

        // ===== TỰ ĐỘNG CẤU HÌNH PIVOT CHO GHẾ 2 =====
        if (swingsheet2) {
            const sheet2WorldPos = new THREE.Vector3();
            swingsheet2.getWorldPosition(sheet2WorldPos);

            const box2 = new THREE.Box3().setFromObject(swingsheet2);
    const topWorldPos2 = new THREE.Vector3(sheet2WorldPos.x, box2.max.y, sheet2WorldPos.z);
            
            const topLocalPos2 = topWorldPos2.clone();
            model.worldToLocal(topLocalPos2);

            const pivot2 = new THREE.Object3D();
            pivot2.position.copy(topLocalPos2);
            model.add(pivot2);

            pivot2.attach(swingsheet2);
            
            group.userData.pivot2 = pivot2;
        }
        
        group.add(model);
    }, undefined, (error) => {
        console.error('Lỗi tải Swing:', error);
    });

    return group;
}