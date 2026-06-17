import * as THREE from 'three';

export function createStars() {
    const starCount = 2000; // Số lượng ngôi sao
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
        // Tọa độ ngẫu nhiên trên một mặt cầu khổng lồ (bán kính 400)
        const r = 400; 
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);

        let y = r * Math.cos(phi);
        // Ép các ngôi sao chỉ xuất hiện ở nửa bán cầu trên (bầu trời)
        if (y < 20) y = Math.abs(y) + 20; 

        const x = r * Math.sin(phi) * Math.cos(theta);
        const z = r * Math.sin(phi) * Math.sin(theta);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Vật liệu phát sáng cho các vì sao
    const material = new THREE.PointsMaterial({
        color: 0xffffff, // Màu trắng sáng
        size: 1.5,       // Kích thước sao
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true // Thu nhỏ sao khi ở xa
    });

    const stars = new THREE.Points(geometry, material);
    
    // Mặc định ban ngày thì tàng hình
    stars.visible = false; 

    return stars;
}