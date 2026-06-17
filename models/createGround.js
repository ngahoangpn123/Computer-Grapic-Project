import * as THREE from 'three';

export function createGround(colors, createMaterial) {
    const group = new THREE.Group();

    // Nền cỏ xanh ngoài cùng (y = 0)
    // Tăng PlaneGeometry lên 150 để không bị hở viền khi nhìn xa
    const grassGeo = new THREE.PlaneGeometry(150, 150, 20, 20); 
    const grass = new THREE.Mesh(grassGeo, createMaterial(colors.green));
    grass.rotation.x = -Math.PI / 2;
    grass.receiveShadow = true;
    group.add(grass);

    // Viền đá sân chơi (Bán kính 29.5)
    const stoneRingGeo = new THREE.TorusGeometry(29.5, 0.5, 6, 100);
    const stoneRing = new THREE.Mesh(stoneRingGeo, createMaterial(colors.stone));
    stoneRing.rotation.x = -Math.PI / 2;
    stoneRing.receiveShadow = true;
    group.add(stoneRing);

    const createPatch = (color, geo, x, z, yOffset) => {
        const patch = new THREE.Mesh(geo, createMaterial(color));
        patch.rotation.x = -Math.PI / 2;
        patch.position.set(x, yOffset, z);
        patch.receiveShadow = true;
        group.add(patch);
    };

    const createSimplePatch = (color, r, x, z, yOffset) => {
        createPatch(color, new THREE.CircleGeometry(r, 32), x, z, yOffset);
    };

    // Mảng chính màu vàng nhạt (y = 0.01) - Phủ kín bên trong viền đá
    createPatch(colors.yellow, new THREE.CircleGeometry(29, 64), 0, 0, 0.01);

    // Các mảng màu mint 
    // Công thức: Khoảng cách từ (x,z) đến (0,0) + bán kính <= 29
    createSimplePatch(colors.mint, 12, -10, 10, 0.02);  // Góc trái dưới
    createSimplePatch(colors.mint, 10, 12, -10, 0.03);  // Góc phải trên
    createSimplePatch(colors.mint, 8, -14, -12, 0.04);  // Góc trái trên
    createSimplePatch(colors.mint, 7, 12, 15, 0.05);    // Góc phải dưới

    // Mảng tròn trung tâm màu trắng/xám
    createSimplePatch(0xFFFFFF, 10, 0, 0, 0.06);

    return group;
}