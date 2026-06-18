// 'seasaw.008' là ván gỗ, 'seasaw.092' là đế
export function animateSeesaw(seesawGroup, time) {
    if (!seesawGroup) return;
    const plank = seesawGroup.getObjectByName('seasaw.008');
    if (plank) {
        plank.rotation.z = Math.sin(time * 1.5) * 0.2; // Bập bênh
    }
}