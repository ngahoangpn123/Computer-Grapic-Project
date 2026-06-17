import * as THREE from 'three';

export function createTree(colors, createMaterial, scale = 1) {
    const group = new THREE.Group();

    // 1. Thân cây (Trunk) và Cành
    const trunkMat = createMaterial(colors.wood);
    
    const trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 3, 7);
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 1.5;
    group.add(trunk);

    // Thêm một nhánh phụ vươn ra
    const branchGeo = new THREE.CylinderGeometry(0.15, 0.25, 1.5, 7);
    const branch = new THREE.Mesh(branchGeo, trunkMat);
    branch.position.set(-0.6, 1.8, 0);
    branch.rotation.z = Math.PI / 4;
    group.add(branch);

    // 2. Tán lá (Low-poly spheres)
    const leavesMat = createMaterial(colors.green);
    
    // Dùng IcosahedronGeometry với detail = 1 để tạo mặt đa giác như ảnh
    const leafGeo1 = new THREE.IcosahedronGeometry(1.5, 1);
    const leafGeo2 = new THREE.IcosahedronGeometry(1.2, 1);

    const createLeaf = (geo, x, y, z) => {
        const leaf = new THREE.Mesh(geo, leavesMat);
        leaf.position.set(x, y, z);
        group.add(leaf);
    };

    // Ghép 5 khối lại để tạo thành cụm lá xum xuê
    createLeaf(leafGeo1, 0, 3.5, 0);       // Khối trung tâm
    createLeaf(leafGeo2, -1, 3.0, 0.5);    // Trái
    createLeaf(leafGeo2, 1, 3.2, -0.5);    // Phải
    createLeaf(leafGeo2, 0, 2.8, -1.2);    // Sau
    createLeaf(leafGeo2, 0.5, 4.2, 0.5);   // Đỉnh


    // Tổng hợp và bật bóng đổ
    group.scale.set(scale, scale, scale);
    group.traverse(obj => { 
        if (obj.isMesh) {
            obj.castShadow = true; 
            obj.receiveShadow = true; 
        }
    });

    return group;
}