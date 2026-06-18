export function animateDuck(duckModel, time, index) {
    if (!duckModel) return;
    const radius = 5; // Bán kính vòng bơi
    const speed = 0.5;
    
    // Mỗi con vịt sẽ lệch pha nhau một chút nhờ index để không bị đè lên nhau
    const angle = time * speed + (index * Math.PI); 
    
    duckModel.position.x = 1.5 + Math.cos(angle) * radius;
    duckModel.position.z = -36 + Math.sin(angle) * radius;
    
    // Xoay đầu vịt theo hướng bơi
    duckModel.rotation.y = -angle;
}