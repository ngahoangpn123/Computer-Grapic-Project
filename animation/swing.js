// 'Swingsheet1', 'Swingsheet2' đung đưa, 'Swingbody' đứng yên

export function animateSwing(swingGroup, time) {
    if (!swingGroup) return;
    const seat1 = swingGroup.getObjectByName('Swingsheet1');
    const seat2 = swingGroup.getObjectByName('Swingsheet2');
    
    const angle = Math.sin(time * 1.5) * 0.2;
    if (seat1) seat1.rotation.x = angle;
    if (seat2) seat2.rotation.x = angle;
}