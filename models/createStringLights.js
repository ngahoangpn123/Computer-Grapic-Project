import * as THREE from 'three';

export function createStringLights(startPoint, endPoint) {
    const group = new THREE.Group();
    const bulbCount = 12; // Giảm số bóng xuống để không bị rối
    
    const points = [];
    // Tăng độ chùng của dây lên 3 để dây võng tự nhiên hơn
    const sag = 3; 

    for (let i = 0; i <= bulbCount; i++) {
        const t = i / bulbCount;
        const x = THREE.MathUtils.lerp(startPoint.x, endPoint.x, t);
        const z = THREE.MathUtils.lerp(startPoint.z, endPoint.z, t);
        const y = THREE.MathUtils.lerp(startPoint.y, endPoint.y, t) - Math.sin(t * Math.PI) * sag; 
        points.push(new THREE.Vector3(x, y, z));
    }
    
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x333333 });
    const line = new THREE.Line(lineGeo, lineMat);
    group.add(line);

    const bulbGeo = new THREE.SphereGeometry(0.25, 16, 16);
    const bulbColors = [0xffddaa, 0xffb39c, 0xa6e7d2]; 

    const lightsToExport = []; 
    const allBulbMats = []; // Mảng chứa toàn bộ vật liệu bóng đèn

    points.forEach((point, index) => {
        if (index === 0 || index === bulbCount) return; 
        
        const color = bulbColors[index % bulbColors.length];
        const bulbMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: color,
            emissiveIntensity: 0 // Đặt 0 để tắt ban ngày
        });
        
        allBulbMats.push(bulbMat); // Lưu lại vật liệu

        const bulb = new THREE.Mesh(bulbGeo, bulbMat);
        bulb.position.copy(point);
        group.add(bulb);

        // Đặt đèn hắt sáng thật (Thưa hơn, mỗi 3 bóng mới có 1 nguồn sáng để đỡ lag)
        if (index % 3 === 0) {
            const realLight = new THREE.PointLight(color, 0, 25); 
            realLight.position.copy(point);
            // Ghi nhớ cường độ sáng của đèn dây là 13
            realLight.userData.nightIntensity = 13; 
            group.add(realLight);
            lightsToExport.push(realLight);
        }
    });

    if (lightsToExport.length > 0) {
        lightsToExport[0].userData.glowMaterials = allBulbMats;
    }

    return { model: group, pointLights: lightsToExport };
}