// Gắn cho 'horse' (phần con ngựa & lò xo), 'pedestal' đứng yên
export function animateHorse(horseGroup, time) {
    if (!horseGroup) return;
    // Tìm phần 'horse' trong group (giả định dùng scene.getObjectByName hoặc cấu trúc tree)
    const horse = horseGroup.getObjectByName('horse'); 
    if (horse) {
        horse.rotation.x = Math.sin(time * 5) * 0.15;
        // Lắc lư nghiêng trái phải trên mặt phẳng Oxy - Xoay quanh trục Z
        // Tốc độ chậm hơn (time * 2.5), biên độ nhỏ (0.05)
        horse.rotation.z = Math.sin(time * 2.5) * 0.05;
    }
}

//render lại cho ngựa về chính giữa