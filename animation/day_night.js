import * as THREE from 'three';

export class DayNightController {
    constructor(scene, ambientLight, hemiLight, dirLight, lamps, stars) {
        this.scene = scene;
        this.ambientLight = ambientLight;
        this.hemiLight = hemiLight;
        this.dirLight = dirLight; 
        this.lamps = lamps; // Mảng chứa các PointLight của đèn đường
        this.stars = stars;

        this.isNight = false;
        
        // Cấu hình Nút UI
        this.toggleBtn = document.getElementById('toggle-daynight');
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggle());
        }
    }

    toggle() {
        this.isNight = !this.isNight;
        
        if (this.isNight) {
            // --- CÀI ĐẶT BAN ĐÊM ---
            this.toggleBtn.classList.add('is-night');
            this.toggleBtn.textContent = '☀️ Chuyển sang Ban Ngày';
            
            // Đổi màu nền trời thành xanh đen
            this.scene.background = new THREE.Color(0x0a1128); 
            
            // Giảm ánh sáng môi trường xuống tối mờ
            this.ambientLight.color.setHex(0x222244);
            this.ambientLight.intensity = 0.2;
            
            // Đổi ánh sáng Hemisphere thành tone lạnh/tối
            this.hemiLight.color.setHex(0x111133);
            this.hemiLight.groundColor.setHex(0x050511);
            this.hemiLight.intensity = 0.1;
            
            // Mặt trời biến thành Mặt trăng (Ánh sáng yếu, tone xanh lạnh)
            this.dirLight.color.setHex(0x88bbff);
            this.dirLight.intensity = 0.3;

            // Hiện bầu trời sao
            if (this.stars) this.stars.visible = true;

            // Bật toàn bộ đèn đường
            this.lamps.forEach(light => {
            // Đọc mức sáng chuẩn đã cài đặt cho từng đèn, nếu không có thì mặc định là 50
                //Bật đèn đơn (Đèn đường, spotlight)
                light.intensity = light.userData.nightIntensity || 50; 
                if (light.userData.glowMaterial) {
                    light.userData.glowMaterial.emissiveIntensity = 1.2; // Tăng số này nếu muốn chói hơn
                }

                // Bật dây đèn (Nhiều bóng)
                if (light.userData.glowMaterials) {
                    light.userData.glowMaterials.forEach(mat => mat.emissiveIntensity = 1.5);
                }
            });
            
        } else {
            // --- CÀI ĐẶT BAN NGÀY ---
            this.toggleBtn.classList.remove('is-night');
            this.toggleBtn.textContent = '🌙 Chuyển sang Ban Đêm';
            
            // Khôi phục màu trời ban đầu
            this.scene.background = new THREE.Color(0x87CEEB); 
            
            // Khôi phục ánh sáng môi trường
            this.ambientLight.color.setHex(0xffffff);
            this.ambientLight.intensity = 0.8;
            
            // Khôi phục Hemisphere Light
            this.hemiLight.color.setHex(0xffffff);
            this.hemiLight.groundColor.setHex(0xffffff);
            this.hemiLight.intensity = 0.1;
            
            // Khôi phục Mặt trời
            this.dirLight.color.setHex(0xffffff);
            this.dirLight.intensity = 0.9;

            // Giấu bầu trời sao
            if (this.stars) this.stars.visible = false;

            // Tắt toàn bộ đèn đường
            this.lamps.forEach(light => {
                light.intensity = 0; 
                //Tắt đèn đơn
                if (light.userData.glowMaterial) {
                    light.userData.glowMaterial.emissiveIntensity = 0; 
                }
                // Tắt dây đèn
                if (light.userData.glowMaterials) {
                    light.userData.glowMaterials.forEach(mat => mat.emissiveIntensity = 0);
                }
            });
        }
    }
}