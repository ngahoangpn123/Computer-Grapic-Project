import * as THREE from 'three';

export function createSpotlightMesh() {
    const group = new THREE.Group();

    // 1. Đế đèn (Nằm cố định trên mặt đất)
    const baseGeo = new THREE.BoxGeometry(1, 0.2, 1);
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.8 });
    const base = new THREE.Mesh(baseGeo, darkMat);
    base.position.y = 0.1;
    group.add(base);

    // 2. Đầu đèn (Group chứa trục xoay ngẩng/cúi)
    const head = new THREE.Group();
    head.position.y = 0.6; // Nằm trên đế
    group.add(head);

    // Vỏ đèn hình trụ (Xoay nằm ngang chĩa về phía trước)
    const casingGeo = new THREE.CylinderGeometry(0.5, 0.4, 1.2, 16);
    const casing = new THREE.Mesh(casingGeo, darkMat);
    casing.rotation.x = -Math.PI / 2; // Chĩa thẳng về hướng mặc định (-Z)
    head.add(casing);

    // Mặt kính phát sáng
    const glassGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.1, 16);
    const glassMat = new THREE.MeshStandardMaterial({ 
        color: 0xffffee, 
        emissive: 0xffddaa, 
        emissiveIntensity: 0
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.rotation.x = -Math.PI / 2;
    glass.position.z = -0.6; // Đẩy ra mặt trước của đèn
    head.add(glass);

    // Trả về cả group tổng và cụm head để điều khiển riêng biệt
    return { group, head, glassMat };
}