// Gắn cho 'horse' (phần con ngựa & lò xo), 'pedestal' đứng yên
export function animateHorse(horseGroup, time) {
    if (!horseGroup) return;
    // Tìm phần 'horse' trong group (giả định dùng scene.getObjectByName hoặc cấu trúc tree)
    const horse = horseGroup.getObjectByName('horse'); 
    if (horse) {
        horse.position.z = Math.sin(time * 3) * 0.2; // Nhún lò xo
        horse.rotation.y = Math.sin(time * 2) * 0.05; // Lắc lư nhẹ
    }
}

//render lại cho ngựa về chính giữa