export function animateDuck(duckModel, time, index) {
    if (!duckModel) return;
    const radius = 2.5; // Bán kính vòng bơi
    const speed = 0.25;
    
    // Mỗi con vịt sẽ lệch pha nhau một chút nhờ index để không bị đè lên nhau
    const angle = time * speed + (index * Math.PI/2+index*1); 
    
    duckModel.position.x = 0.5 + Math.cos(angle) * radius;
    duckModel.position.z = 0.2 + Math.sin(angle) * radius;
    duckModel.position.y = 1.2 + Math.sin(time * 2 + index) * 0.05; // Nhấp nhô nhẹ
    
    // Xoay đầu vịt theo hướng bơi
    duckModel.rotation.y = 3*angle;
}