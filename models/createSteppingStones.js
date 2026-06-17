import * as THREE from 'three';

export function createSteppingStones(colors, createMaterial) {
    const group = new THREE.Group();
    const stoneGeo = new THREE.BoxGeometry(1.5, 0.1, 1.5);
    
    const colorsList = [colors.pink, colors.blue, colors.yellow, colors.lightgreen];
    for (let i = 0; i < 4; i++) {
        const stone = new THREE.Mesh(stoneGeo, createMaterial(colorsList[i]));
        stone.position.set(-8 + i * 2, 0.05, 10 + i * 1.5);
        stone.rotation.y = Math.PI / 8 * i;
        stone.receiveShadow = true;
        group.add(stone);
    }
    
    return group;
}