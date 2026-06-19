import * as THREE from 'three';

export function createSun() {
    // Tăng kích thước (ví dụ bán kính 6) để nhìn rõ trên bầu trời
    const sunGeo = new THREE.SphereGeometry(6, 32, 32); 
    
    // Đổi sang MeshStandardMaterial để dùng hiệu ứng Emissive (Tự phát sáng)
    const sunMat = new THREE.MeshStandardMaterial({ 
        color: 0xffffff, 
        emissive: 0xffddaa, // Màu vàng nắng 
        /*emissiveIntensity: 3 */// Cường độ mạnh để tạo hào quang (Bloom)
    }); 
    const sun = new THREE.Mesh(sunGeo, sunMat);
    
    // Đặt mặt trời ở tít trên cao và xa (khớp với hướng của đèn dirLight)
    sun.position.set(0, 60, 60);
    
    // Lưu material này vào khối mesh để bên ngoài (day_night.js) có thể lấy ra và đổi màu
    sun.userData.celestialMaterial = sunMat;

    return sun;
}