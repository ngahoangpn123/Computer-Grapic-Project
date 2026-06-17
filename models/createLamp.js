import * as THREE from 'three';

export function createLamp(colors, createMaterial) {
    const group = new THREE.Group();
    
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 10, 6), createMaterial(colors.wood));
    pole.position.y = 5;
    pole.castShadow = true;
    group.add(pole);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 8), createMaterial(0xFFFFFF));
    head.position.y = 10;
    head.castShadow = true;
    group.add(head);

    return group;
}