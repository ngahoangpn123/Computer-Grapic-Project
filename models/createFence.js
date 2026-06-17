import * as THREE from 'three';

export function createFence(colors, createMaterial) {
    const group = new THREE.Group();
    
    const r = 29.5; // Bán kính vòng rào (khớp với viền đá)
    const numPosts = 60; // Số lượng cọc rào xung quanh sân

    // 1. Tạo các cọc rào dựng đứng
    const postGeo = new THREE.CylinderGeometry(0.1, 0.1, 2, 6);
    const postMat = createMaterial(colors.wood);
    
    for(let i = 0; i < numPosts; i++) {
        const currentAngle = (Math.PI * 2) * (i / numPosts);
        const post = new THREE.Mesh(postGeo, postMat);
        // Đặt cọc rào theo đường tròn
        post.position.set(r * Math.cos(currentAngle), 1, r * Math.sin(currentAngle));
        post.castShadow = true;
        group.add(post);
    }

    // 2. Tạo thanh rào ngang chạy vòng quanh
    // Sử dụng EllipseCurve vẽ 1 vòng tròn hoàn chỉnh (0 đến 2*PI)
    const curve = new THREE.EllipseCurve(0, 0, r, r, 0, Math.PI * 2, false, 0);
    const path = new THREE.Path(curve.getPoints(64));
    
    // Tham số cuối cùng 'true' giúp vòng rào khép kín, không bị hở mép
    const tubeGeo = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(path.getPoints(64).map(p => new THREE.Vector3(p.x, 1, p.y))), 
        64, 0.05, 6, true 
    );
    
    const rail = new THREE.Mesh(tubeGeo, createMaterial(colors.wood));
    rail.castShadow = true;
    group.add(rail);

    return group;
}