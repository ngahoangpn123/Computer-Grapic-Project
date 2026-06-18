// 'seasaw1' là ván gỗ, 'seasaw2' là đế
export function animateSeesaw(seesawGroup, time) {
    if (!seesawGroup) return;
    const plank = seesawGroup.getObjectByName('seasaw1');
    if (plank) {
        // Lần đầu tiên chạy: Ghi nhớ lại góc xoay ban đầu của ván gỗ
        if (plank.userData.baseRotX === undefined) {
            plank.userData.baseRotX = plank.rotation.x; 
        }
        
        // Bập bênh dao động xung quanh góc gốc
        plank.rotation.x = plank.userData.baseRotX + Math.sin(time * 1.5) * 0.2;
    }
}