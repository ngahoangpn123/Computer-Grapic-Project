import * as THREE from 'three';

export function createMerryGoRound(colors, createMaterial) {
    const group = new THREE.Group();

    const floor = new THREE.Mesh(new THREE.BoxGeometry(3, 0.2, 3), createMaterial(colors.wood));
    floor.position.y = 1.5;
    floor.castShadow = true;
    group.add(floor);

    const rim = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.1, 8, 32), createMaterial(colors.blue));
    rim.position.y = 1.5;
    rim.rotation.x = -Math.PI / 2;
    rim.castShadow = true;
    group.add(rim);

    const centralPole = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 2, 6), createMaterial(colors.metal));
    centralPole.position.y = 1;
    group.add(centralPole);

    const handleGeo = new THREE.TorusGeometry(1.5, 0.1, 6, 8, Math.PI);
    const handleMat = createMaterial(colors.metal);
    
    const handle1 = new THREE.Mesh(handleGeo, handleMat);
    handle1.position.y = 1.5;
    handle1.rotation.y = Math.PI / 2;
    group.add(handle1);
    
    const handle2 = new THREE.Mesh(handleGeo, handleMat);
    handle2.position.y = 1.5;
    handle2.rotation.y = -Math.PI / 2;
    group.add(handle2);

    return group;
}