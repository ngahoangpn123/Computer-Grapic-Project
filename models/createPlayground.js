import * as THREE from 'three';

export function createPlayground(colors, createMaterial) {
    const group = new THREE.Group();

    const sandpitGeo = new THREE.BoxGeometry(7, 0.1, 7);
    const sandpit = new THREE.Mesh(sandpitGeo, createMaterial(colors.sand));
    sandpit.position.set(0, 0.05, 0);
    sandpit.receiveShadow = true;
    group.add(sandpit);

    const createWoodBox = (w, h, d, x, y, z) => {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), createMaterial(colors.wood));
        mesh.position.set(x, y, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        group.add(mesh);
    };

    createWoodBox(0.3, 8, 0.3, -3.3, 4, -3.3);
    createWoodBox(0.3, 8, 0.3, 3.3, 4, -3.3);
    createWoodBox(0.3, 8, 0.3, -3.3, 4, 3.3);
    createWoodBox(0.3, 8, 0.3, 3.3, 4, 3.3);

    createWoodBox(6.6, 0.3, 6.6, 0, 5, 0);

    const roofGeo = new THREE.ConeGeometry(5, 4, 4);
    const roof = new THREE.Mesh(roofGeo, createMaterial(colors.yellow));
    roof.position.set(0, 7.2, 0);
    roof.rotation.y = Math.PI / 4;
    roof.scale.z = 1.3;
    roof.castShadow = true;
    group.add(roof);

    const points = [];
    for (let i = 0; i < 20; i++) {
        const rad = Math.PI * 2 * i / 19;
        points.push(new THREE.Vector2(1.5 + Math.sin(rad) * 0.5, -5 + i * 0.3));
    }
    const slideGeo = new THREE.LatheGeometry(points, 32);
    const slide = new THREE.Mesh(slideGeo, createMaterial(colors.pink));
    slide.position.set(2, 5.2, 0);
    slide.rotation.x = -Math.PI / 2;
    slide.castShadow = true;
    group.add(slide);

    for(let i=0; i<6; i++) {
        createWoodBox(2, 0.3, 0.5, -3.3, 1 + i * 0.8, -1.5);
    }

    const wall = new THREE.Mesh(new THREE.BoxGeometry(0.1, 4, 3), createMaterial(colors.metal));
    wall.position.set(-3.3, 7, 0);
    wall.castShadow = true;
    group.add(wall);

    return group;
}